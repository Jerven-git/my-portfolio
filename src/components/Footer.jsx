import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/Jerven-git', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerven-latayada-280903230/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:latayada1233@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'CV', href: '#cv' },
];

/* Inverted: ink ground, canvas type. Closes the page on a hard stop rather than
   fading out, and gives the primary CTA one last uncontested moment. */
export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-20 text-canvas">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Hiring, or just curious?
          </p>
          <a
            href="mailto:latayada1233@gmail.com"
            className="mt-4 inline-block text-xl font-semibold text-verm underline-offset-4 hover:underline md:text-2xl"
          >
            latayada1233@gmail.com
          </a>
        </div>

        <div className="mb-14 grid gap-10 border-t border-canvas/15 pt-10 md:grid-cols-3">
          <div>
            <p className="mb-3 text-lg font-bold">&lt;Jerven /&gt;</p>
            <p className="max-w-xs text-sm leading-relaxed text-canvas/70">
              Full-stack web developer building clean, performant, scalable systems.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 text-sm font-semibold">Quick links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-canvas/70 transition-colors duration-200 hover:text-canvas"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-sm font-semibold">Elsewhere</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/20 text-canvas/70 transition-colors duration-200 hover:border-canvas/60 hover:text-canvas"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-canvas/15 pt-8 text-sm text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jerven Latayada.</p>
          <p>Designed and built by hand. AI helped.</p>
        </div>
      </div>
    </footer>
  );
}
