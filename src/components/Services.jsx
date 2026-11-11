import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { services } from '../content/business';

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="business-services bg-canvas px-6 py-24 text-ink md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Software built around your business" lede="A new website, a custom application, or a better way to run daily operations. Start with the problem you need to solve." />
        <div className="service-list">
          {services.map((service) => (
            <Motion.article
              key={service.title}
              className="service-row"
              initial={false}
              whileInView={reduced ? undefined : { opacity: [0.75, 1], y: [12, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{service.title}</h3>
              <div>
                <p className="service-row__problem">{service.problem}</p>
                <p>{service.solution}</p>
                <p className="service-row__evidence">Relevant experience: {service.evidence}</p>
              </div>
              <a href="#contact" aria-label={`Discuss ${service.title.toLowerCase()}`}><ArrowUpRight size={22} /></a>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
