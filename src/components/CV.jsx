import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Sparkles, User } from 'lucide-react';

const summary =
  'Full-Stack Web Developer with 3+ years of experience building and maintaining web applications using Laravel and Vue.js/Nuxt.js. I also have hands-on experience with Django, React.js, and Shopify in e-commerce development. Passionate about modern web technologies and continuously exploring how AI can improve development workflows and enhance product innovation.';

const experience = [
  {
    role: 'Full-Stack Web Developer',
    company: 'Freelance & Client Projects',
    period: '2022 – Present',
    description:
      'Building and maintaining full-stack web apps using Laravel and Vue/Nuxt — including a CRM, staff management platform, e-commerce store, custom CMS, and Shopify theme customizations.',
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
  '3+ years building production Laravel + Vue/Nuxt applications',
  'Full-stack delivery from CRM and staff systems to e-commerce',
  'Hands-on with Django, React.js, and Shopify Liquid',
  'Cloud deployment with DigitalOcean, Docker, and NGINX',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cv" className="relative py-28 px-6 overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute left-1/2 bottom-0 w-[500px] h-64 pointer-events-none opacity-5 -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse, #6c63ff 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">My Background</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5">
            Curriculum <span className="gradient-text">Vitae</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-sky-400 rounded-full mx-auto mb-5" />
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            A summary of my professional journey, education, and achievements.
          </p>

          {/* Download Button */}
          <motion.a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            download="Jerven_Latayada_CV.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 glow"
          >
            <Download size={20} />
            Download CV (PDF)
            <FileText size={16} className="opacity-70" />
          </motion.a>
          <p className="text-slate-400 text-xs mt-3">PDF · Updated 2026</p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 mb-12"
          style={{ border: '1px solid rgba(108,99,255,0.15)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
              <User size={20} className="text-violet-400" />
            </div>
            <h3 className="text-slate-100 font-bold text-xl">Summary</h3>
          </div>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">{summary}</p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Experience */}
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
                <Briefcase size={20} className="text-violet-400" />
              </div>
              <h3 className="text-slate-100 font-bold text-xl">Experience</h3>
            </motion.div>

            <div className="relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent" />

              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.role}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300/30" />

                    <div className="glass rounded-2xl p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h4 className="text-slate-100 font-semibold">{exp.role}</h4>
                        <span className="text-xs text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm font-medium mb-2">{exp.company}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education + Certs */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                  <GraduationCap size={20} className="text-sky-400" />
                </div>
                <h3 className="text-slate-100 font-bold text-xl">Education</h3>
              </motion.div>

              {education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5"
                  style={{ border: '1px solid rgba(56,189,248,0.15)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h4 className="text-slate-100 font-semibold">{edu.degree}</h4>
                    <span className="text-xs text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{edu.institution}</p>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Sparkles size={20} className="text-amber-400" />
                </div>
                <h3 className="text-slate-100 font-bold text-xl">Highlights</h3>
              </motion.div>

              <div className="space-y-3">
                {highlights.map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 glass rounded-xl px-5 py-3.5"
                    style={{ border: '1px solid rgba(245,158,11,0.15)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
