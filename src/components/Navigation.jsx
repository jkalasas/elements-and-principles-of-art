import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ currentIndex, totalSlides, onNavigate, onGoToSlide }) {
  const [touchStart, setTouchStart] = useState(null);
  const [showArrows, setShowArrows] = useState(false);
  const hideTimerRef = useRef(null);

  const startHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setShowArrows(true);
    hideTimerRef.current = setTimeout(() => {
      setShowArrows(false);
    }, 3000);
  }, []);

  const handleTap = useCallback(() => {
    startHideTimer();
  }, [startHideTimer]);

  const handleNavigate = useCallback((direction) => {
    startHideTimer();
    onNavigate(direction);
  }, [onNavigate, startHideTimer]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNavigate('next');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleNavigate('prev');
    }
  }, [handleNavigate]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      handleNavigate(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
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
        className={`touch-area ${showArrows ? 'show-arrows' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        {currentIndex > 0 && (
          <button className="nav-button prev" onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }}>
            ←
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button className="nav-button next" onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }}>
            →
          </button>
        )}
      </div>
      <div className="nav-dots">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onGoToSlide(index); }}
          />
        ))}
      </div>
    </>
  );
}
