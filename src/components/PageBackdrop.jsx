import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Page-wide ambient backdrop. Playful mode only.
 *
 * Circles drift right and scale up on a staggered delay, looping and
 * alternating — anime.js v4's `animate()` doing exactly what it is good at:
 * one declarative call describing a whole fleet.
 *
 * Two things this file has to get right, because a full-page animated layer
 * can break the page in ways a contained effect cannot:
 *
 * 1. CONTRAST. Every section's body copy sits over this. PRODUCT.md holds the
 *    site to WCAG 2.2 AA, and a contrast failure on a portfolio judged for
 *    professional competence is itself the signal. The circles are therefore
 *    held at very low alpha and verified by sampling rendered pixels rather
 *    than by eye — see the measured figures in the commit.
 *
 * 2. VISIBILITY. Sections carry an opaque `bg-canvas`, so a backdrop behind
 *    them would be perfectly hidden. Rather than restructure six components,
 *    a single CSS rule turns `section.bg-canvas` transparent while playful
 *    mode is on (see index.css) and this layer sits at a negative z-index —
 *    above the root background, below all in-flow content.
 *
 * Solid fills, not blurred orbs. The blur is what makes the shape read as the
 * AI-template tell PRODUCT.md closes the lane on; a flat low-alpha disc reads
 * as a colour field instead.
 */

/* Positioned in viewport units so the fleet spreads across the whole page
   rather than clustering. `left` values sit well left of centre because every
   circle travels +16rem to the right. */
const CIRCLES = [
  { top: '8%', left: '4%', size: 220, tone: 'var(--c-verm)' },
  { top: '26%', left: '58%', size: 150, tone: 'var(--c-vermink)' },
  { top: '47%', left: '12%', size: 190, tone: 'var(--c-vermink)' },
  { top: '63%', left: '66%', size: 240, tone: 'var(--c-verm)' },
  { top: '82%', left: '30%', size: 170, tone: 'var(--c-verm)' },
];

export default function PageBackdrop() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    /* Passing the elements rather than a '.selector' string. A global selector
       would double up under StrictMode's mount → cleanup → mount cycle, and
       would also reach into any other instance of this component. */
    const targets = host.querySelectorAll('[data-backdrop-circle]');
    if (!targets.length) return undefined;

    const playback = animate(targets, {
      x: '16rem',
      scale: 1.8,
      /* A flat 500ms would move all five as one block. Staggering keeps the
         500ms lead-in the brief asked for and then offsets each circle, so the
         fleet breathes instead of marching. */
      delay: stagger(600, { start: 500 }),
      duration: 7000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    return () => playback.revert();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {CIRCLES.map((c, i) => (
        <span
          key={i}
          data-backdrop-circle
          className="absolute block rounded-full"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            background: c.tone,
            /* Low enough that the densest body copy still clears AA over it.
               This is the number to change if the effect wants more presence,
               and the number to re-measure if it does. */
            opacity: 0.07,
          }}
        />
      ))}
    </div>
  );
}
