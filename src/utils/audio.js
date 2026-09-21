// Romantic Audio System
// Supports both ambient romantic audio streams and an offline Web Audio API romantic chime/piano generator

class RomanticAudioManager {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.intervalId = null;
    this.externalAudio = null;
    this.listeners = new Set();
    
    // Romantic relaxing guitar/piano royalty-free soundtrack
    // (Free public domain ambient acoustic romance from Wikimedia Commons / archive)
    this.audioUrl = "https://actions.google.com/sounds/v1/water/rain_heavy.ogg"; // Fallback or sound
    this.soundtrackUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3";
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted
    }));
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play romantic chime note using Web Audio API synthesis
  playProceduralNote(freq, time, duration = 2.4, gainLevel = 0.08) {
    if (!this.audioCtx || this.isMuted) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Warm mellow acoustic piano-like sine with subtle triangle overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);

      // Envelope: soft attack, gentle decay, long warm release
      gainNode.gain.setValueAtTime(0.0001, time);
      gainNode.gain.exponentialRampToValueAtTime(gainLevel, time + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(gainLevel * 0.5, time + 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, time + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  startProceduralHarmony() {
    if (this.intervalId) return;

    // Romantic chord progression in E-flat / C: gentle notes (Hz)
    // C4, E4, G4, B4, C5, D5, E5, G5, A4
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    let chordIdx = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || this.isMuted) return;
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[step % currentChord.length];

      // Play note
      this.playProceduralNote(noteFreq, now, 2.5, 0.07);

      // Add a sparkling harmonic octave on certain beats
      if (step === 0 || step === 3) {
        this.playProceduralNote(noteFreq * 2, now + 0.1, 1.8, 0.03);
      }

      step = (step + 1) % 4;
      if (step === 0) {
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    // Play every 750ms for a peaceful romantic tempo (80 BPM)
    playStep();
    this.intervalId = setInterval(playStep, 750);
  }

  stopProceduralHarmony() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startMusic() {
    this.isPlaying = true;
    this.initAudioContext();

    // Start external audio if accessible
    if (!this.externalAudio) {
      try {
        this.externalAudio = new Audio(this.soundtrackUrl);
        this.externalAudio.loop = true;
        this.externalAudio.volume = 0.45;
        const playPromise = this.externalAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("External audio policy or network issue, using procedural synth:", err);
            this.startProceduralHarmony();
          });
        }
      } catch (err) {
        this.startProceduralHarmony();
      }
    } else {
      this.externalAudio.play().catch(() => this.startProceduralHarmony());
    }

    // Also run procedural harmony softly for rich romantic ambience
    this.startProceduralHarmony();
    this.notify();
  }

  pauseMusic() {
    this.isPlaying = false;
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
    this.stopProceduralHarmony();
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.startMusic();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.externalAudio) {
      this.externalAudio.muted = this.isMuted;
    }
    this.notify();
  }
}

export const romanticAudio = new RomanticAudioManager();
