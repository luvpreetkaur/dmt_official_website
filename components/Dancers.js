'use client';

import { useEffect, useRef } from 'react';

// The dancefloor: a crowd of dancers moving on the 140 BPM beat, rendered
// live in a shader. Their bodies are made of the same liquid fractal light as
// the backdrop, with neon outlines and colour afterimages trailing their moves.
const VERT = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 R = mat2(.8, .6, -.6, .8);
  for (int i = 0; i < 4; i++) { v += a * n(p); p = R * p * 2.03; a *= .5; } return v; }
vec3 pal(float x){ x = fract(x) * 4.;
  vec3 c0 = vec3(1., .24, .6), c1 = vec3(.48, .17, 1.), c2 = vec3(.16, .94, .88), c3 = vec3(1., .69, .13);
  return x < 1. ? mix(c0, c1, x) : x < 2. ? mix(c1, c2, x - 1.) : x < 3. ? mix(c2, c3, x - 2.) : mix(c3, c0, x - 3.); }
float cap(vec2 p, vec2 a, vec2 b, float rr){ vec2 pa = p - a, ba = b - a;
  float k = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * k) - rr; }
float smin(float a, float b, float k){ float m = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, m) - k * m * (1. - m); }

// one dancer, feet at y = 0, about 1 unit tall
float dancer(vec2 p, float b, float ph, float up){
  float s1 = sin(b + ph), s2 = sin(b * .5 + ph);
  float hy = .5 + .03 * s1;
  float sw = .05 * s2;
  vec2 hip = vec2(sw * .5, hy), chest = vec2(sw, hy + .27), head = chest + vec2(sw * .7, .15);
  float d = cap(p, hip, chest, .075);
  d = smin(d, length(p - head) - .072, .03);
  vec2 shL = chest + vec2(-.07, -.02), shR = chest + vec2(.07, -.02);
  float aL = mix(4.2 + .45 * s1, 2.0 + .35 * s2, up), aR = mix(-1.06 - .45 * s1, 1.14 - .35 * s2, up);
  vec2 eL = shL + .17 * vec2(cos(aL), sin(aL)), eR = shR + .17 * vec2(cos(aR), sin(aR));
  float fL = aL - .5 + .45 * s1, fR = aR + .5 - .45 * s1;
  vec2 hL = eL + .16 * vec2(cos(fL), sin(fL)), hR = eR + .16 * vec2(cos(fR), sin(fR));
  d = smin(d, cap(p, shL, eL, .038), .02); d = smin(d, cap(p, eL, hL, .031), .015);
  d = smin(d, cap(p, shR, eR, .038), .02); d = smin(d, cap(p, eR, hR, .031), .015);
  float kl = max(0., s1) * .08, kr = max(0., -s1) * .08;
  vec2 kL = vec2(-.07 + sw * .3, hy - .25 + kl), kR = vec2(.07 + sw * .3, hy - .25 + kr);
  vec2 ftL = vec2(-.09, kl * .5), ftR = vec2(.09, kr * .5);
  d = smin(d, cap(p, hip + vec2(-.045, 0.), kL, .055), .03); d = smin(d, cap(p, kL, ftL, .044), .02);
  d = smin(d, cap(p, hip + vec2(.045, 0.), kR, .055), .03); d = smin(d, cap(p, kR, ftR, .044), .02);
  return d;
}

// the crowd: a back row and a bigger front row. Returns (distance, dancer id)
vec2 crowd(vec2 p, float tt, float spread){
  float b = tt * 6.2831 * 140. / 60. * .5;
  vec2 best = vec2(9., 0.);
  for (int i = 0; i < 11; i++) {
    float fi = float(i);
    float back = step(fi, 4.5);
    float j = mix(fi - 5., fi, back);
    float x = mix((j - 2.5) * .36, (j - 2.) * .44, back) * spread;
    float s = mix(.5 + .12 * exp(-x * x * 10.), .32, back);
    float y0 = mix(.04, .3, back);
    vec2 q = (p - vec2(x, y0)) / s;
    if (abs(q.x) > .65 || q.y > 1.15 || q.y < -.1) continue;
    float up = step(.45, h(vec2(fi, 3.1)));
    float d = dancer(q, b, fi * 1.93, up) * s;
    if (d < best.x) best = vec2(d, fi);
  }
  return best;
}

void main(){
  vec2 p = vec2((gl_FragCoord.x - .5 * r.x) / r.y, gl_FragCoord.y / r.y);
  if (p.y > .78) { gl_FragColor = vec4(0.); return; }
  float spread = clamp(r.x / r.y / 2.2, .5, 1.);
  vec2 c = crowd(p, t, spread);
  vec2 e = crowd(p, t - .14, spread);
  float hue = c.y * .19;
  float inside = smoothstep(.003, -.003, c.x);
  float ghost = smoothstep(.006, -.006, e.x) * (1. - inside);
  vec3 col = vec3(0.); float a = 0.;
  if (inside > 0.) {
    vec2 w = p * 5. + vec2(fbm(p * 4. + t * .3), fbm(p * 4. - t * .25)) * 2.;
    float v = fbm(w + t * .2);
    float line = abs(fract(v * 6. - t * 1.2 + p.y * 3.) - .5);
    vec3 body = pal(v * 1.4 + hue + t * .05) * (.04 + 1.3 * pow(v, 2.4)) + pal(hue + .5 + v) * (.014 / (line + .012));
    col += body * inside; a += inside * .92;
  }
  vec3 gc = pal(hue + .45 + t * .07);
  col += gc * ghost * .55; a += ghost * .55;
  float edge = .005 / (abs(c.x) + .0035);
  vec3 ec = pal(hue + .25 + p.y + t * .1);
  col += ec * edge * .55; a += min(edge * .55, 1.) * (1. - inside);
  a = clamp(a, 0., 1.);
  float k = smoothstep(.0, .14, p.y) * mix(1., .6, step(c.y, 4.5));
  col *= k; a *= k;
  gl_FragColor = vec4(min(col, vec3(1.5)) , a);
}`;

export default function Dancers({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas && canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true, alpha: true, powerPreference: 'low-power' });
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
    gl.clearColor(0, 0, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r');
    const uT = gl.getUniformLocation(prog, 't');

    const scale = Math.min(1, window.devicePixelRatio || 1) * 0.85;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    const start = performance.now() - 12000;
    const draw = (now) => {
      resize();
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
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
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className={`dancers ${className}`} aria-hidden="true" />;
}
