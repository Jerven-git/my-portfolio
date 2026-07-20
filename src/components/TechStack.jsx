import { motion, useInView } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import StackFlame from './StackFlame';
import StackMascot from './StackMascot';
import { useIsPlayful } from '../usePlayfulMode';

/* One element per row, reasoned from what the stack physically does rather
 * than assigned by hue. Front-end work is fast and cool; back-end work is a
 * forge. Colors are normalized RGB for the shader.
 *
 * These six hues exist in playful mode only, inside the flame, on hover, one at
 * a time. The crafted mode never sees them: it runs a committed single-accent
 * palette, and six category colours arriving on hover would break the one rule
 * the whole design rests on. Playful mode is the side that has already declared
 * the restraint is a choice, so it is the side that can afford them.
 *
 * `alpha` is the peak opacity of each field. The field burns only in the row's
 * bottom padding (see handleEnter), so it never sits behind text and these can
 * run near-opaque. Vapour is the outlier at 0.72 because it is meant to read as
 * mist rather than fire.
 */
const c = (hex) => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

const ELEMENTS = {
  // Cold, fast, wispy. Blue flame burns hotter than orange, which is the joke.
  'Front-End': {
    core: c('#1d4ed8'), mid: c('#38bdf8'), tip: c('#bae6fd'),
    rise: 1.3, turb: 1.0, scale: 3.4, spark: 0.0, alpha: 0.92, ink: '#0b3a8f',
    hi: 'hi! I live here',
  },
  // Plasma: the site's own rose, churning. Ties the 3D row to the hero.
  '3D & Motion': {
    core: c('#c2185b'), mid: c('#e85c86'), tip: c('#ffd6e2'),
    rise: 0.95, turb: 1.7, scale: 2.6, spark: 0.3, alpha: 0.92, ink: '#7a0d38',
    hi: "this one's my favourite",
  },
  // Molten forge: slow, heavy, dense. Server work is not wispy.
  'Back-End': {
    core: c('#dc2626'), mid: c('#f97316'), tip: c('#fed7aa'),
    rise: 0.65, turb: 0.7, scale: 2.1, spark: 0.12, alpha: 0.95, ink: '#7c2d12',
    hi: 'warm down here',
  },
  // Embers: sparse, spark-heavy, rising fast.
  'E-Commerce': {
    core: c('#ea580c'), mid: c('#f59e0b'), tip: c('#fde68a'),
    rise: 1.5, turb: 1.15, scale: 4.0, spark: 0.55, alpha: 0.85, ink: '#854d0e',
    hi: 'ka-ching',
  },
  // Vapour: barely a flame. Diffuse, slow, cool — infrastructure you forget.
  'Cloud & Infrastructure': {
    core: c('#0891b2'), mid: c('#67e8f9'), tip: c('#ecfeff'),
    rise: 0.45, turb: 0.5, scale: 1.7, spark: 0.0, alpha: 0.72, ink: '#155e75',
    hi: "it's foggy up here",
  },
  /* Electric arc: fastest and most turbulent, and it throws sparks. Pushed
     acid rather than leafy — a mid-green at this band height reads as grass,
     so the mid tone is brighter than the element's ink and the spark count is
     the highest of the six. */
  'AI & Automation': {
    core: c('#65a30d'), mid: c('#a3e635'), tip: c('#f7fee7'),
    rise: 2.1, turb: 2.1, scale: 3.0, spark: 0.75, alpha: 0.88, ink: '#3f6212',
    hi: 'beep boop, hi!',
  },
};

