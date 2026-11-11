import { useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, DoorOpen, Mail, Play, Volume2, VolumeX } from 'lucide-react';
import campaignMap from '../../assets/plates/campaign-map.png';
import engineerToken from '../../assets/plates/engineer-token.png';
import { ARCADE_VOLUME_MAX, ARCADE_VOLUME_MIN, useArcadeSound } from '../useArcadeSound';
import { navigationLinks as NAV_ITEMS, positioning } from '../content/business';

function CommandRail({ onExit, soundOn, onSoundToggle, volumePercent, onVolumeChange }) {
  const volumeLevel = ((volumePercent / 100 - ARCADE_VOLUME_MIN) / (ARCADE_VOLUME_MAX - ARCADE_VOLUME_MIN)) * 100;

  return (
    <header className="mission-rail">
      <button className="mission-brand" type="button" onClick={onExit} aria-label="Return to the crafted portfolio">
        JERVEN LATAYADA
      </button>
      <span className="mission-role">Full-stack developer</span>
      <nav className="mission-nav" aria-label="Portfolio sections">
        {NAV_ITEMS.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="mission-nav__inquiry" href="#contact">Start a Project</a>
      </nav>
      <div className="mission-sound">
        <button
          className="mission-sound__toggle"
          type="button"
          onClick={onSoundToggle}
          aria-label={soundOn ? 'Mute arcade sound' : 'Enable arcade sound'}
          aria-pressed={soundOn}
        >
          {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          <span>{soundOn ? `${volumePercent}%` : 'Off'}</span>
        </button>
        <input
          className="mission-volume"
          type="range"
          min={ARCADE_VOLUME_MIN * 100}
          max={ARCADE_VOLUME_MAX * 100}
          step="10"
          value={volumePercent}
          onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
          aria-label="Arcade sound volume"
          aria-valuetext={`${volumePercent}%`}
          disabled={!soundOn}
          style={{ '--volume-level': `${volumeLevel}%` }}
        />
      </div>
      <button
        className="mission-exit-door"
        type="button"
        onClick={onExit}
        aria-label="Return to the Crafted portfolio"
        title="Return to Crafted"
      >
        <DoorOpen aria-hidden="true" />
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
  const { soundOn, toggleSound, blip, volumePercent, setVolume } = useArcadeSound();
  const mapRef = useRef(null);
  const engineerRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [missionPhase, setMissionPhase] = useState('idle');
  const [routePath, setRoutePath] = useState({ x: [0], y: [0] });

  const handleExit = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerTriggered = event.clientX !== 0 || event.clientY !== 0;
    onExit({
      x: pointerTriggered ? event.clientX : rect.left + rect.width / 2,
      y: pointerTriggered ? event.clientY : rect.top + rect.height / 2,
    });
  }, [onExit]);

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

  const completeMission = useCallback((withSound = true) => {
    setMissionPhase('complete');
    if (withSound) blip('collect');
    window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(scrollToBrief, reduced ? 0 : 480);
  }, [blip, reduced, scrollToBrief]);

  const startMission = useCallback(() => {
    if (missionPhase === 'running') return;
    if (missionPhase === 'complete') {
      scrollToBrief();
      return;
    }

    if (calm || !mapRef.current || !engineerRef.current) {
      completeMission(false);
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
  }, [calm, completeMission, missionPhase, scrollToBrief]);

  return (
    <div className={`mission-grid mission-grid--${missionPhase}`}>
      <CommandRail
        onExit={handleExit}
        soundOn={soundOn}
        onSoundToggle={toggleSound}
        volumePercent={volumePercent}
        onVolumeChange={setVolume}
      />

      <div ref={mapRef} className="mission-map" aria-label="Campaign map showing Jerven's portfolio missions">
        <img className="mission-map__terrain" src={campaignMap} alt="Pixel-art island campaign map with routes between project objectives" />
        <div className="mission-map__grid" aria-hidden="true" />
        <MapCompass />

        <div className="mission-intro">
          <Motion.h1
            className="mission-headline"
            initial={calm ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {positioning.headline}
          </Motion.h1>
          <p>{positioning.description}</p>
        </div>

        <span className="mission-label mission-label--contact"><span>Contact</span></span>
        <span className="mission-label mission-label--databasy"><span>DATABASY / SSU</span></span>
        <span className="mission-label mission-label--crm"><span>DataBasy CRM</span></span>

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
          onAnimationComplete={missionPhase === 'running' ? () => completeMission(true) : undefined}
        />

        <div className="mission-commands" aria-label="Primary project actions">
          <a className="mission-command mission-command--primary" href="#contact"><Mail aria-hidden="true" /><span>Start a Project</span></a>
          <a className="mission-command" href="#solutions"><ArrowRight aria-hidden="true" /><span>Explore Solutions</span></a>
          <button
            className="mission-command"
            type="button"
            onClick={startMission}
            data-arcade-tone={missionPhase === 'idle' ? 'launch' : 'select'}
            disabled={missionPhase === 'running'}
            aria-describedby="mission-route-status"
          >
            <Play aria-hidden="true" />
            <span>{missionPhase === 'running' ? 'Following route…' : 'Follow project route'}</span>
          </button>
        </div>
        <span id="mission-route-status" className="sr-only" role="status" aria-live="polite">
          {missionPhase === 'running'
            ? 'Engineer is following the route to DATABASY.'
            : missionPhase === 'complete'
              ? 'DATABASY mission unlocked. Opening the project briefing.'
              : 'Ready to start the DATABASY mission.'}
        </span>
      </div>
    </div>
  );
}
