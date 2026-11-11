import { motion as Motion, useReducedMotion } from 'framer-motion';
import { solutions } from '../content/business';
import { useIsPlayful } from '../usePlayfulMode';

// Reuses the original accent section for business use cases in both identities.
export default function AIDevelopment() {
  const reduced = useReducedMotion();
  const playful = useIsPlayful();

  return (
    <section id="solutions" className={`business-solutions relative px-6 py-24 md:py-28 ${playful ? 'business-solutions--playful' : 'bg-verm text-ink'}`} aria-labelledby="solutions-title">
      <span id="ai-development" className="anchor-alias" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <h2 id="solutions-title" className="text-4xl font-extrabold leading-tight tracking-[-0.03em] md:text-6xl">Practical solutions for everyday business challenges</h2>
          <p className="lede mt-6">Examples from my development work: selling online, coordinating service teams, and managing events. Each starts with a specific operational need.</p>
        </div>
        <div className="border-t border-current/25">
          {solutions.map((solution) => (
            <Motion.article
              key={solution.id}
              initial={false}
              whileInView={reduced ? undefined : { opacity: [0.75, 1], y: [16, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="grid gap-5 border-b border-current/25 py-10 md:grid-cols-[1fr_1.4fr] md:gap-14"
            >
              <div>
                <h3 className="text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">{solution.title}</h3>
                <p className="mt-4 text-sm font-semibold">{solution.name}</p>
              </div>
              <div className="solution-detail">
                <p className="font-semibold">{solution.problem}</p>
                <p className="mt-3">{solution.description}</p>
                <p className="mt-3">{solution.application}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${solution.name} technologies`}>
                  {solution.tech.map((tech) => <li key={tech} className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold">{tech}</li>)}
                </ul>
                <a className="solution-inquiry mt-6" href="#contact">Discuss a similar challenge <span aria-hidden="true">→</span></a>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
