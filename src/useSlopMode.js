import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * AI Mode: flips the page into the generic AI-template system.
 *
 * State lives on <html data-slop> rather than in React so that CSS alone drives
 * the swap — every section responds without threading props.
 *
 * The toggle is the site's signature moment, so it runs through the View
 * Transitions API: the headline morphs in place, the vermilion field morphs
 * into the orb wash, the toggle button travels. flushSync is required — the
 * browser snapshots the DOM the instant the callback returns, so the React
 * update has to be synchronous or it captures the old tree twice.
 *
 * Progressive enhancement: without startViewTransition (Firefox today), or
 * under prefers-reduced-motion, this is a plain state flip. The 0.55s body
 * color/font transition still carries it, and the mode still works.
 */
export function useSlopMode() {
  const [slop, setSlop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (slop) root.dataset.slop = 'on';
    else delete root.dataset.slop;
  }, [slop]);

  const toggle = useCallback(() => {
    const flip = () => setSlop((s) => !s);

    const reduced = window.matchMedia(REDUCED).matches;
    if (reduced || typeof document.startViewTransition !== 'function') {
      flip();
      return;
    }

    document.startViewTransition(() => flushSync(flip));
  }, []);

  return [slop, toggle];
}
