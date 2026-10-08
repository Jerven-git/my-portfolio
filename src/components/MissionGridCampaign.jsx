import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Check,
  DoorOpen,
  Download,
  ExternalLink,
  Flag,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Radio,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import crmInterface from '../../assets/plates/crm-interface.png';
import engineerToken from '../../assets/plates/engineer-token.png';
import projectPaper from '../../assets/plates/project-paper.png';
import PixelTargetCursor from './PixelTargetCursor';
import { useArcadeSound } from '../useArcadeSound';
import { usePlayfulMode } from '../usePlayfulMode';

const clientMissions = [
  {
    code: 'A',
    name: 'Azura Fresh',
    type: 'Food commerce + operations',
    description: 'Multi-tenant storefront and admin workflows for catalogue, checkout, payments, order tracking, delivery locations, and configurable public content.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    link: 'https://azura-fresh.pageone247.com',
  },
  {
    code: 'B',
    name: 'Sharon Comello Art',
    type: 'Gallery + art commerce',
    description: 'A contemporary gallery for original artwork, collections, commissions, journal stories, gift cards, enquiries, and secure purchasing.',
    tech: 'Nuxt 4 · Laravel · Pinia · Stripe · Square',
    link: 'https://sca.pageone247.com',
  },
  {
    code: 'C',
    name: 'Elite Optometry United',
    type: 'Optometry + appointments',
    description: 'A configurable practice website and store with services, locations, suburb landing pages, appointment booking, and commerce administration.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · NGINX',
    link: 'https://eliteoptometry.com.au',
  },
  {
    code: 'D',
    name: 'Tan',
    type: 'Configurable commerce platform',
    description: 'A storefront and admin build spanning products, services, commissions, gift cards, editorial content, checkout, payments, and backorders.',
    tech: 'Nuxt 4 · Laravel · Pinia · MySQL · Docker',
    status: 'Private staging build',
  },
];

const loadout = [
  ['Front-end', 'Vue · Nuxt · React · JavaScript'],
  ['Back-end', 'Laravel · PHP · Django · Python'],
  ['Commerce', 'Shopify · Liquid · Stripe · Square'],
  ['Infrastructure', 'Docker · NGINX · DigitalOcean · Cloudflare'],
  ['Realtime + motion', 'Reverb · Three.js · WebGL · Framer Motion'],
  ['AI + automation', 'Claude · Cursor · Codex · Gemini · n8n'],
];

const buildLogs = [
  ['AI-powered commerce platform', 'Multi-tenant themes, payments, domains, storefronts, and operations.', 'Nuxt · Laravel · Docker'],
  ['Dispatching system', 'Assignments and job tracking for service requests from dispatch to completion.', 'Next.js · Laravel · Docker'],
  ['Ticketing system', 'Event setup, ticket inventory, checkout, and operational management.', 'Vue · Laravel · Docker'],
];

const career = [
  {
    title: 'Full-Stack Web Developer',
    place: 'PageOne247',
    period: 'Jul 2023 – Jun 2026',
    copy: 'Sole developer across a modular CMS, staff platform, and production commerce system; also delivered CRM modules, Shopify customization, hosting, DNS, and TLS operations.',
  },
  {
    title: 'B.Sc. Information Technologies',
    place: 'Interface Computer College',
    period: 'Aug 2021 – Oct 2025',
    copy: 'Formal information-technology study completed alongside production full-stack work.',
  },
];

const reveal = {
  hidden: { opacity: 0.01, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } },
};

function MissionHeading({ marker, children, description }) {
  return (
    <header className="campaign-heading">
      <div className="campaign-heading__marker"><Flag aria-hidden="true" /><span>{marker}</span></div>
      <div>
        <h2>{children}</h2>
        {description && <p>{description}</p>}
      </div>
      <i aria-hidden="true" />
    </header>
  );
}

