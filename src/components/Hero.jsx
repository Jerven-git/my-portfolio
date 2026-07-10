import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useSlopMode } from '../useSlopMode';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Jerven-git', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerven-latayada-280903230/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:latayada1233@gmail.com', label: 'Email' },
];

const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

/* View-transition names. Exactly one element may carry a given name at a time;
   the craft and slop heroes never render together, so these are morph targets
   across the swap, not duplicates.
 *
 * `headline` and `toggle` are shared: the same conceptual object exists on both
 * sides, so the browser interpolates its box and it reads as travel.
 *
 * `field` and `wash` are deliberately NOT shared. Sharing them made the group
 * morph from the right-hand panel to the full-viewport orb container, which
 * stretched the vermilion snapshot into a red wash over the whole page. Two
 * names means two independent animations: the panel wipes out, the orbs bloom
 * in. Enter-only and exit-only groups are legal and are what we want here. */
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

function AIModeToggle({ slop, onToggle, tone }) {
  const onVermilion = tone === 'vermilion';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={slop}
      style={VT.toggle}
      className={
        onVermilion
          ? 'group inline-flex items-center gap-2 self-start rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-verm'
          : 'group inline-flex items-center gap-2 self-start rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-200 transition-colors duration-200 hover:bg-violet-500/20'
      }
    >
      {slop ? 'Back to the real one' : 'See the AI version'}
      <ArrowUpRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

/* AI Mode: the page as an unsupervised model would have made it. Kept faithful
   on purpose. If this looks like a decent portfolio, the joke fails. */
function SlopHero({ onToggle, reduced, entrance }) {
  const rise = useRise(reduced, entrance);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-grid px-6">
      <div aria-hidden style={VT.wash} className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="orb absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          {...rise(0)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Available for new projects
        </motion.div>

        <motion.h1
          {...rise(0.1)}
          style={VT.headline}
          className="mb-4 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
        >
          Hi, I&apos;m <span className="gradient-text glow-text">Jerven Latayada</span>
        </motion.h1>

        <motion.p
          {...rise(0.2)}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
        >
          I build modern full-stack web applications and enjoy learning emerging technologies to
          deliver scalable, maintainable solutions that help businesses grow and succeed.
        </motion.p>

        <motion.div {...rise(0.3)} className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <span className="glow-sm rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 font-semibold text-white">
            View My Work
          </span>
          <span className="rounded-xl border border-slate-600 px-7 py-3 font-semibold text-slate-200">
            Download CV
          </span>
        </motion.div>

        <motion.div {...rise(0.45)} className="flex flex-col items-center gap-5">
          <p className="text-sm text-slate-500">
            Every AI portfolio looks like this. Yours probably did too.
          </p>
          <AIModeToggle slop onToggle={onToggle} tone="violet" />
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

      {/* Committed vermilion field: ~38% of the surface. Morphs into the orb
          wash when AI Mode engages. */}
      <motion.aside
        {...rise(0.1)}
        style={VT.field}
        className="flex flex-col justify-end gap-7 bg-verm px-8 py-16 md:absolute md:inset-y-0 md:right-0 md:w-[38%] md:px-12 md:py-14"
      >
        <p className="max-w-[14ch] text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:text-5xl">
          AI helped. It didn&apos;t decide.
        </p>
        <AIModeToggle slop={false} onToggle={onToggle} tone="vermilion" />
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
  const [slop, toggle] = useSlopMode();
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
      {slop ? (
        <SlopHero onToggle={handleToggle} reduced={reduced} entrance={entrance} />
      ) : (
        <CraftHero onToggle={handleToggle} reduced={reduced} entrance={entrance} />
      )}
    </section>
  );
}
