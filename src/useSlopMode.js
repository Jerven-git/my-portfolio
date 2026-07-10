import { useCallback, useEffect, useState } from 'react';

/**
 * AI Mode: flips the page into the generic AI-template system.
 *
 * State lives on <html data-slop> rather than in React so that CSS alone
 * drives the swap, and so sections not yet migrated off the old system can
 * opt in later without threading props.
 *
 * Default is off, which means the crafted design is what renders without JS.
 */
export function useSlopMode() {
  const [slop, setSlop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (slop) root.dataset.slop = 'on';
    else delete root.dataset.slop;
  }, [slop]);

  const toggle = useCallback(() => setSlop((s) => !s), []);

  return [slop, toggle];
}
