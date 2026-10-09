import { useRef } from 'react';
import { motion as Motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Database, LayoutDashboard, Server, ShieldCheck, Store } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useIsPlayful } from '../usePlayfulMode';

const featuredProjects = [
  {
    id: 'databasy-platform',
    name: 'DATABASY / SSU',
    type: 'Multi-tenant commerce platform',
    statement: 'A branded storefront for each merchant. One operational workspace behind every store.',
    description:
      'Built end to end with Nuxt and Laravel: tenant-resolved storefronts, catalogue and order workflows, configurable themes, subscriptions, payments, domains, staff access, and separate tenant and platform administration.',
    role: 'Full-stack architecture, product UI, backend APIs, infrastructure',
    system: 'Nuxt 4 · Laravel · MySQL · Reverb',
    delivery: 'Docker · NGINX · tenant-aware production stack',
    proof: ['Host-based tenant isolation', 'Storefront + admin', '2FA and role boundaries'],
    preview: 'commerce',
    link: null,
  },
  {
    id: 'databasy-crm',
    name: 'DataBasy CRM',
    type: 'Production client-management system',
    statement: 'Feature work inside a living CRM—not a greenfield demo.',
    description:
      'Extended an established client-management platform with production features and modules, working across Laravel, Blade, jQuery, PHP, and MySQL while preserving the behaviour of an existing system.',
    role: 'Full-stack feature delivery and production maintenance',
    system: 'Laravel · Blade · jQuery · PHP · MySQL',
    delivery: 'Existing production application with live authentication',
    proof: ['Mature codebase', 'Server-rendered UI', 'Live production surface'],
    preview: 'crm',
    link: 'https://crm.databasy.io/login',
  },
];

const supportingProjects = [
  {
    name: 'Azura Fresh',
    type: 'Food commerce + operations',
    description:
      'A multi-tenant food storefront and admin system covering catalogue, cart, checkout, payments, order tracking, delivery locations, and configurable public content.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    link: 'https://azura-fresh.pageone247.com',
  },
  {
    name: 'Sharon Comello Art',
    type: 'Gallery + art commerce',
    description:
      'A contemporary gallery experience for original artwork, collections, commissions, journal stories, gift cards, enquiries, and secure purchasing.',
    tech: 'Nuxt 4 · Laravel · Pinia · Stripe · Square',
    link: 'https://sca.pageone247.com',
  },
  {
    name: 'Elite Optometry United',
    type: 'Optometry services + appointments',
    description:
      'A configurable optometry services website with practice locations, suburb landing pages, and embedded appointment booking.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · NGINX',
    link: 'https://eliteoptometry.com.au',
  },
  {
    name: 'Tan',
    type: 'Configurable services website',
    description:
      'A services-focused website and administration experience for presenting services and managing public content.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    status: 'Private staging build',
  },
  {
    name: 'Staff Management Platform',
    type: 'Internal operations',
    description:
      'Sole developer on a Laravel and Vue staff-management system, later extended with Django and React modules.',
    tech: 'Laravel · Vue · Django · React · Python',
  },
  {
    name: 'Custom CMS Platform',
    type: 'Content infrastructure',
    description:
      'A modular CMS with page building, reusable blocks, role-based administration, and real-time editing.',
    tech: 'Laravel · Nuxt · Vue · Tailwind CSS',
  },
  {
    name: 'Shopify Storefront Work',
    type: 'Theme customization',
    description:
      'Production theme customization including product filtering, booking-calendar behaviour, and responsive storefront refinements.',
    tech: 'Shopify · Liquid · JavaScript · CSS',
    link: 'https://sasrentals.com.au/',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.25, 1, 0.5, 1] } },
};

