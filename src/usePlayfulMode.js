import { useCallback, useEffect, useState } from 'react';
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
export function usePlayfulMode() {
  const [playful, setPlayful] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (playful) root.dataset.playful = 'on';
    else delete root.dataset.playful;
  }, [playful]);

  const toggle = useCallback(() => {
    const flip = () => setPlayful((p) => !p);

    const reduced = window.matchMedia(REDUCED).matches;
    if (reduced || typeof document.startViewTransition !== 'function') {
      flip();
      return;
    }

    document.startViewTransition(() => flushSync(flip));
  }, []);

  return [playful, toggle];
}
