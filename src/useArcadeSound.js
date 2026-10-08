import { useCallback, useEffect, useRef, useState } from 'react';

const SOUND_EVENT = 'mission-grid-sound-change';
const VOLUME_STORAGE_KEY = 'mission-grid-volume';
const BASE_GAIN = 0.042;
export const ARCADE_VOLUME_MIN = 0.5;
export const ARCADE_VOLUME_MAX = 3;
export const ARCADE_VOLUME_DEFAULT = 2.5;

function readSoundPreference() {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem('mission-grid-muted') !== 'true';
}

function readVolumePreference() {
  if (typeof window === 'undefined') return ARCADE_VOLUME_DEFAULT;
  const stored = Number.parseFloat(window.localStorage.getItem(VOLUME_STORAGE_KEY));
  if (!Number.isFinite(stored)) return ARCADE_VOLUME_DEFAULT;
  return Math.min(ARCADE_VOLUME_MAX, Math.max(ARCADE_VOLUME_MIN, stored));
}

export function useArcadeSound() {
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(readSoundPreference);
  const [volume, setVolumeState] = useState(readVolumePreference);

  useEffect(() => {
    const sync = () => {
      setSoundOn(readSoundPreference());
      setVolumeState(readVolumePreference());
    };
    window.addEventListener(SOUND_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SOUND_EVENT, sync);
      window.removeEventListener('storage', sync);
      audioRef.current?.close?.();
    };
  }, []);

  const playTone = useCallback((kind = 'select', force = false) => {
    if (!force && !readSoundPreference()) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = audioRef.current || new AudioContext();
    audioRef.current = context;
    if (context.state === 'suspended') context.resume?.();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    const notes = {
      launch: [196, 660, 0.15],
      collect: [520, 880, 0.1],
      select: [440, 560, 0.12],
    };
    const [start, end, duration] = notes[kind] || notes.select;

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(start, now);
    oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(BASE_GAIN * readVolumePreference(), now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.03);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.04);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !readSoundPreference();
    window.localStorage.setItem('mission-grid-muted', next ? 'false' : 'true');
    window.dispatchEvent(new Event(SOUND_EVENT));
    if (next) playTone('select', true);
  }, [playTone]);

  const setVolume = useCallback((nextVolume) => {
    const parsedVolume = Number(nextVolume);
    if (!Number.isFinite(parsedVolume)) return;

    const next = Math.min(ARCADE_VOLUME_MAX, Math.max(ARCADE_VOLUME_MIN, parsedVolume));
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(next));
    window.dispatchEvent(new Event(SOUND_EVENT));
  }, []);

  return {
    soundOn,
    toggleSound,
    blip: playTone,
    volume,
    volumePercent: Math.round(volume * 100),
    setVolume,
  };
}
