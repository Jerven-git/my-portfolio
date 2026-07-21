import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useIsPlayful } from '../usePlayfulMode';
import { useSyncedBeat } from '../useSyncedBeat';

const SHAPES = [0, 1, 2];

const projects = [
  {
    id: 1,
    title: 'CRM Web App',
    category: 'Full-Stack',
    description:
      'Added features and modules to an established client-management CRM in production use, working across Laravel with Blade templating and jQuery for dynamic UI behavior.',
    tech: ['Laravel', 'Blade', 'jQuery', 'PHP', 'MySQL'],
    featured: false,
    demo: 'https://crm.databasy.io/login',
  },
  {
    id: 2,
    title: 'Staff Management Platform',
    category: 'Full-Stack',
    description:
      'Sole developer. Built a staff management system on a Laravel backend with a Vue.js frontend, extending it with additional modules in Django and React.js.',
    tech: ['Laravel', 'Vue', 'Django', 'React', 'Python'],
    featured: true,
    demo: null,
  },
  {
    id: 3,
    title: 'E-Commerce Web App',
    category: 'E-Commerce',
    description:
      'Sole developer. Designed and built a responsive online store end to end and shipped it to production — a Nuxt.js storefront on a Laravel backend API.',
    tech: ['Nuxt', 'Vue', 'Laravel', 'PHP'],
    featured: true,
    // Was pointed at a scratch domain (default.testing-testing-123.com). A demo
    // link that reads as a placeholder costs more credibility than no link.
    demo: null,
  },
  {
    id: 4,
    title: 'Custom CMS Platform',
    category: 'Full-Stack',
    description:
      'Sole developer. Built a fully modular CMS from scratch — dynamic page building, reusable blocks and sections, a role-based admin panel, and real-time editing. Laravel, Vue/Nuxt, Tailwind CSS.',
    tech: ['Laravel', 'Vue', 'Nuxt', 'Tailwind CSS'],
    featured: true,
    demo: null,
  },
  {
    id: 5,
    title: 'Shopify Theme Customization',
    category: 'E-Commerce',
    description:
      'Customized Shopify themes on a short-term project, adding features like calendars and product filters using Liquid, HTML, CSS, and JavaScript.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    featured: false,
    demo: 'https://sasrentals.com.au/',
  },
];

const categories = ['All', 'Full-Stack', 'E-Commerce'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

/**
 * The three advance-markers beside each index.
 *
 * Hover is driven by one paused WAAPI animation per shape, played forward on
 * enter and reversed on leave. A fresh `animate()` call per event would restart
 * from zero and make a fast in-out flicker; reversing an existing animation
 * picks up from wherever it got to, so an interrupted hover unwinds smoothly.
 */
function Shapes({ hovered }) {
  const ref = useRef(null);
  const animsRef = useRef([]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return undefined;
    const marks = [...host.children];
    if (!marks.length || typeof marks[0].animate !== 'function') return undefined;

    const anims = marks.map((el, i) => {
      const a = el.animate(
        // `translate`, not `transform` — the synced pulse owns scale/opacity on
        // these same elements, and separate properties compose cleanly.
        { translate: ['0px', '14px'] },
        { duration: 420, delay: i * 70, fill: 'both', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
      a.pause();
      return a;
    });
    animsRef.current = anims;

    return () => {
      anims.forEach((a) => a.cancel());
      animsRef.current = [];
    };
  }, []);

  /* Driven by the row's hover, not this element's. The markers are three 14px
     bars; requiring the cursor to land on them would make the effect
     undiscoverable. Hovering anywhere on the project advances them. */
  useEffect(() => {
    animsRef.current.forEach((a) => {
      a.playbackRate = hovered ? 1 : -1;
      a.play();
    });
  }, [hovered]);

  return (
    <span ref={ref} aria-hidden className="flex items-center gap-1" data-shapes>
      {SHAPES.map((i) => (
        <span
          key={i}
          data-beat="pulse"
          data-beat-delay={i * 110}
          className="block h-1 w-3.5 rounded-full bg-verm"
        />
      ))}
    </span>
  );
}

/* Ruled rows, not a card grid. Featured work gets a larger title and a wider
   measure; the rest sit tighter. Identical cards repeated five times was the
   tell — and it gave a CRM the same visual weight as a theme tweak. */
function ProjectRow({ project, index, animate }) {
  const { title, description, tech, demo, featured, category } = project;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onPointerEnter={animate ? () => setHovered(true) : undefined}
      onPointerLeave={animate ? () => setHovered(false) : undefined}
      className="group grid gap-5 border-b border-ink/10 py-10 md:grid-cols-[1fr_1.4fr] md:gap-14"
    >
      <div>
        {/* The index is the section's spine and stays in both modes — it is
            information design, not decoration. Only the shapes beside it move,
            and only in playful mode.

            The number is the project's position in the full list, not in the
            filtered view. Renumbering per filter would make "01" refer to a
            different project depending on which button is pressed; the gaps
            are honest and quietly say there is more behind the filter. */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-sm font-bold tabular-nums text-vermink">
            {String(index + 1).padStart(2, '0')}
          </span>
          {/* Rendered only when they can move. Static, the three marks are
              decoration that means nothing — they read as advance-markers
              purely because they advance. */}
          {animate && <Shapes hovered={hovered} />}
        </div>

        <h3
          className={`font-extrabold tracking-[-0.03em] text-ink ${
            featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
          }`}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted">{category}</p>
      </div>

      <div>
        <p className={`leading-relaxed text-muted ${featured ? 'text-lg' : 'text-base'}`}>
          {description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <li key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink">
              {t}
            </li>
          ))}
        </ul>

        {demo ? (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-vermink underline-offset-4 hover:underline"
          >
            Visit the live site
            <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <p className="mt-6 text-sm text-muted">Private client work — no public demo.</p>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const playful = useIsPlayful();
  const reduced = useReducedMotion();
  const animate = playful && !reduced;

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  /* `activeFilter` is the re-attach signal: rows unmount on filter change, so
     their animations die with them and the survivors need re-tagging. The hook
     keeps its epoch across runs, so nothing re-phases. */
  useSyncedBeat(sectionRef, animate, activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I've built"
          beatWord={animate ? 'built' : undefined}
          lede="Full-stack applications, e-commerce storefronts, and the infrastructure underneath them."
        />

        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => {
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? 'bg-verm text-ink'
                    : 'border border-ink/15 text-muted hover:border-ink/40 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          ref={ref}
          layout
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="border-t border-ink/10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
                animate={animate}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
