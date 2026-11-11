import { ArrowUpRight, Mail } from 'lucide-react';
import { projectEmail } from '../content/business';

export default function Contact() {
  return (
    <section id="contact" className="business-contact px-6 py-24 md:py-28" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
        <div>
          <h2 id="contact-title" className="text-4xl font-extrabold leading-tight tracking-[-0.03em] md:text-6xl">Let’s talk about what your business needs.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">Have an idea, a process that needs improving, or an existing system that needs attention? Tell me what you’re working on and where you need help.</p>
          <a className="project-inquiry mt-8" href={projectEmail}>Start a Project <ArrowUpRight size={18} /></a>
          <p className="mt-4 text-sm">Opens your email app with a project outline you can edit.</p>
          <a className="contact-address mt-5" href="mailto:latayada1233@gmail.com"><Mail size={17} /> latayada1233@gmail.com</a>
        </div>
        <div className="inquiry-guide">
          <h3 className="text-xl font-bold">A useful starting point</h3>
          <ul>
            <li>Your business and the challenge you want to solve.</li>
            <li>What the website or application needs to do.</li>
            <li>Any existing tools or systems it needs to work with.</li>
            <li>Your preferred timeline and budget range, if known.</li>
          </ul>
          <p>You don’t need a technical specification to start the conversation.</p>
        </div>
      </div>
    </section>
  );
}
