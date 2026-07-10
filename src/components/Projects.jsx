import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const projects = [
  {
    id: 1,
    title: 'CRM Web App',
    category: 'Full-Stack',
    description:
      'Built a CRM system for client management with interactive features, using Laravel with Blade templating and jQuery for dynamic UI behavior.',
    tech: ['Laravel', 'Blade', 'jQuery', 'PHP', 'MySQL'],
    featured: true,
    demo: 'https://crm.databasy.io/login',
  },
  {
    id: 2,
    title: 'Staff Management Platform',
    category: 'Full-Stack',
    description:
      'Developed a staff management solution with a Laravel backend and Vue.js frontend, with additional modules built in Django and React.js.',
    tech: ['Laravel', 'Vue', 'Django', 'React', 'Python'],
    featured: true,
    demo: null,
  },
  {
    id: 3,
    title: 'E-Commerce Web App',
    category: 'E-Commerce',
    description:
      'Created a responsive online store using Nuxt.js for the storefront and Laravel for the backend API, delivering a dynamic shopping experience.',
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
      'Developed a fully modular CMS with dynamic page building, reusable blocks/sections, role-based admin panel, and real-time editing using Laravel, Vue/Nuxt, and Tailwind CSS.',
    tech: ['Laravel', 'Vue', 'Nuxt', 'Tailwind CSS'],
    featured: false,
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

/* Ruled rows, not a card grid. Featured work gets a larger title and a wider
   measure; the rest sit tighter. Identical cards repeated five times was the
   tell — and it gave a CRM the same visual weight as a theme tweak. */
function ProjectRow({ project }) {
  const { title, description, tech, demo, featured, category } = project;

  return (
    <motion.article
      layout
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group grid gap-5 border-b border-ink/10 py-10 md:grid-cols-[1fr_1.4fr] md:gap-14"
    >
      <div>
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I've built"
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
              <ProjectRow key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
