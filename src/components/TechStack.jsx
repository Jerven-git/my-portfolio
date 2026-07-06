import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const techCategories = [
  {
    name: 'Front-End',
    color: '#38bdf8',
    techs: [
      { name: 'Vue', icon: '💚', level: 90 },
      { name: 'Nuxt', icon: '🟢', level: 90 },
      { name: 'React', icon: '⚛️', level: 85 },
      { name: 'JavaScript', icon: '✨', level: 90 },
    ],
  },
  {
    name: 'Back-End',
    color: '#6c63ff',
    techs: [
      { name: 'Laravel', icon: '🔴', level: 90 },
      { name: 'PHP', icon: '🐘', level: 90 },
      { name: 'Django', icon: '🎸', level: 80 },
      { name: 'Python', icon: '🐍', level: 82 },
    ],
  },
  {
    name: 'E-Commerce',
    color: '#a78bfa',
    techs: [
      { name: 'Shopify', icon: '🛍️', level: 60 },
      { name: 'Liquid', icon: '💧', level: 60 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    color: '#34d399',
    techs: [
      { name: 'DigitalOcean', icon: '🌊', level: 80 },
      { name: 'HostGator', icon: '🐊', level: 70 },
      { name: 'Docker', icon: '🐳', level: 85 },
      { name: 'NGINX', icon: '⚙️', level: 80 },
    ],
  },
  {
    name: 'AI & Automation',
    color: '#f472b6',
    techs: [
      { name: 'Claude', icon: '🤖', level: 90 },
      { name: 'Cursor', icon: '🖱️', level: 85 },
      { name: 'OpenCode', icon: '🧩', level: 80 },
      { name: 'Codex / ChatGPT', icon: '💬', level: 85 },
      { name: 'Gemini', icon: '♊', level: 80 },
      { name: 'n8n', icon: '🔗', level: 55 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function TechChip({ name, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 cursor-default transition-colors"
      style={{ background: `${color}0d`, border: `1px solid ${color}1f` }}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-slate-200 text-sm font-medium">{name}</span>
    </motion.div>
  );
}

function CategoryCard({ name, color, techs }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-6"
      style={{ border: `1px solid ${color}22` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-2 h-8 rounded-full"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}44)` }}
        />
        <h3 className="text-slate-100 font-bold text-lg">{name}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {techs.map((tech) => (
          <TechChip key={tech.name} {...tech} color={color} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="relative py-28 px-6 overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute left-0 bottom-0 w-96 h-96 pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">What I Work With</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-sky-400 rounded-full mx-auto mb-5" />
          <p className="text-slate-400 max-w-xl mx-auto">
            A versatile toolkit spanning front-end frameworks, back-end systems, e-commerce platforms, cloud infrastructure, and AI-assisted development.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </motion.div>

        {/* Floating tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['Laravel', 'Vue', 'Nuxt', 'React', 'Django', 'Python', 'PHP', 'JavaScript', 'Shopify', 'Liquid', 'Tailwind CSS', 'DigitalOcean', 'HostGator', 'Docker', 'NGINX', 'Claude', 'Cursor', 'OpenCode', 'Codex', 'Gemini', 'n8n'].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:text-slate-100 cursor-default transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
