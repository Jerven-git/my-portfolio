import { useEffect, useRef } from 'react';

/**
 * One heartbeat for an entire section, via the Web Animations API.
 *
 * Why WAAPI rather than framer-motion, which the rest of the site uses:
 *
 * The projects list filters. Rows mount and unmount as the visitor switches
 * between All / Full-Stack / E-Commerce, so every row begins its life at a
 * different moment. Anything that starts its animation on mount is therefore
 * out of phase with its neighbours — five rows pulsing at the same *rate* but
 * on five different beats, which reads as noise rather than as a system.
 *
 * WAAPI solves this exactly. Every animation on the page shares one clock
 * (`document.timeline`), and `startTime` is writable. Anchoring every animation
 * to a single epoch captured once means a row that mounts thirty seconds late
 * doesn't start from zero — it joins the beat already in progress, mid-phase.
 * That is real synchronisation, not "same duration, started whenever".
 *
 * It also costs nothing: WAAPI is native, so this is 0kb of dependency against
 * roughly 17kb for a library that still would not do the phase-locking part.
 *
 * Elements opt in by carrying `data-beat`, whose value selects the motion.
 * Consumers never touch an Animation object; they just tag markup.
 */

const BEAT_MS = 2600;

/* The hop occupies the first ~18% of the cycle and rests for the remainder.
   A word that jumps continuously is a distraction; one that jumps every 2.6
   seconds is a pulse the eye catches and then stops watching. */
const HOP = [
  { translate: '0 0%', offset: 0 },
  { translate: '0 -26%', offset: 0.07, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { translate: '0 0%', offset: 0.18, easing: 'cubic-bezier(0.5, 0, 0.75, 0)' },
  { translate: '0 0%', offset: 1 },
];

/* Deliberately animates `opacity` and `scale` and NOT `transform`. The hover
   slide in ProjectRow drives `translate`, and `translate`/`scale` are separate
   CSS properties — so the two animations compose instead of the later one
   clobbering the earlier. Routing both through `transform` made the shapes
   snap back to origin the moment the pulse ticked. */
const PULSE = [
  { opacity: 0.35, scale: 1, offset: 0 },
  { opacity: 1, scale: 1.35, offset: 0.12 },
  { opacity: 0.35, scale: 1, offset: 0.32 },
  { opacity: 0.35, scale: 1, offset: 1 },
];

const KEYFRAMES = { hop: HOP, pulse: PULSE };

export function useSyncedBeat(rootRef, enabled, signal) {
  /* Captured once and never recomputed. If this were re-read on each run, a
     filter change would silently re-phase the whole section — which is the bug
     the hook exists to prevent. */
  const epochRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('[data-beat]');
    if (!targets.length) return undefined;
    // Very old browsers, and jsdom: degrade to no motion rather than throw.
    if (typeof targets[0].animate !== 'function') return undefined;

    if (epochRef.current == null) {
      const now = document.timeline?.currentTime;
      epochRef.current = typeof now === 'number' ? now : 0;
    }
    const epoch = epochRef.current;

    const animations = [];
    targets.forEach((el) => {
      const keyframes = KEYFRAMES[el.dataset.beat];
      if (!keyframes) return;

      // Stagger ripples across a row's shapes. Because the delay is derived
      // from the element's own index rather than from mount order, shape 2 of
      // row 5 stays locked to shape 2 of row 1.
      const delay = Number(el.dataset.beatDelay ?? 0);

      const animation = el.animate(keyframes, {
        duration: BEAT_MS,
        iterations: Infinity,
        delay,
        easing: 'linear',
      });

      /* The whole trick. `epoch` is in the past, so the animation does not
         begin — it resumes, at whatever phase the section would be in had this
         element existed since the beginning. */
      try {
        animation.startTime = epoch;
      } catch {
        // Some engines reject a past startTime on an unresolved timeline.
        // Losing phase-lock is worse than losing nothing, but not fatal.
      }

      animations.push(animation);
    });

    return () => animations.forEach((a) => a.cancel());
  }, [enabled, signal, rootRef]);
}
