import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function SectionIntroSlide({ sectionLabel, sectionNumber, title, description }) {
  return (
    <div className="slide section-intro-slide">
      <motion.div className="section-number" {...fadeUp(0.2)}>
        {sectionNumber}
      </motion.div>
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className="section-description" {...fadeUp(0.7)}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
