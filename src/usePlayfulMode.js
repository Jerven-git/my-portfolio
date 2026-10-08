import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const REDUCED = '(prefers-reduced-motion: reduce)';
const MODE_STORAGE_KEY = 'jerven-portfolio-mode';
const PORTAL_COVER_MS = 520;
const PORTAL_REVEAL_MS = 540;
const REDUCED_COVER_MS = 90;
const REDUCED_REVEAL_MS = 130;
let portalTransitionActive = false;

function readPlayfulPreference() {
  if (typeof window === 'undefined') return false;
  if (window.__MISSION_GRID_REVIEW__ === true) return true;
  if (document.documentElement.dataset.playful === 'on') return true;

  try {
    return window.localStorage.getItem(MODE_STORAGE_KEY) === 'playful';
  } catch {
    return false;
  }
}

function storePlayfulPreference(playful) {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, playful ? 'playful' : 'crafted');
  } catch {
    // The mode still works for this visit when storage is unavailable.
  }
}

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
 * The toggle is the site's signature moment. A full-screen pixel portal grows
 * from the control the visitor activated, covers the viewport, swaps worlds,
 * then collapses to reveal the destination. Because the swap happens only
 * while the portal is opaque, it works consistently without relying on the
 * View Transitions API. Reduced-motion visitors get a short color handoff.
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
  const [on, setOn] = useState(readPlayfulPreference);

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
  const [playful, setPlayful] = useState(readPlayfulPreference);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setPlayful(root.dataset.playful === 'on');
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ['data-playful'] });
    return () => mo.disconnect();
  }, []);

  const toggle = useCallback((origin) => {
    if (portalTransitionActive) return;

    const root = document.documentElement;
    const app = document.getElementById('root');
    const next = !playful;
    const x = Number.isFinite(origin?.x) ? origin.x : window.innerWidth * 0.82;
    const y = Number.isFinite(origin?.y) ? origin.y : window.innerHeight * 0.72;
    const reduced = window.matchMedia(REDUCED).matches;
    const coverDuration = reduced ? REDUCED_COVER_MS : PORTAL_COVER_MS;
    const revealDuration = reduced ? REDUCED_REVEAL_MS : PORTAL_REVEAL_MS;

    root.style.setProperty('--mode-origin-x', `${x}px`);
    root.style.setProperty('--mode-origin-y', `${y}px`);
    root.dataset.portalDirection = next ? 'enter' : 'exit';
    root.dataset.portalPhase = 'cover';
    app?.setAttribute('aria-busy', 'true');
    portalTransitionActive = true;

    const flip = () => {
      if (next) root.dataset.playful = 'on';
      else delete root.dataset.playful;
      storePlayfulPreference(next);
      setPlayful(next);
    };

    const resetDestinationScroll = () => {
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

    window.setTimeout(() => {
      flushSync(flip);
      resetDestinationScroll();
      root.dataset.portalPhase = 'reveal';

      window.setTimeout(() => {
        delete root.dataset.portalPhase;
        delete root.dataset.portalDirection;
        app?.removeAttribute('aria-busy');
        portalTransitionActive = false;
      }, revealDuration);
    }, coverDuration);
  }, [playful]);

  return [playful, toggle];
}
