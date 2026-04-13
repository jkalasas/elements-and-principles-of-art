import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } }),
};

export default function TitleSlide({ title, subtitle }) {
  return (
    <div className="slide title-slide">
      <motion.h1 custom={0.3} initial="hidden" animate="visible" variants={variants}>
        {title}
      </motion.h1>
      <motion.div className="accent-line" custom={0.5} initial="hidden" animate="visible" variants={{
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { delay: 0.5, duration: 0.6, ease: 'easeInOut' } },
      }} />
      <motion.p className="subtitle" custom={0.7} initial="hidden" animate="visible" variants={variants}>
        {subtitle}
      </motion.p>
    </div>
  );
}
