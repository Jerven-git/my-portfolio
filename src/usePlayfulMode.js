import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * Playful mode: flips the page into the maroon-and-white system.
 *
 * The site runs two complete visual identities off one set of tokens. The
 * crafted one is the default and carries the argument; the playful one shows
 * the same work with the restraint lifted. Both are real — neither is a joke
 * nor a fallback.
 *
 * State lives on <html data-playful> rather than in React so that CSS alone
 * drives the swap — every section responds without threading props.
 *
 * The toggle is the site's signature moment, so it runs through the View
 * Transitions API: the headline morphs in place, the vermilion field wipes out
 * as the 3D stage blooms in, the toggle button travels. flushSync is required —
 * the browser snapshots the DOM the instant the callback returns, so the React
 * update has to be synchronous or it captures the old tree twice.
 *
 * Progressive enhancement: without startViewTransition (Firefox today), or
 * under prefers-reduced-motion, this is a plain state flip. The 0.55s body
 * color/font transition still carries it, and the mode still works.
 */
/**
 * Read-only view of the mode, for sections that need to know without owning it.
 *
 * The <html data-playful> attribute is already the contract every section's CSS
 * reads; this just makes it legible to JS too. Lifting the hero's state into a
 * context would couple every consumer to the hero's lifecycle for no gain —
 * the attribute is the single source of truth either way.
 */
export function useIsPlayful() {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.__MISSION_GRID_REVIEW__ === true);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setOn(root.dataset.playful === 'on');
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ['data-playful'] });
    return () => mo.disconnect();
  }, []);

  return on;
}

export function usePlayfulMode() {
  const [playful, setPlayful] = useState(() => typeof window !== 'undefined' && window.__MISSION_GRID_REVIEW__ === true);
  const transitionRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (playful) root.dataset.playful = 'on';
    else delete root.dataset.playful;
  }, [playful]);

  const toggle = useCallback((origin) => {
    if (transitionRef.current) return;

    const root = document.documentElement;
    const next = !playful;
    const x = Number.isFinite(origin?.x) ? origin.x : window.innerWidth * 0.82;
    const y = Number.isFinite(origin?.y) ? origin.y : window.innerHeight * 0.72;

    root.style.setProperty('--mode-origin-x', `${x}px`);
    root.style.setProperty('--mode-origin-y', `${y}px`);
    root.dataset.modeTransition = next ? 'to-playful' : 'to-crafted';

    const flip = () => {
      if (next) root.dataset.playful = 'on';
      else delete root.dataset.playful;
      setPlayful(next);
    };

    const resetPlayfulScroll = () => {
      if (!next) return;
      const previousScrollBehavior = root.style.scrollBehavior;
      const previousOverflowAnchor = root.style.overflowAnchor;
      root.style.scrollBehavior = 'auto';
      root.style.overflowAnchor = 'none';
      const reset = () => {
        root.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
      };
      reset();
      window.requestAnimationFrame(() => {
        reset();
        window.requestAnimationFrame(() => {
          reset();
          root.style.scrollBehavior = previousScrollBehavior;
          root.style.overflowAnchor = previousOverflowAnchor;
        });
      });
    };

    const reduced = window.matchMedia(REDUCED).matches;
    if (reduced || typeof document.startViewTransition !== 'function') {
      flip();
      resetPlayfulScroll();
      delete root.dataset.modeTransition;
      return;
    }

    const transition = document.startViewTransition(() => flushSync(flip));
    transitionRef.current = transition;
    const cleanupTransition = () => {
      if (transitionRef.current === transition) transitionRef.current = null;
      delete root.dataset.modeTransition;
      resetPlayfulScroll();
    };
    transition.finished.then(cleanupTransition, cleanupTransition);
  }, [playful]);

  return [playful, toggle];
}
