import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const aiProjects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Platform',
    description:
      'A multi-tenant e-commerce platform with custom theme presets, dynamic payment integrations, and full store & domain management for each tenant.',
    tech: ['Nuxt', 'Laravel', 'Docker', 'Bun', 'NGINX'],
  },
  {
    id: 2,
    title: 'Dispatching System',
    description:
      'A system for dispatching workers to service requests, coordinating assignments and tracking jobs end to end.',
    tech: ['Next.js', 'Laravel', 'Docker', 'npm', 'NGINX'],
  },
  {
    id: 3,
    title: 'Ticketing System',
    description:
      'A platform for creating events and selling tickets, handling event setup, inventory, and checkout.',
    tech: ['Vue', 'Laravel', 'Docker', 'npm', 'NGINX'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
};

/**
 * The one drenched section. It carries the site's central claim, so it gets the
 * page's second vermilion moment, echoing the hero panel.
 *
 * Everything here is ink on vermilion (4.66:1). `text-muted` would drop to
 * 1.74:1 on this ground — never use it inside this section.
 */
export default function AIDevelopment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ai-development" className="relative bg-verm px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:text-6xl">
            Built with AI. Directed by me.
          </h2>
          {/* Full ink, no alpha: ink/85 drops to 4.00:1 on this ground. */}
          <p className="lede mt-6 text-ink">
            Full-scale applications shipped faster using AI-assisted tooling — architecture,
            review, and judgement still mine.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="border-t border-ink/25"
        >
          {aiProjects.map(({ id, title, description, tech }) => (
            <motion.article
              key={id}
              variants={rowVariants}
              className="grid gap-5 border-b border-ink/25 py-10 md:grid-cols-[1fr_1.4fr] md:gap-14"
            >
              <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink md:text-3xl">
                {title}
              </h3>

              <div>
                <p className="leading-relaxed text-ink">{description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/30 px-3 py-1 text-xs font-semibold text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
