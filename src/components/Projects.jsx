import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'CRM Web App',
    category: 'Full-Stack',
    description:
      'Built a CRM system for client management with interactive features, using Laravel with Blade templating and jQuery for dynamic UI behavior.',
    tech: ['Laravel', 'Blade', 'jQuery', 'PHP', 'MySQL'],
    color: '#6c63ff',
    gradient: 'from-violet-600/20 to-indigo-600/10',
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
    color: '#38bdf8',
    gradient: 'from-sky-600/20 to-cyan-600/10',
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
    color: '#34d399',
    gradient: 'from-emerald-600/20 to-teal-600/10',
    featured: true,
    demo: 'https://default.testing-testing-123.com/',
  },
  {
    id: 4,
    title: 'Custom CMS Platform',
    category: 'Full-Stack',
    description:
      'Developed a fully modular CMS with dynamic page building, reusable blocks/sections, role-based admin panel, and real-time editing using Laravel, Vue/Nuxt, and Tailwind CSS.',
    tech: ['Laravel', 'Vue', 'Nuxt', 'Tailwind CSS'],
    color: '#a78bfa',
    gradient: 'from-purple-600/20 to-pink-600/10',
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
    color: '#f59e0b',
    gradient: 'from-amber-600/20 to-orange-600/10',
    featured: false,
    demo: 'https://sasrentals.com.au/',
  },
];

const categories = ['All', 'Full-Stack', 'E-Commerce'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`relative glass rounded-2xl p-6 overflow-hidden group cursor-default bg-gradient-to-br ${project.gradient}`}
      style={{ border: `1px solid ${project.color}22` }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}88, transparent)` }}
      />

      {/* Category tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${project.color}22`, color: project.color, border: `1px solid ${project.color}33` }}
        >
          {project.category}
        </span>
        {project.featured && (
          <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-slate-100 font-bold text-xl mb-3 group-hover:text-slate-100 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-800"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: project.color }}
            aria-label="Live demo"
          >
            <ExternalLink size={14} />
            <span>{project.demoLabel || 'Live Demo'}</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        ) : (
          <span className="text-xs text-slate-500 italic">No demo available</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute right-0 top-1/2 w-80 h-80 pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-sky-400 rounded-full mx-auto mb-5" />
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of projects that showcase my range — from full-stack apps to e-commerce solutions and cloud deployments.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === cat
                  ? 'bg-violet-600 text-slate-100 shadow-lg shadow-violet-500/25'
                  : 'glass text-slate-400 hover:text-slate-100 hover:border-violet-500/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          ref={ref}
          layout
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
