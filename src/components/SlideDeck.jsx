import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import slidesData from '../data/slidesData';
import Navigation from './Navigation';

// Stub component for slide types not yet registered
const StubSlide = ({ type, title }) => (
  <div>
    <span className="section-label">Coming Soon</span>
    <h2>{title}</h2>
    <p>Slide type "{type}" not yet implemented.</p>
  </div>
);

// Progressive registration — populated in Tasks 8-11
const slideComponents = {};

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function SlideDeck() {
  const { index } = useParams();
  const navigate = useNavigate();
  const currentIndex = Math.max(0, Math.min(parseInt(index) || 0, slidesData.length - 1));
  const slide = slidesData[currentIndex];

  const handleNavigate = useCallback((direction) => {
    const next = direction === 'next'
      ? Math.min(currentIndex + 1, slidesData.length - 1)
      : Math.max(currentIndex - 1, 0);
    navigate(`/slide/${next}`, { replace: true });
  }, [currentIndex, navigate]);

  const Component = slideComponents[slide.type];

  return (
    <>
      <Navigation currentIndex={currentIndex} totalSlides={slidesData.length} onNavigate={handleNavigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="slide-container"
          {...pageTransition}
        >
          <div className="slide">
            {Component ? <Component {...slide} /> : <StubSlide type={slide.type} title={slide.title} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
