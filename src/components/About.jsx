import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import { useIsPlayful } from '../usePlayfulMode';

/* Numbers as a plain typographic row. The old treatment — icon tile, gradient
   number, small label, repeated three across — is the hero-metric template,
   the most recognizable SaaS/AI cliché on the page. */
const stats = [
  { value: '3+', label: 'years building production apps' },
  { value: '15+', label: 'projects shipped' },
  { value: '7+', label: 'live sites maintained' },
];

const highlights = [
  {
    title: 'Full-Stack Dev',
    description: 'Building end-to-end web solutions with modern frameworks and clean architecture.',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deploying scalable apps on DigitalOcean with Docker and NGINX.',
  },
  {
    title: 'E-Commerce',
    description: 'Crafting high-converting stores on Shopify, WooCommerce, and custom platforms.',
  },
  {
    title: 'Performance First',
    description: 'Optimizing every layer — from database queries to front-end rendering speed.',
  },
  {
    title: 'AI & Automation',
    description: 'Leveraging AI tools like Claude and Cursor, plus n8n workflows, to build and automate faster.',
  },
];

const facts = [
  ['Location', 'Davao City, PH'],
  ['Experience', '3+ Years'],
  ['Role', 'Full-Stack Developer'],
  ['Availability', 'Open to Work'],
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

/* Playful mode only.
 *
 * The crafted side keeps the single calm ease-out reveal it always had: one
 * gesture per section, nothing springs, nothing reacts to the cursor. Springy
 * type is personality, and personality is what the playful side is for.
 *
 * Within playful mode the stats and the highlight titles are what move. They
 * earn it: short, high-contrast, no reading required. Body prose never jumps —
 * animating a paragraph someone is reading is motion working against reading.
 *
 * A well-damped spring, not a bounce ease. The distinction matters: bounce and
 * elastic curves overshoot repeatedly and read as toy. This settles in roughly
 * one overshoot, which reads as weight.
 */
/* Containers pin opacity to 1 in both states. A container variant that omits
   opacity inherits whatever the previously applied variant left behind, which
   is how the stats and highlights lists ended up stranded at opacity 0 after a
   mode toggle — children fully visible inside an invisible parent. */
const staggerOn = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerOff = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0 } },
};

/* Fade only. Used whenever the visitor has asked for reduced motion. */
const flatFade = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const statJump = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 430, damping: 24, mass: 0.9 },
  },
};

/* The highlight rows use a shorter throw than the stats. Same spring family,
   but 30px of travel on a 5-item list is a lot of movement in a small column;
   the numbers can afford it because there are only three and they are large. */
const listStaggerOn = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rowJump = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 460, damping: 26, mass: 0.85 },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();
  const playful = useIsPlayful();

  /* One switch for the whole section. `lively` off means every element falls
     back to the calm `itemVariants` reveal the crafted side has always used —
     same end state, no spring, no hover reaction. */
  const lively = playful && !reduced;

  /* Children always carry the reveal and containers never fade; only the
     character changes with the mode. Outside playful mode the stagger is 0, so
     the items rise together and read as the single calm gesture the crafted
     side has always had. Keeping one structure across both modes is what stops
     a toggle from stranding anything. */
  const statVariant = reduced ? flatFade : lively ? statJump : itemVariants;
  const rowVariant = reduced ? flatFade : lively ? rowJump : itemVariants;
  const spring = (y) => ({ y, transition: { type: 'spring', stiffness: 520, damping: 17 } });

  return (
    <section id="about" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {/* Always split, in both modes. `lively` changes only the timing, so
              the DOM never churns on a toggle. Conditionally swapping between a
              plain and a split heading remounted it mid-life and left the words
              at opacity 0. */}
          <SectionHeading
            jump
            lively={lively}
            title="About me"
            lede="I turn complex problems into systems that hold up in production — and I've been doing it across the whole stack for three years."
          />

          <motion.dl
            variants={lively ? staggerOn : staggerOff}
            className="mb-20 flex flex-col gap-8 border-y border-ink/10 py-8 sm:flex-row sm:gap-16"
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={statVariant}
                className="group flex items-baseline gap-3"
              >
                <dt className="sr-only">{label}</dt>
                <dd className="flex items-baseline gap-3">
                  {/* Only the number lifts on hover. Moving the label with it
                      would drag the whole row and lose the sense that the
                      figure itself is the object being touched. */}
                  <motion.span
                    whileHover={lively ? spring(-6) : undefined}
                    className={`inline-block text-4xl font-extrabold tracking-[-0.04em] text-verm transition-colors duration-200${
                      lively ? ' cursor-default group-hover:text-vermink' : ''
                    }`}
                  >
                    {value}
                  </motion.span>
                  <span className="max-w-[16ch] text-sm leading-snug text-muted">{label}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="grid items-start gap-14 md:grid-cols-2">
            <motion.div variants={itemVariants} className="space-y-5">
              <p className="text-lg leading-relaxed text-ink">
                I work across the full web stack — front-ends with Vue, Nuxt, and React, back-ends
                with Laravel, Django, and Python.
              </p>
              <p className="leading-relaxed text-muted">
                I'm comfortable with managed hosting and deployment, working with DigitalOcean and
                HostGator, and configuring production-grade setups using Docker and NGINX.
              </p>
              <p className="leading-relaxed text-muted">
                Beyond traditional development, I use AI-assisted tools like Claude, Cursor, and
                Codex to work smarter and ship faster, and I build automation workflows with n8n to
                streamline repetitive tasks and connect the systems businesses rely on.
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 pt-6">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="mb-1 text-xs uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* A ruled list, not a card grid. Five identical cards with an icon
                tile above each heading was the template tell. */}
            <motion.ul
              variants={lively ? listStaggerOn : staggerOff}
              className="divide-y divide-ink/10 border-y border-ink/10"
            >
              {highlights.map(({ title, description }) => (
                <motion.li key={title} variants={rowVariant} className="group py-5">
                  {/* Only the title reacts to hover. Lifting the description
                      with it would move a paragraph the reader may be mid-way
                      through, which is motion working against reading. The
                      colour shift is original craft behaviour and stays in both
                      modes; only the lift is playful-only. */}
                  <motion.h3
                    whileHover={lively ? spring(-3) : undefined}
                    className="mb-1.5 origin-left text-base font-bold text-ink transition-colors group-hover:text-verm"
                  >
                    {title}
                  </motion.h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
