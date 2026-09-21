import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(romanticAudio.isPlaying);
      setIsMuted(romanticAudio.isMuted);
    };

    const interval = setInterval(checkState, 300);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      romanticAudio.pauseMusic();
      setIsPlaying(false);
    } else {
      romanticAudio.startMusic();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    romanticAudio.toggleMute();
    setIsMuted(romanticAudio.isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 50,
      }}
    >
      <div className="audio-player-pill" onClick={handleTogglePlay} title={isPlaying ? 'Pause Melody' : 'Play Romantic Melody'}>
        {/* Spinning Vinyl Record */}
        <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
          <div className="vinyl-center-dot" />
        </div>

        {/* Animated Equalizer Wave Bars */}
        {isPlaying ? (
          <div className="eq-bars">
            <span className="eq-bar eq-bar-1" />
            <span className="eq-bar eq-bar-2" />
            <span className="eq-bar eq-bar-3" />
            <span className="eq-bar eq-bar-4" />
          </div>
        ) : (
          <div className="eq-bars" style={{ opacity: 0.4 }}>
            <span className="eq-bar" style={{ height: 4 }} />
            <span className="eq-bar" style={{ height: 4 }} />
            <span className="eq-bar" style={{ height: 4 }} />
            <span className="eq-bar" style={{ height: 4 }} />
          </div>
        )}

        {/* Play/Pause Button */}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#8A1521',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={13} fill="#8A1521" /> : <Play size={13} fill="#8A1521" />}
        </button>

        {/* Volume Toggle */}
        <button
          onClick={handleToggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: '#6A4F42',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            marginLeft: -2,
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={13} color="#999" /> : <Volume2 size={13} color="#6A4F42" />}
        </button>
      </div>
    </motion.div>
  );
}
