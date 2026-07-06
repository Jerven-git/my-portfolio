import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Users, Zap, Sparkles, Globe } from 'lucide-react';

const stats = [
  { icon: Code2, value: '3+', label: 'Years Coding' },
  { icon: Globe, value: '15+', label: 'Projects Built' },
  { icon: Zap, value: '7+', label: 'Websites Managed' },
];

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Dev',
    description: 'Building end-to-end web solutions with modern frameworks and clean architecture.',
  },
  {
    icon: Rocket,
    title: 'Cloud & DevOps',
    description: 'Deploying scalable apps on DigitalOcean with Docker, NGINX, and CI/CD pipelines.',
  },
  {
    icon: Users,
    title: 'E-Commerce',
    description: 'Crafting high-converting stores on Shopify, WooCommerce, and custom platforms.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimizing every layer — from database queries to front-end rendering speed.',
  },
  {
    icon: Sparkles,
    title: 'AI & Automation',
    description: 'Leveraging AI tools like Claude and Cursor, plus n8n workflows, to build and automate faster.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Who I Am</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-sky-400 rounded-full mx-auto" />
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-16"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/15 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-violet-400" />
                </div>
                <span className="text-3xl md:text-4xl font-extrabold gradient-text">{value}</span>
                <span className="text-slate-400 text-xs sm:text-sm mt-1">{label}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text Block */}
            <motion.div variants={itemVariants} className="space-y-5">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-violet-300 font-semibold">Full-Stack Web Developer</span> who
                loves turning complex problems into elegant, user-friendly digital experiences.
              </p>
              <p className="text-slate-400 leading-relaxed">
                With 3+ years of hands-on experience, I work across the full web
                stack — building front-ends with Vue, Nuxt, and React, and back-ends
                with Laravel, Django, and Python.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I'm also comfortable with managed hosting and deployment, working with
                DigitalOcean and HostGator, and configuring production-grade setups
                using Docker and NGINX.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Beyond traditional development, I actively use AI-assisted tools like
                Claude, Cursor, and Codex to work smarter and ship faster, and I'm
                building automation workflows with n8n to streamline repetitive tasks
                and connect the systems businesses rely on.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                {[
                  ['Location', 'Davao City, PH'],
                  ['Experience', '3+ Years'],
                  ['Role', 'Full-Stack Developer'],
                  ['Availability', 'Open to Work'],
                ].map(([label, value]) => (
                  <div key={label} className="glass rounded-xl p-4">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-slate-100 font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Highlight Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="glass rounded-2xl p-5 cursor-default group"
                  style={{ border: '1px solid rgba(108,99,255,0.15)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center mb-4 group-hover:bg-violet-500/25 transition-colors">
                    <Icon size={20} className="text-violet-400" />
                  </div>
                  <h3 className="text-slate-100 font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
