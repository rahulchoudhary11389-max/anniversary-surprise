import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, X, Calendar, MapPin, ZoomIn } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { slideFromLeft, slideFromRight, fadeUp, staggerContainer, viewportOnce } from '../utils/animations';

const DEFAULT_MEMORIES = [
  {
    id: 1,
    title: 'Our Very First Date',
    date: 'Day 1 • The Beginning',
    location: 'Cafe Mocha by the Bay',
    caption: 'The way your eyes lit up when the coffee arrived. I knew right then, my heart was home.',
    image: '/pp1.jpg',
    rotation: -2.5,
  },
  {
    id: 2,
    title: 'Stargazing by the Lake',
    date: 'Week 3 • Quiet Magic',
    location: 'Emerald Lake Vista',
    caption: 'Under a billion stars, but the brightest constellation was right next to me holding my hand.',
    image: '/pp2.jpg',
    rotation: 2.2,
  },
  {
    id: 3,
    title: 'Laughing in the Rain',
    date: 'Month 1 • Unscripted Joy',
    location: 'Old Town Promenade',
    caption: 'We were completely soaked, our umbrella broke, and it was the happiest Tuesday of my entire life.',
    image: '/pp3.jpg',
    rotation: -1.8,
  },
  {
    id: 4,
    title: '60 Days of Forever',
    date: 'Today • 2nd Month Anniversary',
    location: 'Our Sacred Space',
    caption: 'Two whole months of choosing each other every single morning. Here is to our infinite tomorrow.',
    image: '/pp4.jpg',
    rotation: 2.8,
  },
];

export default function PolaroidGallery() {
  const [memories, setMemories] = useState(DEFAULT_MEMORIES);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const handleLike = (id, e) => {
    e.stopPropagation();
    const isNowLiked = !likedPhotos[id];
    setLikedPhotos((prev) => ({ ...prev, [id]: isNowLiked }));
    if (isNowLiked) {
      triggerHeartConfetti();
    }
  };

  return (
    <section style={{ marginBottom: 44, position: 'relative' }}>
      {/* Header Section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <motion.div variants={fadeUp} style={{ display: 'inline-flex', marginBottom: 8 }}>
          <span className="luxury-pill-badge">
            <Camera size={12} color="#C59B3F" style={{ strokeWidth: 2.2 }} />
            <span>CAPTURED MOMENTS</span>
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-serif"
          style={{
            fontSize: 'clamp(24px, 6vw, 32px)',
            fontWeight: 700,
            color: '#1C120E',
            letterSpacing: '-0.01em',
            marginBottom: 4,
          }}
        >
          Our Story in Frames
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-garamond"
          style={{
            fontStyle: 'italic',
            fontSize: 16,
            color: '#6E5145',
          }}
        >
          Tap any polaroid to zoom into our memories
        </motion.p>
      </motion.div>

      {/* Vertical Storybook Stagger Gallery */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '0 4px' }}>
        {memories.map((item, index) => {
          const isLiked = likedPhotos[item.id];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              variants={isEven ? slideFromLeft : slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              whileHover={{ scale: 1.02, rotate: 0 }}
              onClick={() => setSelectedPhoto(item)}
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '12px 12px 18px 12px',
                boxShadow: '0 14px 32px -6px rgba(50, 30, 15, 0.14), 0 2px 6px rgba(0,0,0,0.04)',
                border: '1px solid #EDE2D4',
                cursor: 'pointer',
                transform: `rotate(${item.rotation}deg)`,
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s',
                position: 'relative',
              }}
            >
              {/* Gold Photo Corner Pin decoration */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 38,
                  height: 12,
                  background: 'rgba(235, 215, 170, 0.65)',
                  border: '1px solid rgba(197, 155, 63, 0.4)',
                  borderRadius: 2,
                  backdropFilter: 'blur(2px)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              />

              {/* Photo Frame Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '82%',
                  backgroundColor: '#F7EFE4',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.12)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Like Button on Photo */}
                <motion.button
                  onClick={(e) => handleLike(item.id, e)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Like Memory"
                >
                  <Heart
                    size={16}
                    color={isLiked ? '#8A1521' : '#6A4F42'}
                    fill={isLiked ? '#8A1521' : 'none'}
                  />
                </motion.button>
              </div>

              {/* Polaroid Footer */}
              <div style={{ marginTop: 14, padding: '0 4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#1C120E',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, color: '#8A7065', fontSize: 11 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <Calendar size={11} color="#C59B3F" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={11} color="#8A1521" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <ZoomIn size={14} color="#C59B3F" style={{ opacity: 0.7 }} />
                </div>

                <p
                  className="font-script"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.3,
                    color: '#5C443B',
                    marginTop: 8,
                    letterSpacing: '0.01em',
                  }}
                >
                  &ldquo;{item.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(28, 18, 14, 0.88)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '16px 16px 24px 16px',
                maxWidth: 460,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.06)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <X size={16} color="#1C120E" />
              </button>

              <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', backgroundColor: '#FAF6EE' }}>
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: '#1C120E' }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ fontSize: 12, color: '#8A7065', marginTop: 2 }}>
                  {selectedPhoto.date} — {selectedPhoto.location}
                </p>
                <p
                  className="font-script"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.35,
                    color: '#6A4F42',
                    marginTop: 10,
                  }}
                >
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}