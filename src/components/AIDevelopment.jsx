import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';

const aiProjects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Platform',
    description:
      'A multi-tenant e-commerce platform with custom theme presets, dynamic payment integrations, and full store & domain management for each tenant.',
    tech: ['Nuxt', 'Laravel', 'Docker', 'Bun', 'NGINX'],
    color: '#f472b6',
    gradient: 'from-pink-600/20 to-rose-600/10',
  },
  {
    id: 2,
    title: 'Dispatching System',
    description:
      'A system for dispatching workers to service requests, coordinating assignments and tracking jobs end to end.',
    tech: ['Next.js', 'Laravel', 'Docker', 'npm', 'NGINX'],
    color: '#a78bfa',
    gradient: 'from-violet-600/20 to-purple-600/10',
  },
  {
    id: 3,
    title: 'Ticketing System',
    description:
      'A platform for creating events and selling tickets, handling event setup, inventory, and checkout.',
    tech: ['Vue', 'Laravel', 'Docker', 'npm', 'NGINX'],
    color: '#38bdf8',
    gradient: 'from-sky-600/20 to-cyan-600/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AIProjectCard({ project }) {
  return (
    <motion.div
      variants={cardVariants}
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

      {/* AI tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${project.color}22`, color: project.color, border: `1px solid ${project.color}33` }}
        >
          <Sparkles size={12} />
          AI-Assisted
        </span>
      </div>

      <h3 className="text-slate-100 font-bold text-xl mb-3">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

      {/* Tech stack */}
      {project.tech.length > 0 && (
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
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
        <span className="text-xs text-slate-500 italic">No demo available</span>
      </div>
    </motion.div>
  );
}

export default function AIDevelopment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ai-development" className="relative py-28 px-6 overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="inline-flex items-center gap-2 text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">
            <Bot size={16} />
            Built With AI
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
            AI <span className="gradient-text">Development</span>
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-pink-500 to-violet-500 rounded-full mx-auto mb-5" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Full-scale applications I've built faster and smarter using AI-assisted development tools and workflows.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aiProjects.map((project) => (
            <AIProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
