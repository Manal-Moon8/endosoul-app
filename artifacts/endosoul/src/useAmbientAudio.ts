import { useState, useRef, useCallback } from 'react';

export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);

  const start = useCallback(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 3);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    const layers = [
      { freq: 108,  gain: 0.55, type: 'sine' as OscillatorType },
      { freq: 216,  gain: 0.28, type: 'sine' as OscillatorType },
      { freq: 288,  gain: 0.18, type: 'sine' as OscillatorType },
      { freq: 432,  gain: 0.12, type: 'sine' as OscillatorType },
      { freq: 540,  gain: 0.07, type: 'sine' as OscillatorType },
    ];

    const oscs: OscillatorNode[] = [];
    layers.forEach(({ freq, gain, type }, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(freq * 1.0015, ctx.currentTime + 8 + i * 2);
      osc.frequency.linearRampToValueAtTime(freq, ctx.currentTime + 16 + i * 2);
      oscGain.gain.setValueAtTime(gain, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    oscsRef.current = oscs;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const gain = gainRef.current;
    const ctx = audioCtxRef.current;
    if (!gain || !ctx) return;

    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);

    setTimeout(() => {
      oscsRef.current.forEach(osc => {
        try { osc.stop(); } catch { /* already stopped */ }
      });
      oscsRef.current = [];
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
      gainRef.current = null;
      setIsPlaying(false);
    }, 2600);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  return { isPlaying, toggle };
}
