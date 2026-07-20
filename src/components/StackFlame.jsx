import { useEffect, useRef } from 'react';

/**
 * The element field behind a hovered stack row.
 *
 * One canvas, not six. A row-per-canvas design would hold six live WebGL
 * contexts on a section every visitor scrolls past, and browsers cap contexts
 * somewhere around eight to sixteen — the seventh row would silently lose its
 * effect. Only one row can be hovered anyway, so a single canvas repositions
 * itself over whichever row is active.
 *
 * Raw WebGL rather than three.js. This is a fullscreen quad with one fragment
 * shader; three would add ~188kb to the always-loaded path to draw two
 * triangles. The hero's 3D scene can afford that import because it only loads
 * in playful mode. This cannot.
 *
 * Fire on a light page inverts the usual ramp. Classic flame art puts a
 * white-hot core on black, which is invisible on off-white — so intensity here
 * maps to *saturation and opacity* instead: transparent pale tips, deep
 * saturated core. It reads as flame because of the advected noise structure,
 * not because of a bloom.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uProgress;
uniform vec3  uCore;
uniform vec3  uMid;
uniform vec3  uTip;
uniform float uRise;
uniform float uTurb;
uniform float uScale;
uniform float uSpark;
uniform float uAlpha;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int k = 0; k < 5; k++) {
    v += a * vnoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  /* Aspect correction is not optional here. A stack row is ~12x wider than it
     is tall, so sampling noise in raw normalized uv stretches every feature
     sideways and the field renders as a horizontal smear rather than as
     tongues. Correcting x by the aspect keeps noise cells square in screen
     space, which is what produces many narrow flames across the width. */
  float aspect = uRes.x / uRes.y;

  /* Deliberately NOT square. Square cells produced round cumulus puffs — the
     field read as smoke. Flame licks are narrow and tall, so x runs at a much
     higher frequency than y. Tuned for the band the canvas actually occupies
     (~28px tall, full row width): roughly 12px wide by 20px tall per cell. */
  vec2 st = vec2(uv.x * aspect * 0.7, uv.y * 0.4) * uScale;
  st.y -= uTime * uRise;

  /* Domain warp: noise displacing noise. A single fbm octave stack drifts
     upward like a texture on a conveyor; warping it by a slower, larger field
     is what makes the tongues curl and separate. */
  float warp = fbm(st * 0.55 + uTime * 0.15) * uTurb;
  float n = fbm(st + warp);

  /* Flame cannot sustain itself with height, so subtract a vertical ramp.
     The subtraction is what produces tapering tongues rather than a cloud. */
  float body = n - uv.y * 0.72 - 0.03;
  /* Narrow band: a wide smoothstep melts the tongues back into haze. */
  float flame = smoothstep(0.015, 0.24, body);

  /* Sparks: a high-frequency field raised to a steep power, so only the very
     brightest specks survive. Rises faster than the body. */
  float sp = pow(vnoise(vec2(uv.x * aspect * 14.0, uv.y * 9.0 - uTime * uRise * 2.6)), 16.0);
  flame += sp * uSpark * 1.6;

  /* Feather every edge so the field never shows the canvas rectangle. */
  float edge = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x)
             * smoothstep(1.0, 0.80, uv.y);
  flame = clamp(flame * edge, 0.0, 1.0);

  /* Reach the mid tone fast. Holding the pale tip across most of the range
     left the field reading as grey haze once composited over warm off-white:
     a low-alpha pale blue over cream is, numerically, grey. The saturated
     band has to own the visible mass. */
  /* The mid tone owns the visible mass; the core is an accent at peak
     intensity only. Handing the body to a deep core desaturated the whole
     field — a dark navy at 60% over cream is, perceptually, slate grey. */
  vec3 col = mix(uMid, uCore, smoothstep(0.74, 1.0, flame));
  col = mix(uTip, col, smoothstep(0.0, 0.18, flame));

  /* Exponent below 1 lifts the mid-range opacity. At pow 1.25 the visible
     mass of the field sat around alpha 0.1, which over cream is grey rather
     than blue. */
  /* Premultiplied output, to match the context's premultipliedAlpha:true and
     blendFunc(ONE, ONE_MINUS_SRC_ALPHA). Emitting straight alpha into a
     premultiplied buffer makes the compositor multiply by alpha a second
     time, which darkened the whole field toward slate. */
  float a = pow(flame, 0.85) * uProgress * uAlpha;
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const DPR_CAP = 1.5;