function CommercePreview() {
  return (
    <div className="project-preview project-preview--commerce" role="group" aria-label="Illustrative DATABASY storefront and workspace preview">
      <div className="project-preview__label">
        <span>DATABASY</span>
        <span>Storefront + workspace</span>
      </div>
      <div className="commerce-preview__stage">
        <div className="commerce-preview__admin">
          <div className="commerce-preview__rail" aria-hidden="true">
            <span className="commerce-preview__mark">D</span>
            <LayoutDashboard size={14} />
            <Store size={14} />
            <Database size={14} />
          </div>
          <div className="commerce-preview__workspace">
            <span className="project-preview__micro">Store workspace</span>
            <strong>Run the work behind every sale.</strong>
            <div className="commerce-preview__tasks" aria-hidden="true">
              <span><Check size={12} /> Catalogue</span>
              <span><Check size={12} /> Orders</span>
              <span><Check size={12} /> Appearance</span>
            </div>
          </div>
        </div>
        <div className="commerce-preview__storefront">
          <div className="commerce-preview__browser" aria-hidden="true"><i /><i /><i /></div>
          <span className="project-preview__micro">Tenant storefront</span>
          <strong>Each store keeps its own identity.</strong>
          <div className="commerce-preview__product" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </div>
      <p className="project-preview__note">Interface preview based on the real DATABASY product structure.</p>
    </div>
  );
}

function CrmPreview() {
  return (
    <div className="project-preview project-preview--crm" role="group" aria-label="Illustrative DataBasy CRM workspace preview">
      <div className="project-preview__label">
        <span>DataBasy CRM</span>
        <span>Production system</span>
      </div>
      <div className="crm-preview__shell">
        <div className="crm-preview__nav">
          <span className="crm-preview__brand">DB</span>
          <span className="is-active">Workspace</span>
          <span>Records</span>
          <span>Modules</span>
        </div>
        <div className="crm-preview__main">
          <div>
            <span className="project-preview__micro">Client management</span>
            <strong>Production features in an established application.</strong>
          </div>
          <div className="crm-preview__rows" aria-hidden="true">
            <span><i /> Laravel modules <b>Live</b></span>
            <span><i /> Blade interface <b>Maintained</b></span>
            <span><i /> MySQL data layer <b>Production</b></span>
          </div>
        </div>
      </div>
      <p className="project-preview__note">Illustrative view; the live link opens the product login.</p>
    </div>
  );
}

function FeaturedProject({ project, index }) {
  return (
    <Motion.article
      variants={reveal}
      className={`featured-project ${index % 2 ? 'featured-project--reverse' : ''}`}
    >
      <div className="featured-project__visual">
        {project.preview === 'commerce' ? <CommercePreview /> : <CrmPreview />}
      </div>

      <div className="featured-project__copy">
        <div className="featured-project__identity">
          <span>{project.type}</span>
          <h3>{project.name}</h3>
        </div>
        <p className="featured-project__statement">{project.statement}</p>
        <p className="featured-project__description">{project.description}</p>

        <dl className="featured-project__facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>System</dt><dd>{project.system}</dd></div>
          <div><dt>Delivery</dt><dd>{project.delivery}</dd></div>
        </dl>

        <ul className="featured-project__proof" aria-label={`${project.name} project highlights`}>
          {project.proof.map((item) => <li key={item}><ShieldCheck size={15} />{item}</li>)}
        </ul>

        {project.link ? (
          <a className="featured-project__link" href={project.link} target="_blank" rel="noopener noreferrer">
            Open the live login <ArrowUpRight size={16} />
          </a>
        ) : (
          <p className="featured-project__private"><Server size={15} /> Private product build</p>
        )}
      </div>
    </Motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const playful = useIsPlayful();
  const reduced = useReducedMotion();
  const lively = playful && !reduced;

  return (
    <section id={playful ? 'project-archive' : 'projects'} className="projects-showcase relative bg-canvas px-6 py-28 text-ink">
      <Motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}
        className="mx-auto max-w-6xl"
      >
        <SectionHeading
          title="Systems in production"
          beatWord={lively ? 'production' : undefined}
          lede="The work behind the claim: platform architecture, a living CRM, and client products across commerce, healthcare, food, art, and services."
        />

        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <Motion.div variants={reveal} className="supporting-projects">
          <div className="supporting-projects__intro">
            <h3>More shipped work</h3>
            <p>Named client products and selected systems across distinct industries.</p>
          </div>
          <div className="supporting-projects__list">
            {supportingProjects.map((project) => (
              <article key={project.name} className="supporting-project">
                <div>
                  <span>{project.type}</span>
                  <h4>{project.name}</h4>
                </div>
                <p>{project.description}</p>
                <div className="supporting-project__meta">
                  <span>{project.tech}{project.status ? ` · ${project.status}` : ''}</span>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>
                      <ArrowUpRight size={17} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Motion.div>
      </Motion.div>
    </section>
  );
}
