/**
 * Audio Engine for FALLEN 75 FRANCE
 * Supports playing actual audio URLs (MP3/WAV) or generating rich procedural musical previews
 * using Web Audio API (808s, hats, kicks, moody pads) if no audio file is provided.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isSynthesizing = false;
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private currentBpm = 130;
  private currentPreset = 'drill_dark';
  private synthInterval: number | null = null;
  private synthStepTimer: number | null = null;
  private currentTime = 0;
  private duration = 30; // 30s preview
  private volume = 0.8;
  private gainNode: GainNode | null = null;
  private listeners: ((state: { isPlaying: boolean; currentTime: number; duration: number; trackId: string | null }) => void)[] = [];
  private audioElement: HTMLAudioElement | null = null;

  private async initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('AudioContext resume error:', e);
      }
    }
  }

  public subscribe(fn: (state: { isPlaying: boolean; currentTime: number; duration: number; trackId: string | null }) => void) {
    this.listeners.push(fn);
    fn(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      trackId: this.currentTrackId,
    };
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public async playTrack(track: {
    id: string;
    audioPreviewUrl?: string;
    downloadFileName?: string;
    bpm?: number;
    audioPreset?: string;
  }) {
    await this.initContext();

    if (this.currentTrackId === track.id && this.isPlaying) {
      this.pause();
      return;
    }

    this.stop();
    this.currentTrackId = track.id;
    this.currentBpm = track.bpm || 130;
    this.currentPreset = track.audioPreset || 'drill_dark';

    // Check if an audio preview URL exists or was uploaded
    const directUrl = track.audioPreviewUrl?.trim() || '';
    const hasValidAudioSource = Boolean(
      directUrl &&
        (directUrl.startsWith('http://') ||
          directUrl.startsWith('https://') ||
          directUrl.startsWith('/uploads/') ||
          directUrl.startsWith('blob:') ||
          directUrl.startsWith('data:'))
    );

    if (hasValidAudioSource) {
      let fallbackTriggered = false;
      const doFallback = () => {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        if (this.audioElement) {
          this.audioElement.pause();
          this.audioElement.removeAttribute('src');
          this.audioElement.load();
        }
        if (this.currentTrackId === track.id) {
          this.startSynthPreview(this.currentBpm, this.currentPreset);
        }
      };

      try {
        if (!this.audioElement) {
          this.audioElement = new Audio();
        }
        this.audioElement.src = directUrl;
        this.audioElement.volume = this.volume;

        this.audioElement.ontimeupdate = () => {
          if (this.audioElement && !this.isSynthesizing) {
            this.currentTime = this.audioElement.currentTime;
            this.duration = this.audioElement.duration || 30;
            this.notify();
          }
        };

        this.audioElement.onended = () => {
          this.isPlaying = false;
          this.currentTime = 0;
          this.notify();
        };

        this.audioElement.onerror = () => {
          doFallback();
        };

        await this.audioElement.play();
        this.isSynthesizing = false;
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        doFallback();
        return;
      }
    }

    // Direct instantaneous studio beat synth preview (0ms latency, always plays)
    this.startSynthPreview(this.currentBpm, this.currentPreset);
  }

  public pause() {
    if (this.audioElement && !this.isSynthesizing) {
      this.audioElement.pause();
    }
    if (this.synthStepTimer) {
      window.clearInterval(this.synthStepTimer);
      this.synthStepTimer = null;
    }
    if (this.synthInterval) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isPlaying = false;
    this.notify();
  }

  public async resume() {
    if (!this.currentTrackId) return;
    await this.initContext();
    if (this.audioElement && !this.isSynthesizing && this.audioElement.src) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch (err) {
        console.warn('Resume error:', err);
      }
    }
    // Procedural resume
    this.isPlaying = true;
    this.startSynthPreview(this.currentBpm, this.currentPreset, true);
    this.notify();
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement.src = '';
    }
    if (this.synthStepTimer) {
      window.clearInterval(this.synthStepTimer);
      this.synthStepTimer = null;
    }
    if (this.synthInterval) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isSynthesizing = false;
    this.isPlaying = false;
    this.currentTime = 0;
    this.notify();
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(this.duration, seconds));
    if (this.audioElement && !this.isSynthesizing) {
      this.audioElement.currentTime = this.currentTime;
    }
    this.notify();
  }

  // Realistic Procedural Beat Synthesis
  private startSynthPreview(bpm: number, preset: string, isResuming = false) {
    if (!this.ctx || !this.gainNode) return;
    this.isSynthesizing = true;
    this.isPlaying = true;
    this.duration = 30; // 30s preview snippet
    if (!isResuming) {
      this.currentTime = 0;
    }
    this.notify();

    if (this.synthStepTimer) {
      window.clearInterval(this.synthStepTimer);
      this.synthStepTimer = null;
    }

    const beatInterval = 60 / bpm;
    const sixteenth = beatInterval / 4;
    let step = 0;

    // Trigger rhythm elements
    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;
      const t = this.ctx.currentTime;

      // Kick drum (on beats 0, 4, 10 or drill pattern)
      if (preset === 'drill_dark') {
        if (step % 16 === 0 || step % 16 === 6 || step % 16 === 10) {
          this.triggerKick(t);
        }
        // Snare / Rimshot on 8
        if (step % 16 === 8) {
          this.triggerSnare(t);
        }
        // Sliding 808 Bass
        if (step % 16 === 0) {
          this.trigger808(t, 43.65, 0.4); // F1
        } else if (step % 16 === 10) {
          this.trigger808(t, 48.99, 0.35); // G1 glide
        }
      } else if (preset === 'cinematic_noir') {
        if (step % 16 === 0 || step % 16 === 8) {
          this.triggerKick(t);
        }
        if (step % 16 === 4 || step % 16 === 12) {
          this.triggerSnare(t);
        }
        if (step % 16 === 0) {
          this.triggerPad(t, [130.81, 155.56, 196.00], 1.2); // C Minor
        }
      } else {
        // Standard Trap / Boombap
        if (step % 16 === 0 || step % 16 === 7 || step % 16 === 12) {
          this.triggerKick(t);
        }
        if (step % 16 === 4 || step % 16 === 12) {
          this.triggerSnare(t);
        }
        if (step % 16 === 0) {
          this.trigger808(t, 36.71, 0.6); // D1
        }
      }

      // Hi-Hats (every sixteenth with occasional rolls)
      if (step % 2 === 0 || (step % 16 >= 12 && Math.random() > 0.3)) {
        this.triggerHiHat(t, step % 4 === 0 ? 0.08 : 0.04);
      }

      // Synth Chord Pad every 8 beats
      if (step % 32 === 0) {
        this.triggerPad(t, [146.83, 174.61, 220.00], 1.8); // D Minor chord
      }

      step = (step + 1) % 64;
    };

    // Play first beat immediately for instant sound feedback
    playStep();

    const intervalMs = sixteenth * 1000;
    this.synthStepTimer = window.setInterval(playStep, intervalMs);

    this.startSynthTimer();
  }

  private startSynthTimer() {
    if (this.synthInterval) window.clearInterval(this.synthInterval);
    this.synthInterval = window.setInterval(() => {
      this.currentTime += 0.2;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
      this.notify();
    }, 200);
  }

  // Sound generator nodes
  private triggerKick(t: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);

    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.gainNode);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  private trigger808(t: number, freq: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.5, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.05);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.linearRampToValueAtTime(0.5, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.gainNode);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  private triggerSnare(t: number) {
    if (!this.ctx || !this.gainNode) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);
    noise.start(t);
    noise.stop(t + 0.12);
  }

  private triggerHiHat(t: number, vol = 0.05) {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);
    noise.start(t);
    noise.stop(t + 0.04);
  }

  private triggerPad(t: number, freqs: number[], duration = 1.5) {
    if (!this.ctx || !this.gainNode) return;
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainNode!);
      osc.start(t);
      osc.stop(t + duration);
    });
  }
}

export const audioEngine = new AudioEngine();
