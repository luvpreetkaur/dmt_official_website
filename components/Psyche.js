'use client';

import { useEffect, useRef } from 'react';

// Homepage backdrop: a live shader. A kaleidoscope of liquid, endlessly
// self-warping fractal colour with neon contour lines flowing outwards through
// it, now and then melting into geometric patterns and back, the whole field
// breathing on the 140 BPM beat. Rendered below screen resolution (it's soft
// by nature) and paused when off-screen.
const VERT = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float sa; uniform float sb; uniform float mx;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 R = mat2(.8, .6, -.6, .8);
  for (int i = 0; i < 5; i++) { v += a * n(p); p = R * p * 2.03; a *= .5; } return v; }
vec3 pal(float x){ x = fract(x) * 4.;
  vec3 c0 = vec3(1., .24, .6), c1 = vec3(.48, .17, 1.), c2 = vec3(.16, .94, .88), c3 = vec3(1., .69, .13);
  return x < 1. ? mix(c0, c1, x) : x < 2. ? mix(c1, c2, x - 1.) : x < 3. ? mix(c2, c3, x - 2.) : mix(c3, c0, x - 3.); }
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// shared look: liquid fractal colour plus flowing neon contour lines
vec3 shade(float v, float bands, float rad, vec2 w){
  float line = abs(fract(bands) - .5);
  float neon = .03 / (line + .02) + 1.3 * smoothstep(.09, 0., line);
  vec3 base = pal(v * 1.4 + length(w) * .5 + t * .03) * (.04 + 1.5 * pow(v, 2.6));
  vec3 glow = pal(floor(bands) * .23 + rad * .3 + t * .05) * neon * (.3 + .7 * v);
  return base + glow * .8;
}

// hexagon helpers: local position inside the nearest hex cell (xy) and cell id (zw)
vec4 hexCell(vec2 p){
  vec2 s = vec2(1., 1.7320508);
  vec4 c = floor(vec4(p, p - vec2(.5, 1.)) / s.xyxy) + .5;
  vec4 hh = vec4(p - c.xy * s, p - (c.zw + .5) * s);
  return dot(hh.xy, hh.xy) < dot(hh.zw, hh.zw) ? vec4(hh.xy, c.xy) : vec4(hh.zw, c.zw + .5);
}
float hexD(vec2 p){ p = abs(p); return max(dot(p, vec2(.5, .8660254)), p.x); }

