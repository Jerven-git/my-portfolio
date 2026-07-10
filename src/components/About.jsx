import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

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
    description: 'Deploying scalable apps on DigitalOcean with Docker, NGINX, and CI/CD pipelines.',
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

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={itemVariants}>
            <SectionHeading
              title="About me"
              lede="I turn complex problems into systems that hold up in production — and I've been doing it across the whole stack for three years."
            />
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="mb-20 flex flex-col gap-8 border-y border-ink/10 py-8 sm:flex-row sm:gap-16"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-3">
                <dt className="sr-only">{label}</dt>
                <dd className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold tracking-[-0.04em] text-verm">{value}</span>
                  <span className="max-w-[16ch] text-sm leading-snug text-muted">{label}</span>
                </dd>
              </div>
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
            <motion.ul variants={itemVariants} className="divide-y divide-ink/10 border-y border-ink/10">
              {highlights.map(({ title, description }) => (
                <li key={title} className="group py-5">
                  <h3 className="mb-1.5 text-base font-bold text-ink transition-colors group-hover:text-verm">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
