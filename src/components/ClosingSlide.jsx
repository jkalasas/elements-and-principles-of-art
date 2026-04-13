import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function ClosingSlide({ sectionLabel, icon, title }) {
  return (
    <div className="slide closing-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.div className="closing-icon" {...fadeUp(0.5)}>
        {icon}
      </motion.div>
      <motion.h2 {...fadeUp(0.7)}>
        {title}
      </motion.h2>
    </div>
  );
}
