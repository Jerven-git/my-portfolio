import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Jerven-git', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerven-latayada-280903230/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:latayada1233@gmail.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-grid overflow-hidden px-6"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '0s',
          }}
        />
        <div
          className="orb absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '3s',
          }}
        />
        <div
          className="orb absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight"
        >
          Hi, I'm{' '}
          <span className="gradient-text glow-text">Jerven Latayada</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-slate-300 mb-6"
        >
          Full-Stack Web Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build modern full-stack web applications and enjoy learning emerging
          technologies to deliver scalable, maintainable solutions that help
          businesses grow and succeed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 glow-sm hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
          <a
            href="#cv"
            className="px-7 py-3 rounded-xl font-semibold text-slate-200 border border-slate-600 hover:border-violet-500/60 hover:bg-violet-500/5 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-5"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 border border-slate-700 hover:border-violet-500/50 hover:bg-violet-500/10 transition-colors duration-200"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
