import { useCallback, useEffect, useRef, useState } from 'react';

const SOUND_EVENT = 'mission-grid-sound-change';

function readSoundPreference() {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem('mission-grid-muted') !== 'true';
}

export function useArcadeSound() {
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(readSoundPreference);

  useEffect(() => {
    const sync = () => setSoundOn(readSoundPreference());
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
    gain.gain.exponentialRampToValueAtTime(0.042, now + 0.012);
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

  return { soundOn, toggleSound, blip: playTone };
}
