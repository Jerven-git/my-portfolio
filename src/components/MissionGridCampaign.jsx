import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  DoorOpen,
  ExternalLink,
  Flag,
  MapPin,
  Radio,
  Volume2,
  VolumeX,
} from 'lucide-react';
import crmInterface from '../../assets/plates/crm-interface.png';
import engineerToken from '../../assets/plates/engineer-token.png';
import projectPaper from '../../assets/plates/project-paper.png';
import PixelTargetCursor from './PixelTargetCursor';
import { useArcadeSound } from '../useArcadeSound';
import { usePlayfulMode } from '../usePlayfulMode';
import { featuredProjects, supportingProjects } from '../content/projects';
import MissionGridProject from './MissionGridProject';

const clientMissions = supportingProjects.map((project, index) => ({ ...project, code: String.fromCharCode(65 + index) }));
const crm = featuredProjects.find((project) => project.id === 'databasy-crm');

const loadout = [
  ['Front-end', 'Vue · Nuxt · React · JavaScript'],
  ['Back-end', 'Laravel · PHP · Django · Python'],
  ['Commerce', 'Shopify · Liquid · Stripe · Square'],
  ['Infrastructure', 'Docker · NGINX · DigitalOcean · Cloudflare'],
  ['Realtime + motion', 'Reverb · Three.js · WebGL · Framer Motion'],
  ['AI + automation', 'Claude · Cursor · Codex · Gemini · n8n'],
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

      <MissionGridProject />

      <section className="campaign-section campaign-crm" aria-labelledby="crm-mission-title">
        <Motion.div variants={reveal} initial={calm ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          <MissionHeading marker="Mission 02 / Projects" description={crm.problem}>
            DataBasy CRM
          </MissionHeading>

          <div className="campaign-crm__layout">
            <figure className="campaign-crm__screen">
              <span>Production system / illustrative interface</span>
              <img src={crmInterface} alt="Illustrative DataBasy CRM workspace" loading="lazy" />
            </figure>
            <div className="campaign-crm__brief">
              <h3 id="crm-mission-title">New capabilities for an existing customer-management system.</h3>
              <p>{crm.description}</p>
              <dl>
                <div><dt>Business use</dt><dd>{crm.application}</dd></div>
                <div><dt>Role</dt><dd>{crm.role}</dd></div>
                <div><dt>Features</dt><dd>{crm.proof.join(' · ')}</dd></div>
                <div><dt>Technology</dt><dd>{crm.system}</dd></div>
                <div><dt>Terrain</dt><dd>Mature authenticated codebase</dd></div>
                <div><dt>Status</dt><dd><span className="campaign-status"><Check aria-hidden="true" /> Live system</span></dd></div>
              </dl>
              <a href={crm.link} target="_blank" rel="noopener noreferrer" data-arcade-tone="collect">
                Open live login <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </Motion.div>
      </section>

      <section className="campaign-section campaign-quests" aria-labelledby="client-missions-title">
        <MissionHeading marker="Client missions" description="Named work across food, art, healthcare, commerce, and services.">
          Projects across different businesses
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
              <div className="campaign-route-item__description">
                <p className="font-semibold">{mission.problem}</p>
                <p>{mission.description}</p>
                <p><strong>Business use:</strong> {mission.application}</p>
              </div>
              <div className="campaign-route-item__meta">
                <span>{mission.tech}</span>
                {mission.link ? (
                  <a href={mission.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${mission.name}`}>
                    Visit <ExternalLink aria-hidden="true" />
                  </a>
                ) : <strong>{mission.status || 'No public link listed'}</strong>}
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
            <h2 id="player-profile-title">Useful software starts with understanding the business behind it.</h2>
            <p>I’m Jerven Latayada, a full-stack developer. My work spans business websites, commerce platforms, CRM features, content management, and staff systems. I connect the customer experience with the tools a business needs behind the scenes.</p>
            <p>I work across interfaces, backend APIs, and deployment, considering how each part supports daily operations. Whether starting from an idea or extending an established system, I focus on requirements, practical workflows, and careful review. AI-assisted tools support implementation; architecture, verification, and responsibility stay mine.</p>
            <dl>
              <div><dt>Location</dt><dd><MapPin aria-hidden="true" /> Davao City, PH</dd></div>
              <div><dt>Role</dt><dd>Full-Stack Developer</dd></div>
              <div><dt>Collaboration</dt><dd>Project inquiries</dd></div>
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


    </div>
  );
}
