import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check global audio or create element reference
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.volume = 0.6;
    }
  }, []);

  const togglePlay = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      audioEl.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio playback blocked or failed:", e);
      });
    }
  };

  const toggleMute = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    audioEl.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #E8D9C5',
        borderRadius: 30,
        padding: '6px 14px',
        boxShadow: '0 8px 24px rgba(60, 35, 15, 0.1)',
      }}
    >
      {/* Hidden or Functional Audio Element */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Rotating Vinyl Disc Icon */}
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { repeat: Infinity, duration: 3, ease: 'linear' } : {}}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={togglePlay}
      >
        <Disc size={20} color="#8A1521" />
      </motion.div>

      {/* Play / Pause Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Pause size={14} color="#8A1521" fill="#8A1521" />
        ) : (
          <Play size={14} color="#8A1521" fill="#8A1521" />
        )}
      </motion.button>

      {/* Mute / Unmute Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX size={14} color="#8A1521" />
        ) : (
          <Volume2 size={14} color="#8A1521" />
        )}
      </motion.button>
    </div>
  );
}