import { useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileDown, Flag, Mail, Play, Volume2, VolumeX } from 'lucide-react';
import campaignMap from '../../assets/plates/campaign-map.png';
import engineerToken from '../../assets/plates/engineer-token.png';
import projectPaper from '../../assets/plates/project-paper.png';
import databasyInterface from '../../assets/plates/databasy-interface.png';
import crmInterface from '../../assets/plates/crm-interface.png';
import { useArcadeSound } from '../useArcadeSound';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#stack' },
  { label: 'Contact', href: 'mailto:latayada1233@gmail.com' },
];

function CommandRail({ onExit, soundOn, onSoundToggle }) {
  return (
    <header className="mission-rail">
      <button className="mission-brand" type="button" onClick={onExit} aria-label="Return to the crafted portfolio">
        JERVEN LATAYADA
      </button>
      <span className="mission-role">Full-stack developer</span>
      <nav className="mission-nav" aria-label="Portfolio sections">
        {NAV_ITEMS.map((item, index) => (
          <a key={item.label} className={index === 0 ? 'is-active' : undefined} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button className="mission-sound" type="button" onClick={onSoundToggle} aria-pressed={soundOn}>
        {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        <span>Sound</span>
        <i className="mission-sound__meter" aria-hidden="true">
          <b /><b /><b /><b />
        </i>
      </button>
    </header>
  );
}

function MapCompass() {
  return (
    <div className="mission-compass" aria-hidden="true">
      <span className="mission-compass__north">N</span>
      <span className="mission-compass__east">E</span>
      <span className="mission-compass__south">S</span>
      <span className="mission-compass__west">W</span>
      <i /><b />
    </div>
  );
}

export default function MissionGridHero({ onExit }) {
  const reduced = useReducedMotion();
  const staticReview = typeof window !== 'undefined' && window.__MISSION_GRID_REVIEW__ === true;
  const calm = reduced || staticReview;
  const { soundOn, toggleSound, blip } = useArcadeSound();
  const mapRef = useRef(null);
  const engineerRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [missionPhase, setMissionPhase] = useState('idle');
  const [routePath, setRoutePath] = useState({ x: [0], y: [0] });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => window.clearTimeout(scrollTimerRef.current);
  }, []);

  const scrollToBrief = useCallback(() => {
    document.querySelector('#projects')?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [reduced]);

  const completeMission = useCallback(() => {
    setMissionPhase('complete');
    blip('collect');
    window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(scrollToBrief, reduced ? 0 : 480);
  }, [blip, reduced, scrollToBrief]);

  const startMission = useCallback(() => {
    if (missionPhase === 'running') return;
    if (missionPhase === 'complete') {
      scrollToBrief();
      return;
    }

    blip('launch');
    if (calm || !mapRef.current || !engineerRef.current) {
      completeMission();
      return;
    }

    const mapBox = mapRef.current.getBoundingClientRect();
    const engineerBox = engineerRef.current.getBoundingClientRect();
    const origin = {
      x: engineerBox.left + engineerBox.width / 2,
      y: engineerBox.top + engineerBox.height / 2,
    };
    const waypoints = [
      [0.24, 0.69],
      [0.36, 0.62],
      [0.48, 0.62],
      [0.58, 0.54],
      [0.67, 0.48],
      [0.75, 0.38],
      [0.855, 0.245],
    ];

    setRoutePath({
      x: [0, ...waypoints.map(([x]) => mapBox.left + mapBox.width * x - origin.x)],
      y: [0, ...waypoints.map(([, y]) => mapBox.top + mapBox.height * y - origin.y)],
    });
    setMissionPhase('running');
  }, [blip, calm, completeMission, missionPhase, scrollToBrief]);

  return (
    <div className={`mission-grid mission-grid--${missionPhase}`}>
      <CommandRail onExit={onExit} soundOn={soundOn} onSoundToggle={toggleSound} />

      <div ref={mapRef} className="mission-map" aria-label="Campaign map showing Jerven's portfolio missions">
        <img className="mission-map__terrain" src={campaignMap} alt="Pixel-art island campaign map with routes between project objectives" />
        <div className="mission-map__grid" aria-hidden="true" />
        <MapCompass />

        <Motion.h1
          className="mission-headline"
          initial={calm ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          I build entire<br />systems. Alone.
        </Motion.h1>

        <span className="mission-label mission-label--contact">Contact</span>
        <span className="mission-label mission-label--databasy">DATABASY / SSU</span>
        <span className="mission-label mission-label--crm">DataBasy CRM</span>

        <Motion.img
          ref={engineerRef}
          className="mission-engineer"
          src={engineerToken}
          alt="Original pixel-art developer engineer character"
          animate={calm
            ? undefined
            : missionPhase === 'running'
              ? routePath
              : missionPhase === 'complete'
                ? { x: routePath.x.at(-1) ?? 0, y: routePath.y.at(-1) ?? 0 }
                : { x: 0, y: [0, -4, 0] }}
          transition={!calm && missionPhase === 'running'
            ? { duration: 2.6, times: [0, 0.12, 0.28, 0.43, 0.58, 0.72, 0.86, 1], ease: [0.45, 0, 0.2, 1] }
            : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          onAnimationComplete={missionPhase === 'running' ? completeMission : undefined}
        />

        <div className="mission-commands" aria-label="Primary portfolio actions">
          <button
            className="mission-command mission-command--primary"
            type="button"
            onClick={startMission}
            disabled={missionPhase === 'running'}
            aria-describedby="mission-route-status"
          >
            <Play aria-hidden="true" />
            <span>
              {missionPhase === 'running'
                ? 'Following route…'
                : missionPhase === 'complete'
                  ? 'View mission brief'
                  : 'Start mission'}
            </span>
          </button>
          <a className="mission-command" href="mailto:latayada1233@gmail.com" onClick={() => blip()}>
            <Mail aria-hidden="true" />
            <span>Email me</span>
          </a>
          <a className="mission-command" href="/cv.pdf" download onClick={() => blip()}>
            <FileDown aria-hidden="true" />
            <span>Download CV</span>
          </a>
        </div>
        <span id="mission-route-status" className="sr-only" role="status" aria-live="polite">
          {missionPhase === 'running'
            ? 'Engineer is following the route to DATABASY.'
            : missionPhase === 'complete'
              ? 'DATABASY mission unlocked. Opening the project briefing.'
              : 'Ready to start the DATABASY mission.'}
        </span>
      </div>

      <section id="projects" className="mission-dossier" style={{ '--mission-paper-texture': `url(${projectPaper})` }}>
        <header className="mission-dossier__header">
          <Flag aria-hidden="true" />
          <h2>MISSION 01 / PROJECTS</h2>
          <span aria-hidden="true" />
        </header>

        <figure className="mission-dossier__primary-visual">
          <img src={databasyInterface} alt="Illustrative DATABASY storefront and operational workspace interface" />
          <figcaption>Illustrative interface</figcaption>
        </figure>

        <div className="mission-dossier__copy">
          <h3>DATABASY / SSU</h3>
          <p>Multi-tenant commerce platform</p>
          <p>Storefront + operational workspace</p>
          <span>Nuxt 4 + Laravel + MySQL + Reverb</span>
        </div>

        <ArrowRight className="mission-dossier__arrow" aria-hidden="true" />
        <figure className="mission-dossier__next">
          <figcaption>Next objective</figcaption>
          <img src={crmInterface} alt="Illustrative DataBasy CRM interface" />
          <strong>DataBasy CRM</strong>
        </figure>
      </section>
    </div>
  );
}
