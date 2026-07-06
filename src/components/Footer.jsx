import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 py-14 px-6 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold gradient-text mb-3"
            >
              &lt;Jerven /&gt;
            </motion.p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full-Stack Web Developer crafting clean, performant, and scalable digital products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-slate-100 font-semibold text-sm mb-4">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-slate-100 font-semibold text-sm mb-4">Get in Touch</p>
            <p className="text-slate-500 text-sm mb-5">
              Available for freelance projects, contract work, and full-time opportunities.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-100 border border-slate-800 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Jerven Latayada. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1.5">
            Built with
            <Heart size={12} className="text-violet-400 fill-violet-400" />
            using React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