export default function StackFlame({ active }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ progress: 0, active: null });

  // Keep the latest target in a ref so the render loop never restarts on hover.
  stateRef.current.active = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One oversized triangle covers the clip volume with no index buffer.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    for (const n of ['uRes', 'uTime', 'uProgress', 'uCore', 'uMid', 'uTip',
                     'uRise', 'uTurb', 'uScale', 'uSpark', 'uAlpha']) {
      U[n] = gl.getUniformLocation(prog, n);
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let lost = false;
    let sizedW = 0;
    let sizedH = 0;
    const start = performance.now();

    const onLost = (e) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    canvas.addEventListener('webglcontextlost', onLost);

    const frame = () => {
      const st = stateRef.current;
      const target = st.active ? 1 : 0;

      // Ease toward the target so leaving a row burns down instead of cutting.
      st.progress += (target - st.progress) * 0.12;

      if (!st.active && st.progress < 0.004) {
        st.progress = 0;
        canvas.style.opacity = '0';
        raf = 0;
        return;
      }

      const cfg = st.active;
      if (cfg) {
        canvas.style.opacity = '1';
        canvas.style.top = `${cfg.top}px`;
        canvas.style.height = `${cfg.height}px`;

        const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
        const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.round(cfg.height * dpr));
        if (w !== sizedW || h !== sizedH) {
          canvas.width = w;
          canvas.height = h;
          sizedW = w;
          sizedH = h;
          gl.viewport(0, 0, w, h);
        }

        gl.uniform2f(U.uRes, w, h);
        gl.uniform3fv(U.uCore, cfg.el.core);
        gl.uniform3fv(U.uMid, cfg.el.mid);
        gl.uniform3fv(U.uTip, cfg.el.tip);
        gl.uniform1f(U.uRise, cfg.el.rise);
        gl.uniform1f(U.uTurb, cfg.el.turb);
        gl.uniform1f(U.uScale, cfg.el.scale);
        gl.uniform1f(U.uSpark, cfg.el.spark);
        gl.uniform1f(U.uAlpha, cfg.el.alpha);
      }

      gl.uniform1f(U.uTime, (performance.now() - start) / 1000);
      gl.uniform1f(U.uProgress, st.progress);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf && !lost && !document.hidden) raf = requestAnimationFrame(frame);
    };
    stateRef.current.kick = kick;
    kick();

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else kick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('webglcontextlost', onLost);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      /* Deliberately NOT calling WEBGL_lose_context.loseContext() here.
         getContext() hands back the same context object for the life of a
         canvas, so losing it on cleanup means StrictMode's mount → cleanup →
         mount cycle remounts onto a dead context: shader compilation returns
         null, the effect bails, and the field silently never renders in dev.
         The context is collected with the canvas element on unmount anyway. */
    };
  }, []);

  // The loop parks itself when idle; a new hover has to restart it.
  useEffect(() => {
    if (active) stateRef.current.kick?.();
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      /* `w-full`, not `inset-x-0`. A canvas is a replaced element, so
         left:0/right:0 with width:auto resolves to its *intrinsic* width
         rather than stretching — and because the backing store is sized from
         clientWidth, that fed back on itself and collapsed the field to a
         182px stub at the left edge of the row. */
      className="pointer-events-none absolute left-0 w-full opacity-0 transition-opacity duration-200"
      style={{ top: 0, height: 0 }}
    />
  );
}
