import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ currentIndex, totalSlides, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigate('next');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigate('prev');
    }
  }, [onNavigate]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      onNavigate(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const progress = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <>
      <motion.div
        className="progress-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
      <div
        className="touch-area"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentIndex > 0 && (
          <button className="nav-button prev" onClick={() => onNavigate('prev')}>
            ←
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button className="nav-button next" onClick={() => onNavigate('next')}>
            →
          </button>
        )}
      </div>
    </>
  );
}