function PersistentHud({ visible, soundOn, onSound, onExit }) {
  return (
    <div className={`campaign-hud ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <span><Radio aria-hidden="true" /> Campaign live</span>
      <button
        type="button"
        onClick={onSound}
        aria-label={soundOn ? 'Mute arcade sound' : 'Enable arcade sound'}
        aria-pressed={soundOn}
        tabIndex={visible ? 0 : -1}
      >
        {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        <span>{soundOn ? 'Sound on' : 'Sound off'}</span>
      </button>
      <button
        className="campaign-hud__exit"
        type="button"
        onClick={onExit}
        aria-label="Return to the Crafted portfolio"
        title="Return to Crafted"
        tabIndex={visible ? 0 : -1}
      >
        <DoorOpen aria-hidden="true" />
      </button>
    </div>
  );
}

export default function MissionGridCampaign() {
  const reduced = useReducedMotion();
  const staticReview = typeof window !== 'undefined' && window.__MISSION_GRID_REVIEW__ === true;
  const calm = reduced || staticReview;
  const { soundOn, toggleSound, blip } = useArcadeSound();
  const [, toggleMode] = usePlayfulMode();
  const [hudVisible, setHudVisible] = useState(false);
  const [bursts, setBursts] = useState([]);
  const burstTimersRef = useRef(new Set());

  useEffect(() => {
    const update = () => setHudVisible(window.scrollY > window.innerHeight * 0.72);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const burstTimers = burstTimersRef.current;

    const handlePointerDown = (event) => {
      if (!event.isPrimary || event.button !== 0) return;

      if (!staticReview) {
        const toneTarget = event.target instanceof Element
          ? event.target.closest('[data-arcade-tone]')
          : null;
        blip(toneTarget?.dataset.arcadeTone || 'select');
      }

      if (calm) return;

      const id = `${Date.now()}-${Math.random()}`;
      setBursts((current) => [...current.slice(-3), { id, x: event.clientX, y: event.clientY }]);

      const timer = window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
        burstTimers.delete(timer);
      }, 520);
      burstTimers.add(timer);
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      burstTimers.forEach((timer) => window.clearTimeout(timer));
      burstTimers.clear();
    };
  }, [blip, calm, staticReview]);

  const handleExit = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerTriggered = event.clientX !== 0 || event.clientY !== 0;
    toggleMode({
      x: pointerTriggered ? event.clientX : rect.left + rect.width / 2,
      y: pointerTriggered ? event.clientY : rect.top + rect.height / 2,
    });
  };

  return (
    <div
      className="campaign-world"
      style={{ '--campaign-paper': `url(${projectPaper})` }}
    >
      <PixelTargetCursor disabled={calm} />
      <PersistentHud
        visible={hudVisible}
        soundOn={soundOn}
        onSound={toggleSound}
        onExit={handleExit}
      />
      {bursts.map((burst) => (
        <i key={burst.id} className="campaign-burst" style={{ left: burst.x, top: burst.y }} aria-hidden="true" />
      ))}

      <section className="campaign-section campaign-crm" aria-labelledby="crm-mission-title">
        <Motion.div variants={reveal} initial={calm ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          <MissionHeading marker="Mission 02 / Projects" description="Production feature work inside a living system.">
            DataBasy CRM
          </MissionHeading>

          <div className="campaign-crm__layout">
            <figure className="campaign-crm__screen">
              <span>Production system / illustrative interface</span>
              <img src={crmInterface} alt="Illustrative DataBasy CRM workspace" loading="lazy" />
            </figure>
            <div className="campaign-crm__brief">
              <h3 id="crm-mission-title">Extend the system without breaking the world already running.</h3>
              <p>Delivered production features and modules across Laravel, Blade, jQuery, PHP, and MySQL while preserving the behaviour of an established client-management application.</p>
              <dl>
                <div><dt>Role</dt><dd>Full-stack feature delivery</dd></div>
                <div><dt>Terrain</dt><dd>Mature authenticated codebase</dd></div>
                <div><dt>Status</dt><dd><span className="campaign-status"><Check aria-hidden="true" /> Live system</span></dd></div>
              </dl>
              <a href="https://crm.databasy.io/login" target="_blank" rel="noopener noreferrer" data-arcade-tone="collect">
                Open live login <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </Motion.div>
      </section>

      <section className="campaign-section campaign-quests" aria-labelledby="client-missions-title">
        <MissionHeading marker="Client missions" description="Named work across food, art, healthcare, and commerce.">
          Shipped across different worlds
        </MissionHeading>
        <h2 id="client-missions-title" className="sr-only">Client project missions</h2>
        <div className="campaign-route-list">
          {clientMissions.map((mission, index) => (
            <Motion.article
              key={mission.name}
              className="campaign-route-item"
              initial={calm ? false : { opacity: 0.01, x: index % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="campaign-route-item__node"><span>{mission.code}</span></span>
              <div className="campaign-route-item__identity">
                <span>{mission.type}</span>
                <h3>{mission.name}</h3>
              </div>
              <p>{mission.description}</p>
              <div className="campaign-route-item__meta">
                <span>{mission.tech}</span>
                {mission.link ? (
                  <a href={mission.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${mission.name}`}>
                    Visit <ExternalLink aria-hidden="true" />
                  </a>
                ) : <strong>{mission.status}</strong>}
              </div>
            </Motion.article>
          ))}
        </div>
      </section>

      <section id="about" className="campaign-section campaign-profile" aria-labelledby="player-profile-title">
        <MissionHeading marker="Player profile" description="The developer behind the campaign.">
          Full-stack ownership
        </MissionHeading>
        <div className="campaign-profile__layout">
          <div className="campaign-profile__avatar">
            <img src={engineerToken} alt="Pixel-art developer engineer character" loading="lazy" />
            <span>Player 01</span>
            <strong>Jerven Latayada</strong>
          </div>
          <div className="campaign-profile__copy">
            <h2 id="player-profile-title">I work across the whole system, from interface decisions to production infrastructure.</h2>
            <p>Front ends with Vue, Nuxt, and React. Back ends with Laravel, Django, and Python. Deployment and operations with Docker, NGINX, DigitalOcean, Cloudflare, DNS, and TLS.</p>
            <p>I use AI-assisted tools to move faster, while architecture, review, trade-offs, and the final judgement stay mine.</p>
            <dl>
              <div><dt>Location</dt><dd><MapPin aria-hidden="true" /> Davao City, PH</dd></div>
              <div><dt>Role</dt><dd>Full-Stack Developer</dd></div>
              <div><dt>Availability</dt><dd>Open to work</dd></div>
              <div><dt>Experience</dt><dd>3+ years</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="stack" className="campaign-section campaign-loadout" aria-labelledby="loadout-title">
        <MissionHeading marker="Loadout / Skills" description="Tools selected for the job, not collected for display.">
          Production loadout
        </MissionHeading>
        <h2 id="loadout-title" className="sr-only">Skills and technology loadout</h2>
        <div className="campaign-loadout__rack">
          {loadout.map(([category, tools], index) => (
            <div key={category} className="campaign-loadout__item">
              <span className="campaign-loadout__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{category}</h3>
              <p>{tools}</p>
              <span className="campaign-loadout__flames" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-development" className="campaign-section campaign-ai" aria-labelledby="ai-build-title">
        <div className="campaign-ai__signal"><Bot aria-hidden="true" /><span>AI-assisted build station</span></div>
        <div className="campaign-ai__intro">
          <h2 id="ai-build-title">Built with AI.<br />Directed by me.</h2>
          <p>AI helps accelerate implementation and review. Product decisions, architecture, verification, and responsibility remain human-owned.</p>
        </div>
        <div className="campaign-ai__logs">
          {buildLogs.map(([title, copy, tech]) => (
            <article key={title}>
              <span>Build log</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <strong>{tech}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="cv" className="campaign-section campaign-career" aria-labelledby="career-log-title">
        <MissionHeading marker="Campaign log / CV" description="Experience, education, and operational ownership.">
          Career history
        </MissionHeading>
        <h2 id="career-log-title" className="sr-only">Career history and curriculum vitae</h2>
        <div className="campaign-career__timeline">
          {career.map((entry) => (
            <article key={entry.title}>
              <time>{entry.period}</time>
              <div>
                <h3>{entry.title}</h3>
                <strong>{entry.place}</strong>
                <p>{entry.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="campaign-career__download" href="/cv.pdf" download="Jerven_Latayada_CV.pdf" data-arcade-tone="collect">
          <Download aria-hidden="true" /> Download CV (PDF)
        </a>
      </section>

      <footer id="contact" className="campaign-end">
        <span className="campaign-end__status"><ShieldCheck aria-hidden="true" /> Campaign data complete</span>
        <h2>Ready to start<br />the next mission?</h2>
        <p>For full-stack product work, production support, or a project conversation:</p>
        <a className="campaign-end__email" href="mailto:latayada1233@gmail.com" data-arcade-tone="collect">
          <Mail aria-hidden="true" /> Email Jerven
        </a>
        <div className="campaign-end__links">
          <a href="https://github.com/Jerven-git" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /> GitHub</a>
          <a href="https://www.linkedin.com/in/jerven-latayada-280903230/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
          <a href="#hero"><Flag aria-hidden="true" /> Replay from map</a>
        </div>
        <small>© {new Date().getFullYear()} Jerven Latayada · Designed and built by hand. AI helped.</small>
      </footer>
    </div>
  );
}
