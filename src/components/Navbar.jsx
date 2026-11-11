import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsPlayful } from '../usePlayfulMode';

import { navigationLinks as links } from '../content/business';

export default function Navbar() {
  const playful = useIsPlayful();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('site-menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  if (playful) return null;

  return (
    <Motion.nav
      aria-label="Main navigation"
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/10 bg-canvas/85 py-3 backdrop-blur-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold text-ink tracking-tight"
        >
          &lt;Jerven /&gt;
        </Motion.a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-5">
          {links.map((link, i) => (
            <Motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <a
                href={link.href}
                className="text-sm text-ink transition-colors duration-200 relative group hover:opacity-70"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink group-hover:w-full transition-all duration-300" />
              </a>
            </Motion.li>
          ))}
          <Motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#contact"
              className="text-sm font-semibold px-4 py-2 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-canvas transition-colors duration-200"
            >
              Start a Project
            </a>
          </Motion.li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          id="site-menu-toggle"
          type="button"
          aria-controls="site-mobile-menu"
          className="lg:hidden flex h-11 w-11 items-center justify-center text-ink transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="site-mobile-menu"
            className="lg:hidden mt-2 border-t border-ink/10 bg-canvas/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-ink transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li><a href="#contact" className="project-inquiry" onClick={() => setMenuOpen(false)}>Start a Project</a></li>
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
}
