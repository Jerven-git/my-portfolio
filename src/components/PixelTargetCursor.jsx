import { useEffect, useRef } from 'react';

const TRAIL_DISTANCE = 12;
const MAX_TRAIL_STEPS = 4;
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function PixelTargetCursor({ disabled = false }) {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (disabled) return undefined;

    const cursor = cursorRef.current;
    const trail = Array.from(trailRef.current?.children ?? []);
    if (!cursor || trail.length === 0) return undefined;

    let frame = 0;
    let pending = null;
    let lastSpawn = null;
    let trailIndex = 0;

    const spawnTrail = (x, y) => {
      const pixel = trail[trailIndex];
      trailIndex = (trailIndex + 1) % trail.length;
      pixel.getAnimations().forEach((animation) => animation.cancel());
      pixel.animate(
        [
          { opacity: 0.9, transform: `translate3d(${x - 3}px, ${y - 3}px, 0) scale(1)` },
          { opacity: 0, transform: `translate3d(${x - 3}px, ${y - 3}px, 0) scale(0.3)` },
        ],
        { duration: 360, easing: 'steps(5, end)', fill: 'forwards' },
      );
    };

    const renderPointer = () => {
      frame = 0;
      if (!pending) return;

      const { x, y, target } = pending;
      pending = null;
      cursor.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-targeting', target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR)));

      if (!lastSpawn) {
        lastSpawn = { x, y };
        return;
      }

      const dx = x - lastSpawn.x;
      const dy = y - lastSpawn.y;
      const distance = Math.hypot(dx, dy);
      if (distance < TRAIL_DISTANCE) return;

      const steps = Math.min(Math.floor(distance / TRAIL_DISTANCE), MAX_TRAIL_STEPS);
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        spawnTrail(lastSpawn.x + dx * progress, lastSpawn.y + dy * progress);
      }
      lastSpawn = { x, y };
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      document.documentElement.classList.add('campaign-pointer-active');
      pending = { x: event.clientX, y: event.clientY, target: event.target };
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const hideCursor = (event) => {
      if (event?.relatedTarget) return;
      cursor.classList.remove('is-visible', 'is-targeting');
      document.documentElement.classList.remove('campaign-pointer-active');
      lastSpawn = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', hideCursor);
    document.addEventListener('pointerout', hideCursor);

    return () => {
      window.cancelAnimationFrame(frame);
      trail.forEach((pixel) => pixel.getAnimations().forEach((animation) => animation.cancel()));
      document.documentElement.classList.remove('campaign-pointer-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', hideCursor);
      document.removeEventListener('pointerout', hideCursor);
    };
  }, [disabled]);

  return (
    <div className="campaign-pointer-layer" aria-hidden="true">
      <div ref={trailRef} className="campaign-pointer-trail">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
      <div ref={cursorRef} className="campaign-pointer">
        <span className="campaign-pointer__frame">
          <i /><i /><i /><i />
          <b />
        </span>
      </div>
    </div>
  );
}
