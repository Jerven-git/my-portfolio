import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeading from './SectionHeading';

const summary =
  'Full-stack web developer with three years at PageOne247. Sole developer on three end-to-end systems in Laravel and Vue/Nuxt — a modular CMS, a staff management platform, and an e-commerce storefront that shipped to production. I ship the application and run the hosting, DNS, and TLS underneath it, and I use AI-assisted tooling to do both faster.';

const experience = [
  {
    role: 'Full-Stack Web Developer',
    company: 'PageOne247',
    period: 'Jul 2023 – Jun 2026',
    description:
      'Sole developer on three systems — a modular CMS, a staff management platform, and an e-commerce storefront that shipped to production. Added features and modules to an established CRM, customized Shopify themes on a live storefront, and ran the hosting, DNS, and TLS behind all of it.',
  },
];

const education = [
  {
    degree: 'B.Sc. Information Technologies',
    institution: 'Interface Computer College',
    period: 'Aug 2021 – Oct 2025',
  },
];

const highlights = [
  'Three years building production Laravel + Vue/Nuxt applications',
  'Full-stack delivery from CRM and staff systems to e-commerce',
  'Hands-on with Django, React.js, and Shopify Liquid',
  'Hosting, DNS, TLS, and Cloudflare tunnels across four providers',
];

/* DNS is the substrate under all four, not four separate achievements — so it
   sits in the intro line rather than being repeated on every row. Each row
   names what is actually distinct about that platform. */
const infrastructure = [
  {
    platform: 'DigitalOcean',
    detail: 'Droplet provisioning and upkeep, SSL certificates, WordPress hosting.',
  },
  {
    platform: 'Cloudflare',
    detail: 'DNS management and tunnel configuration.',
  },
  {
    platform: 'HostGator',
    detail: 'Project deployment and email forwarding.',
  },
  {
    platform: 'GoDaddy',
    detail: 'Domain and DNS management.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

export default function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cv" className="relative bg-canvas px-6 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Curriculum vitae" lede={summary} />

        <motion.a
          href={`${import.meta.env.BASE_URL}cv.pdf`}
          download="Jerven_Latayada_CV.pdf"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="mb-20 inline-flex items-center gap-2.5 rounded-full bg-verm px-7 py-3.5 font-semibold text-ink"
        >
          <Download size={18} />
          Download CV (PDF)
        </motion.a>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-14 md:grid-cols-2"
        >
          <div className="space-y-14">
            <div>
              <motion.h3 variants={itemVariants} className="mb-8 text-2xl font-bold tracking-[-0.02em]">
                Experience
              </motion.h3>

              {experience.map((exp) => (
                <motion.div key={exp.role} variants={itemVariants} className="border-t border-ink/10 pt-6">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-bold text-ink">{exp.role}</h4>
                    <span className="text-sm text-muted">{exp.period}</span>
                  </div>
                  <p className="mb-3 text-sm font-semibold text-vermink">{exp.company}</p>
                  <p className="leading-relaxed text-muted">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <motion.div variants={itemVariants} className="mb-8">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold tracking-[-0.02em]">Infrastructure &amp; operations</h3>
                  <span className="text-sm text-muted">Jul 2023 – Jun 2026</span>
                </div>
                <p className="text-muted">
                  I run the hosting, DNS, and TLS behind the apps I ship.
                </p>
              </motion.div>

              <motion.dl
                variants={itemVariants}
                className="divide-y divide-ink/10 border-y border-ink/10"
              >
                {infrastructure.map(({ platform, detail }) => (
                  <div key={platform} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-bold text-ink">{platform}</dt>
                    <dd className="text-muted">{detail}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>

          <div className="space-y-14">
            <div>
              <motion.h3 variants={itemVariants} className="mb-8 text-2xl font-bold tracking-[-0.02em]">
                Education
              </motion.h3>

              {education.map((edu) => (
                <motion.div key={edu.degree} variants={itemVariants} className="border-t border-ink/10 pt-6">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-bold text-ink">{edu.degree}</h4>
                    <span className="text-sm text-muted">{edu.period}</span>
                  </div>
                  <p className="text-muted">{edu.institution}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <motion.h3 variants={itemVariants} className="mb-8 text-2xl font-bold tracking-[-0.02em]">
                Highlights
              </motion.h3>

              <motion.ul variants={itemVariants} className="divide-y divide-ink/10 border-t border-ink/10">
                {highlights.map((item) => (
                  <li key={item} className="py-4 text-muted">
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
