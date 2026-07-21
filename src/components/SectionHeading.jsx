import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * One heading treatment for every section.
 *
 * Deliberately omits the three things the old sections shared: a tiny uppercase
 * tracked eyebrow, gradient-clipped heading text, and a little gradient rule
 * underneath. Each is an AI tell, and repeating them section after section is
 * what made the page read as scaffolding rather than design.
 *
 * Hierarchy comes from scale and weight instead.
 *
 * `jump` is opt-in and currently used by one section. Applying the word-by-word
 * entrance to every heading on the page would be the same mistake as the
 * eyebrow: an identical flourish repeated until it reads as template. One
 * section that moves differently is emphasis; six are wallpaper.
 */

const SPRING = { type: 'spring', stiffness: 430, damping: 26, mass: 0.85 };
const CALM = { duration: 0.6, ease: [0.25, 1, 0.5, 1] };

/* Every variant below declares opacity AND y in both states, and the container
   pins opacity to 1 rather than leaving it unset.
 *
 * This is not stylistic. Framer keeps the last animated value for any property
 * a newly applied variant does not mention, so a container whose `hidden` was
 * `{}` could sit at opacity 0 forever once the mode swap handed it a different
 * variant object — the section rendered, measured correct, and was invisible.
 * Full property sets make the swap unable to strand anything.
 */
const groupVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const groupFlat = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0 } },
};

const wordSpring = {
  hidden: { opacity: 0, y: '0.5em' },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

const wordCalm = {
  hidden: { opacity: 0, y: '0.5em' },
  visible: { opacity: 1, y: 0, transition: CALM },
};

/* Reduced motion still reveals — it just does not travel. */
const wordStill = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const ledeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const ledeStill = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* `jump` chooses the structure (split into words); `lively` chooses only the
   character of the motion. Keeping those separate is what lets a caller switch
   modes without changing the DOM — swapping between a plain <h2> and a split
   one remounts the heading mid-life, and the remount was half of why the About
   section could come back invisible. */
/* Match ignoring case and edge punctuation, so a caller can ask for "built"
   and still hit "built." or "Built". */
const sameWord = (a, b) =>
  a.toLowerCase().replace(/^\W+|\W+$/g, '') === b.toLowerCase().replace(/^\W+|\W+$/g, '');

export default function SectionHeading({
  title,
  lede,
  align = 'left',
  jump = false,
  lively = false,
  beatWord,
}) {
  const centered = align === 'center';
  const reduced = useReducedMotion();
  const springy = lively && !reduced;
  const wrapper = centered ? 'mb-16 text-center' : 'mb-16 max-w-3xl';
  const h2 = 'text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:text-6xl';
  const p = `lede mt-6 text-muted ${centered ? 'mx-auto' : ''}`;

  const words = title.split(' ');

  /* Marks one word for an external timeline to drive. This component never
     animates it and imports no animation code for it — it only tags the span,
     so the section that owns the beat can find it with `[data-beat]`. Keeps
     the shared heading ignorant of WAAPI. */
  if (!jump) {
    return (
      <div className={wrapper}>
        <h2 className={h2}>
          {beatWord
            ? words.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  {sameWord(w, beatWord) ? (
                    <span data-beat="hop" className="inline-block">
                      {w}
                    </span>
                  ) : (
                    w
                  )}
                  {i < words.length - 1 ? ' ' : null}
                </Fragment>
              ))
            : title}
        </h2>
        {lede && <p className={p}>{lede}</p>}
      </div>
    );
  }

  return (
    <motion.div variants={springy ? groupVariants : groupFlat} className={wrapper}>
      {/* Split by word, not by letter. Per-letter staggering on a display
          heading turns a two-word phrase into eight separate events and reads
          as effect; per-word keeps it one gesture. No overflow mask, because
          clipping an inline-block eats descenders.

          The separators are real space text nodes, not margin. Spacing the
          spans visually with `me-[0.25em]` looked identical but left the
          accessible name, text selection, and find-in-page reading "Aboutme" —
          the gap has to exist in the content, not only in the layout. */}
      <h2 className={h2}>
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <motion.span
              variants={reduced ? wordStill : springy ? wordSpring : wordCalm}
              className="inline-block"
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h2>
      {lede && (
        <motion.p variants={reduced ? ledeStill : ledeVariants} className={p}>
          {lede}
        </motion.p>
      )}
    </motion.div>
  );
}