const techCategories = [
  {
    name: 'Front-End',
    techs: ['Vue', 'Nuxt', 'React', 'JavaScript'],
  },
  /* The only row carrying a proof link. "Show the running software" applies
     harder here than anywhere else on the page: the scene these four names
     describe is one toggle away, so claiming them in a pill and leaving it
     there would waste the strongest evidence the section has. One row with a
     link is a deliberate accent; a link on every row would be scaffolding. */
  {
    name: '3D & Motion',
    techs: ['Three.js', 'WebGL', 'GLSL', 'Framer Motion'],
    /* Playful mode only, so it cannot say "try the playful toggle" — by the
       time anyone reads it they have already thrown that switch. It points at
       what is running above them right now instead. */
    proof: 'Running in the hero above',
  },
  {
    name: 'Back-End',
    techs: ['Laravel', 'PHP', 'Django', 'Python'],
  },
  {
    name: 'E-Commerce',
    techs: ['Shopify', 'Liquid'],
  },
  {
    name: 'Cloud & Infrastructure',
    techs: ['DigitalOcean', 'Cloudflare', 'HostGator', 'GoDaddy', 'Docker', 'NGINX'],
  },
  {
    name: 'AI & Automation',
    techs: ['Claude', 'Cursor', 'OpenCode', 'Codex / ChatGPT', 'Gemini', 'n8n'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
};

/* A ruled definition list. The old version used a colored bar beside each
   heading — a side-stripe accent, and emoji as tech icons. Both went. */
const CategoryRow = forwardRef(function CategoryRow(
  { name, techs, proof, showProof, element, isActive, onEnter, onLeave },
  ref
) {
  return (
    <motion.div
      ref={ref}
      variants={rowVariants}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      /* `relative` is load-bearing, not cosmetic: the flame canvas is an
         absolutely positioned sibling, and positioned elements paint above
         static ones regardless of DOM order. Without this the field would
         cover its own row's text. */
      className="group/row relative z-10 grid gap-4 border-b border-ink/10 py-7 md:grid-cols-[16rem_1fr] md:gap-10"
    >
      {/* Colour comes from the same `active` state that drives the field and
          the mascot, not from CSS :hover. The two disagree: :hover re-resolves
          on scroll, while pointerenter does not fire without pointer movement,
          so a stationary cursor over a scrolling list left one row tinted and
          a different row burning. One source of truth, no desync. */}
      <h3
        className="text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300"
        style={element && isActive ? { color: element.ink } : undefined}
      >
        {name}
      </h3>

      {/* The proof link lives under the pills, not beside the heading. In the
          16rem heading column it wrapped to two lines and stranded its arrow
          on a line of its own. `items-start` keeps the pills at their natural
          height: as a stretched grid child this list makes `rounded-full`
          resolve to circles on any row tall enough to have a link. */}
      <div>
        <ul className="flex flex-wrap items-start gap-2">
          {techs.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-verm hover:bg-verm hover:text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
        {proof && showProof && (
          <a
            href="#hero"
            className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-vermink underline-offset-4 hover:underline"
          >
            {proof}
            <ArrowUp
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover/link:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </motion.div>
  );
});

/* Can this visitor receive hover-driven motion at all? Gated on a device that
   can hover and on a user who has not asked for reduced motion. Says nothing
   about which mode is active — see `effects` for that. */
function useHoverMotionOk() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(mq.matches && !rm.matches);
    sync();
    mq.addEventListener('change', sync);
    rm.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      rm.removeEventListener('change', sync);
    };
  }, []);

  return enabled;
}

export default function TechStack() {
  const ref = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const hoverOk = useHoverMotionOk();
  const playful = useIsPlayful();
  const [active, setActive] = useState(null);

  /* Every row effect — the element field, the mascot, the per-row heading
     colour — belongs to playful mode alone. The crafted side runs a committed
     single-accent palette, so six category hues appearing on hover would break
     the one colour rule the whole design is built on, flame or not. */
  const effects = hoverOk && playful;

  const handleEnter = useCallback(
    (i) => {
      if (!effects) return;
      const row = rowRefs.current[i];
      const el = ELEMENTS[techCategories[i].name];
      if (!row || !el) return;

      /* The field burns in the row's bottom padding, never behind the text.
         Measured, not assumed: rows differ in height, and the 3D row's proof
         link sits low enough that a full-row field put it at 1.91:1 against
         its own plasma. Confining the band below the lowest content baseline
         makes the contrast question disappear rather than be negotiated, and
         lets the field run at a much higher opacity than a text-safe overlay
         ever could. */
      const rowRect = row.getBoundingClientRect();
      let contentBottom = rowRect.top;
      for (const child of row.children) {
        const r = child.getBoundingClientRect();
        if (r.bottom > contentBottom) contentBottom = r.bottom;
      }
      const band = Math.max(16, Math.round(rowRect.bottom - contentBottom));

      // offsetTop is relative to the list, which is the offsetParent.
      setActive({
        top: row.offsetTop + row.offsetHeight - band,
        height: band,
        el,
        key: techCategories[i].name,
        // The mascot rides the whole row, not the flame band.
        rowTop: row.offsetTop + Math.round(row.offsetHeight / 2) - 35,
      });
    },
    [effects]
  );

  const handleLeave = useCallback(() => setActive(null), []);

  return (
    <section id="stack" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I work with"
          lede="Front-end frameworks, real-time 3D, back-end systems, e-commerce platforms, cloud infrastructure, and AI-assisted development."
        />

        <motion.div
          ref={(node) => {
            ref.current = node;
            listRef.current = node;
          }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative border-t border-ink/10"
        >
          {effects && <StackFlame active={active} />}
          {effects && <StackMascot active={active} />}
          {techCategories.map((cat, i) => (
            <CategoryRow
              key={cat.name}
              {...cat}
              ref={(node) => {
                rowRefs.current[i] = node;
              }}
              element={effects ? ELEMENTS[cat.name] : null}
              /* Gated on the mode alone, not on `effects`: this is a link, and
                 whether it renders should not depend on having a fine pointer. */
              showProof={playful}
              isActive={active?.key === cat.name}
              onEnter={() => handleEnter(i)}
              onLeave={handleLeave}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
