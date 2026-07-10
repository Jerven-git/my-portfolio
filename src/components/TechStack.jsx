import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const techCategories = [
  {
    name: 'Front-End',
    techs: ['Vue', 'Nuxt', 'React', 'JavaScript'],
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
    name: 'Cloud & DevOps',
    techs: ['DigitalOcean', 'HostGator', 'Docker', 'NGINX'],
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
function CategoryRow({ name, techs }) {
  return (
    <motion.div
      variants={rowVariants}
      className="grid gap-4 border-b border-ink/10 py-7 md:grid-cols-[16rem_1fr] md:gap-10"
    >
      <h3 className="text-xl font-bold tracking-[-0.02em] text-ink">{name}</h3>
      <ul className="flex flex-wrap gap-2">
        {techs.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-verm hover:bg-verm hover:text-ink"
          >
            {tech}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I work with"
          lede="Front-end frameworks, back-end systems, e-commerce platforms, cloud infrastructure, and AI-assisted development."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="border-t border-ink/10"
        >
          {techCategories.map((cat) => (
            <CategoryRow key={cat.name} {...cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
