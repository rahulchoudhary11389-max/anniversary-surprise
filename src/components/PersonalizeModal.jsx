import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, RotateCcw, Sparkles } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

export default function PersonalizeModal({ config, onSaveConfig, onResetDefaults }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(config);

  const handleOpen = () => {
    setFormData(config);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig(formData);
    triggerHeartConfetti();
    setIsOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values back to original defaults?')) {
      onResetDefaults();
      setFormData(config);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Bottom Left Personalize Pill matching reference design */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 40,
        }}
      >
        <button onClick={handleOpen} className="dark-glass-pill-btn" aria-label="Personalize Surprise">
          <Settings size={14} color="#E7C980" />
          <span>Personalize</span>
          <span style={{ fontSize: 10, color: '#C59B3F' }}>&gt;</span>
        </button>
      </motion.div>

      {/* Personalize Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(20, 12, 10, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FAF7F2',
                borderRadius: 20,
                border: '1px solid #E5D5BF',
                boxShadow: '0 25px 50px -12px rgba(40, 20, 10, 0.4)',
                width: '100%',
                maxWidth: 480,
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '24px 22px',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} color="#3D2A22" />
              </button>

              {/* Title */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span className="luxury-pill-badge" style={{ marginBottom: 6 }}>
                  <Sparkles size={11} color="#C59B3F" />
                  <span>CUSTOMIZE SURPRISE</span>
                </span>
                <h3 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: '#1C120E' }}>
                  Personalize Your Anniversary
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                      Husband's Name
                    </label>
                    <input
                      type="text"
                      name="husbandName"
                      value={formData.husbandName}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid #DFCEBB',
                        background: '#FFFFFF',
                        fontSize: 14,
                        color: '#1C120E',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                      Wife's Name
                    </label>
                    <input
                      type="text"
                      name="wifeName"
                      value={formData.wifeName}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid #DFCEBB',
                        background: '#FFFFFF',
                        fontSize: 14,
                        color: '#1C120E',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                      Milestone Title
                    </label>
                    <input
                      type="text"
                      name="milestoneTitle"
                      value={formData.milestoneTitle}
                      onChange={handleChange}
                      placeholder="e.g. 2nd Month"
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid #DFCEBB',
                        background: '#FFFFFF',
                        fontSize: 14,
                        color: '#1C120E',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="anniversaryDate"
                      value={formData.anniversaryDate}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid #DFCEBB',
                        background: '#FFFFFF',
                        fontSize: 14,
                        color: '#1C120E',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                    Hero Quote
                  </label>
                  <input
                    type="text"
                    name="heroQuote"
                    value={formData.heroQuote}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 8,
                      border: '1px solid #DFCEBB',
                      background: '#FFFFFF',
                      fontSize: 14,
                      color: '#1C120E',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6E5145', marginBottom: 4, letterSpacing: '0.04em' }}>
                    Love Letter Message
                  </label>
                  <textarea
                    name="loveLetterText"
                    value={formData.loveLetterText}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #DFCEBB',
                      background: '#FFFFFF',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: '#1C120E',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '11px',
                      borderRadius: 10,
                      border: '1px solid #DFCEBB',
                      background: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#6E5145',
                      cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>

                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '11px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'linear-gradient(135deg, #8A1521 0%, #660E16 100%)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(138,21,33,0.3)',
                    }}
                  >
                    <Save size={14} />
                    <span>Save &amp; Celebrate</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
