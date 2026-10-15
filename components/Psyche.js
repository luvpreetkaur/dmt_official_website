'use client';

import { useEffect, useRef } from 'react';

// Homepage backdrop: a live shader. A kaleidoscope of liquid, endlessly
// self-warping fractal colour with neon contour lines flowing outwards through
// it, the whole field breathing on the 140 BPM beat. Rendered below screen
// resolution (it's soft by nature) and paused when off-screen.
const VERT = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 R = mat2(.8, .6, -.6, .8);
  for (int i = 0; i < 5; i++) { v += a * n(p); p = R * p * 2.03; a *= .5; } return v; }
vec3 pal(float x){ x = fract(x) * 4.;
  vec3 c0 = vec3(1., .24, .6), c1 = vec3(.48, .17, 1.), c2 = vec3(.16, .94, .88), c3 = vec3(1., .69, .13);
  return x < 1. ? mix(c0, c1, x) : x < 2. ? mix(c1, c2, x - 1.) : x < 3. ? mix(c2, c3, x - 2.) : mix(c3, c0, x - 3.); }
void main(){
  vec2 uv = (gl_FragCoord.xy - .5 * r) / max(min(r.x, r.y), r.y * .62);
  uv.y -= .12;
  uv += m * .06;
  float beat = exp(-5. * fract(t * 140. / 60.));
  float rad = length(uv);
  float ang = atan(uv.y, uv.x) + t * .04;
  float seg = 6.2831 / 10.;
  ang = abs(mod(ang, seg) - seg * .5);
  vec2 p = vec2(cos(ang), sin(ang)) * rad;
  p = p * (2.6 - .25 * beat) + vec2(0., -t * .05);
  vec2 q = vec2(fbm(p + t * .06), fbm(p + vec2(5.2, 1.3) - t * .05));
  vec2 w = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + t * .11), fbm(p + 3. * q + vec2(8.3, 2.8) - t * .09));
  float v = fbm(p + 3.6 * w);
  float bands = v * 6. + rad * 2. - t * .55;
  float line = abs(fract(bands) - .5);
  float neon = .03 / (line + .02) + 1.3 * smoothstep(.09, 0., line);
  vec3 base = pal(v * 1.4 + length(w) * .5 + t * .03) * (.04 + 1.5 * pow(v, 2.6));
  vec3 glow = pal(floor(bands) * .23 + rad * .3 + t * .05) * neon * (.3 + .7 * v);
  vec3 col = base + glow * .8;
  col *= .8 + .35 * beat * smoothstep(.9, .1, rad);
  col *= smoothstep(1.55, .35, rad);
  col *= .62 + .38 * smoothstep(.05, .5, rad);
  gl_FragColor = vec4(col * .9, 1.);
}`;

export default function Psyche({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas && canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return undefined;

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r');
    const uT = gl.getUniformLocation(prog, 't');
    const uM = gl.getUniformLocation(prog, 'm');

    const small = window.matchMedia('(max-width: 760px)').matches;
    const scale = small ? 0.8 : 0.6;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = 0.5 - e.clientY / innerHeight; };

    const start = performance.now() - 30000;
    const draw = (now) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    draw(performance.now());
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let visible = true;
    const tick = (now) => { frame = 0; if (!visible) return; draw(now); frame = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, []);

  return <canvas ref={ref} className={`psyche ${className}`} aria-hidden="true" />;
}