// id 0 floral kaleidoscope, 1 sacred hexagons, 2 polygon tunnel, 3 crystal fractal, 4 op-art diamonds
vec3 scene(float id, vec2 uv, float beat){
  float rad = length(uv);
  float ang = atan(uv.y, uv.x);
  float v, bands; vec2 w;
  if (id < .5) {
    float a = ang + t * .04, seg = 6.2831 / 10.;
    a = abs(mod(a, seg) - seg * .5);
    vec2 p = vec2(cos(a), sin(a)) * rad;
    p = p * (2.6 - .25 * beat) + vec2(0., -t * .05);
    vec2 q = vec2(fbm(p + t * .06), fbm(p + vec2(5.2, 1.3) - t * .05));
    w = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + t * .11), fbm(p + 3. * q + vec2(8.3, 2.8) - t * .09));
    v = fbm(p + 3.6 * w);
    bands = v * 6. + rad * 2. - t * .55;
  } else if (id < 1.5) {
    vec2 p = rot(t * .03) * uv * (3.4 - .3 * beat);
    w = vec2(fbm(p * .7 + t * .08), fbm(p * .7 + vec2(4.1, 7.3) - t * .07));
    vec4 hc = hexCell(p + (w - .5) * .5);
    float d = hexD(hc.xy);
    v = fbm(p + 2.5 * w) * .7 + .3 * (1. - d);
    bands = d * 5. - t * .7 + h(hc.zw) * 2. + rad * 1.2;
  } else if (id < 2.5) {
    float N = 3. + step(.5, fract(t / 32.));
    float tw = log(rad + .001);
    float a = ang + t * .15 - tw * .9;
    float k = 6.2831 / N;
    float rp = rad * cos(mod(a, k) - k * .5) / cos(k * .5);
    float z = log(rp + .001);
    vec2 p = vec2(a * 1.5, z * 2. - t * .6);
    w = vec2(fbm(p + t * .05), fbm(p + vec2(3.3, 8.1)));
    v = fbm(p + 2.5 * w);
    bands = z * 7. - t * 1.6 + v * .8;
  } else if (id < 3.5) {
    vec2 p = uv * (1.4 - .15 * beat);
    for (int i = 0; i < 4; i++) {
      p = abs(p) - vec2(.5, .3);
      p = rot(.62 + .12 * sin(t * .07)) * p;
      p *= 1.25;
    }
    w = vec2(fbm(p * .6 + t * .07), fbm(p * .6 + vec2(2.7, 5.9) - t * .06));
    v = fbm(p * .8 + 2. * w);
    bands = (abs(p.x) + abs(p.y)) * 2.6 - t * .8 + v * .8;
  } else {
    vec2 p = rot(.785 + t * .02) * uv * 2.;
    p += .1 * vec2(sin(p.y * 2. + t * .4), sin(p.x * 2. - t * .35));
    float d1 = max(abs(p.x), abs(p.y));
    vec2 p2 = rot(t * .05) * (p - vec2(.5 * sin(t * .1), .4 * cos(t * .13)));
    float d2 = abs(p2.x) + abs(p2.y);
    w = vec2(fbm(p + t * .06), fbm(p + vec2(6.1, 2.2) - t * .05));
    v = fbm(p * 1.5 + 2. * w);
    bands = d1 * 9. + sin(d2 * 9.) * .3 - t * 1.2;
  }
  return shade(v, bands, rad, w);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - .5 * r) / max(min(r.x, r.y), r.y * .62);
  uv.y -= .12;
  uv += m * .06;
  float beat = exp(-5. * fract(t * 140. / 60.));
  float rad = length(uv);
  vec3 col = scene(sa, uv, beat);
  if (mx > 0.) col = mix(col, scene(sb, uv, beat), mx);
  col *= .8 + .35 * beat * smoothstep(.9, .1, rad);
  col *= smoothstep(1.55, .35, rad);
  col *= .62 + .38 * smoothstep(.05, .5, rad);
  gl_FragColor = vec4(col * .9, 1.);
}`;

// The floral kaleidoscope is home; every so often the flow melts into a
// geometric pattern and back: floral, hexagons, floral, tunnel, floral,
// crystal, floral, diamonds... Each pattern holds, then crossfades on the beat.
const BAR = (60 / 140) * 4;
const SEQ = [0, 1, 0, 2, 0, 3, 0, 4];
const HOLD = (id) => (id === 0 ? 14 : 9) * BAR; // ~24s floral, ~15s geometric
const FADE = 2 * BAR;
const CYCLE = SEQ.reduce((s, id) => s + HOLD(id), 0);
function sceneAt(sec) {
  let x = sec % CYCLE;
  for (let i = 0; i < SEQ.length; i++) {
    const d = HOLD(SEQ[i]);
    if (x < d) {
      const next = SEQ[(i + 1) % SEQ.length];
      const f = Math.max(0, (x - (d - FADE)) / FADE);
      return [SEQ[i], next, f * f * (3 - 2 * f)];
    }
    x -= d;
  }
  return [0, 0, 0];
}

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
    const uA = gl.getUniformLocation(prog, 'sa');
    const uB = gl.getUniformLocation(prog, 'sb');
    const uX = gl.getUniformLocation(prog, 'mx');

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
    const shown = performance.now();
    const q = new URLSearchParams(location.search).get('psy'); // ?psy=2 pins one pattern (preview)
    const force = q === null || q === '' ? null : Number(q);
    const draw = (now) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      const [a, b, x] = force !== null ? [force, force, 0] : sceneAt((now - shown) / 1000);
      gl.uniform1f(uA, a); gl.uniform1f(uB, b); gl.uniform1f(uX, x);
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
