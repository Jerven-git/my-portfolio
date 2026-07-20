import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { usePlayfulMode } from '../usePlayfulMode';
import PlayfulScene from './PlayfulScene';
import CursorBubbles from './CursorBubbles';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Jerven-git', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerven-latayada-280903230/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:latayada1233@gmail.com', label: 'Email' },
];

const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

/* View-transition names. Exactly one element may carry a given name at a time;
   the two heroes never render together, so these are morph targets across the
   swap, not duplicates.
 *
 * `headline` and `toggle` are shared: the same conceptual object exists on both
 * sides, so the browser interpolates its box and it reads as travel.
 *
 * `field` and `wash` are deliberately NOT shared. Sharing them made the group
 * morph from the right-hand panel to the full-width 3D stage, which stretched
 * the vermilion snapshot into a red wash over the whole page. Two names means
 * two independent animations: the panel wipes out, the stage blooms in.
 * Enter-only and exit-only groups are legal and are what we want here.
 *
 * `wash` names the stage wrapper rather than the <canvas>: a view transition
 * snapshots a canvas as a single scaled frame, so naming the element that
 * actually animates keeps the bloom clean while WebGL starts up beneath it. */
const VT = {
  headline: { viewTransitionName: 'hero-headline' },
  field: { viewTransitionName: 'mode-field' },
  wash: { viewTransitionName: 'mode-wash' },
  toggle: { viewTransitionName: 'mode-toggle' },
};

/**
 * Entrance choreography, first page load only.
 *
 * On a mode toggle the View Transition snapshots the new DOM the instant React
 * commits. If framer were still holding `opacity: 0` for its entrance, that's
 * what the browser would capture — the page would morph into nothing.
 */
function useRise(reduced, enabled) {
  return (delay = 0) => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, y: reduced ? 0 : 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : delay, ease: EASE_OUT_QUART },
    };
  };
}

function ModeToggle({ playful, onToggle, tone }) {
  const onVermilion = tone === 'vermilion';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playful}
      style={VT.toggle}
      className={
        onVermilion
          ? 'group inline-flex items-center gap-2 self-start rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-verm'
          : 'sticker group inline-flex items-center gap-2 self-center bg-verm px-6 py-3 text-sm text-ink'
      }
    >
      {playful ? 'Back to the sharp one' : 'See the playful one'}
      <ArrowUpRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

/* Playful mode: the same person, off the leash.
 *
 * The argument this side makes is that the restraint on the crafted side is a
 * choice rather than a ceiling — so the execution here has to be as exact as
 * the quiet version. Loud and sloppy would prove nothing.
 *
 * The 3D stage sits above the headline rather than behind it. Text over a
 * moving maroon blob cannot hold a contrast ratio, and no amount of scrim
 * fixes that honestly; stacking them keeps every ratio in the table intact. */
function PlayfulHero({ onToggle, reduced, entrance }) {
  const rise = useRise(reduced, entrance);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dots px-6 py-14">
      <CursorBubbles reduced={reduced} />

      {/* The whole column is sized to land the return toggle above the fold at
          900px tall. Stranding the only way back below the scroll would make
          the mode feel like a trap rather than a switch. */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          {...rise(0)}
          style={VT.wash}
          className="pointer-events-none h-[clamp(140px,22vh,230px)] w-full"
        >
          <PlayfulScene reduced={reduced} />
        </motion.div>

        <motion.div
          {...rise(0.06)}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-vermink"
        >
          <MousePointer2 size={14} className={reduced ? undefined : 'bob'} />
          Move your cursor
        </motion.div>

        <motion.h1 {...rise(0.12)} style={VT.headline} className="playful-title mb-5">
          Same systems.
          <br />
          <span className="text-vermink">More bounce.</span>
        </motion.h1>

        <motion.p {...rise(0.2)} className="lede mb-7 text-muted">
          Full-stack developer. CRM platforms, storefronts, and modular CMSs — architected, built,
          and shipped end to end. The rigour doesn&apos;t change when the palette does.
        </motion.p>

        <motion.div {...rise(0.28)} className="mb-7 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:latayada1233@gmail.com" className="sticker bg-verm px-8 py-3.5 text-ink">
            Email me
          </a>
          <a href="#cv" className="sticker-ghost px-8 py-3.5 text-ink">
            Download CV
          </a>
        </motion.div>

        <motion.div {...rise(0.36)} className="mb-7 flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/15 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-vermink hover:text-vermink"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        <motion.div {...rise(0.44)}>
          <ModeToggle playful onToggle={onToggle} tone="playful" />
        </motion.div>
      </div>
    </div>
  );
}

function CraftHero({ onToggle, reduced, entrance }) {
  const rise = useRise(reduced, entrance);

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-x-10 px-6 md:grid-cols-12">
        <div className="py-24 md:col-span-7 md:py-0">
          <motion.h1 {...rise(0)} style={VT.headline} className="display mb-7">
            I build entire
            <br />
            systems. Alone.
          </motion.h1>

          <motion.p {...rise(0.08)} className="lede mb-10 text-muted">
            Full-stack developer. CRM platforms, storefronts, and modular CMSs — architected,
            built, and shipped end to end.
          </motion.p>

          <motion.div {...rise(0.16)} className="mb-8 flex flex-wrap items-center gap-3">
            <a
              href="mailto:latayada1233@gmail.com"
              className="rounded-full bg-verm px-7 py-3.5 font-semibold text-ink transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
            >
              Email me
            </a>
            <a
              href="#cv"
              className="rounded-full border border-ink/20 px-7 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-ink/50"
            >
              Download CV
            </a>
          </motion.div>

          {/* Speed is the closing argument, never the opener. */}
          <motion.p {...rise(0.24)} className="text-sm text-muted">
            AI-augmented delivery. Weeks, not quarters.
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-12 flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-muted transition-colors duration-200 hover:border-ink/40 hover:text-ink"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Committed vermilion field: ~38% of the surface. Wipes out as the
          playful 3D stage blooms in. */}
      <motion.aside
        {...rise(0.1)}
        style={VT.field}
        className="flex flex-col justify-end gap-7 bg-verm px-8 py-16 md:absolute md:inset-y-0 md:right-0 md:w-[38%] md:px-12 md:py-14"
      >
        <p className="max-w-[14ch] text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:text-5xl">
          AI helped. It didn&apos;t decide.
        </p>
        <ModeToggle playful={false} onToggle={onToggle} tone="vermilion" />
      </motion.aside>

      <motion.div
        {...rise(0.5)}
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted md:block"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [playful, toggle] = usePlayfulMode();
  const reduced = useReducedMotion();

  // The entrance choreography belongs to first paint only. Once the user has
  // toggled, the View Transition owns the motion — and framer must not be
  // holding `opacity: 0` when the browser snapshots the incoming DOM.
  const [hasToggled, setHasToggled] = useState(false);

  const handleToggle = useCallback(() => {
    setHasToggled(true);
    toggle();
  }, [toggle]);

  const entrance = !hasToggled;

  return (
    <section id="hero" className="relative overflow-hidden bg-canvas text-ink">
      {playful ? (
        <PlayfulHero onToggle={handleToggle} reduced={reduced} entrance={entrance} />
      ) : (
        <CraftHero onToggle={handleToggle} reduced={reduced} entrance={entrance} />
      )}
    </section>
  );
}
