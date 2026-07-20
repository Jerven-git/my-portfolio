import { useEffect, useRef } from 'react';

/**
 * Bubbles that trail the cursor across the playful hero.
 *
 * Canvas 2D rather than DOM nodes: at ~60 live bubbles this is one paint per
 * frame instead of sixty elements thrashing style recalc. It also means the
 * bubbles can overlap and blend without any z-index bookkeeping.
 *
 * Spawn rate is tied to pointer *distance travelled*, not to time. Moving fast
 * lays down a dense ribbon; holding still emits nothing at all. Time-based
 * spawning produces a puddle under a parked cursor, which reads as a bug.
 *
 * Skipped entirely for coarse pointers (there is no cursor to trail on a
 * phone) and under prefers-reduced-motion.
 */

const MAX = 60;
const SPAWN_DISTANCE = 14; // px of travel per bubble
const PALETTE = [
  [232, 92, 134], // verm rose
  [163, 21, 69], // maroon
  [242, 160, 181], // light rose
  [255, 255, 255], // white
];

export default function CursorBubbles({ reduced }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    /* Fixed-capacity ring buffer. Bubbles are recycled in place, so the
       array never grows and there is nothing for the GC to collect mid-
       animation. */
    const bubbles = Array.from({ length: MAX }, () => ({ life: 0 }));
    let next = 0;
    let last = null;

    const spawn = (x, y, speed) => {
      const b = bubbles[next];
      next = (next + 1) % MAX;
      b.x = x + (Math.random() - 0.5) * 12;
      b.y = y + (Math.random() - 0.5) * 12;
      /* Faster cursor throws bubbles wider and bigger — the trail gets
         its energy from the gesture rather than from a constant. */
      b.vx = (Math.random() - 0.5) * 0.7;
      b.vy = -0.25 - Math.random() * 0.5;
      b.r = 3 + Math.random() * 9 + Math.min(speed, 40) * 0.14;
      b.life = 1;
      b.decay = 0.008 + Math.random() * 0.011;
      b.color = PALETTE[(Math.random() * PALETTE.length) | 0];
      b.ring = Math.random() < 0.45;
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        last = null;
        return;
      }
      if (!last) {
        last = { x, y };
        return;
      }
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < SPAWN_DISTANCE) return;

      /* Interpolate along the segment so a fast flick leaves an even
         ribbon instead of one bubble per pointer event. */
      const steps = Math.min(Math.floor(dist / SPAWN_DISTANCE), 6);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        spawn(last.x + dx * t, last.y + dy * t, dist);
      }
      last = { x, y };
    };

    window.addEventListener('pointermove', onPointer, { passive: true });

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const b of bubbles) {
        if (b.life <= 0) continue;
        b.life -= b.decay;
        if (b.life <= 0) continue;

        b.x += b.vx;
        b.y += b.vy;
        b.vy -= 0.006; // drift upward, gently accelerating
        b.vx *= 0.99;

        /* Ease-out on radius so bubbles bloom quickly then settle,
           rather than growing linearly to the moment they vanish. */
        const grow = 1 + (1 - b.life) * 0.85;
        const alpha = b.life * b.life * 0.62;
        const [r, g, bl] = b.color;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * grow, 0, Math.PI * 2);
        if (b.ring) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${alpha * 0.5})`;
          ctx.fill();
        }
      }
    };

    const start = () => {
      if (!raf && !document.hidden) frame();
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
