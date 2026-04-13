import { motion } from 'framer-motion';
import MarkdownText from './MarkdownText';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeInOut' } },
});

export default function RecapSlide({ sectionLabel, title, items, footerText }) {
  return (
    <div className="slide recap-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <ul className="recap-list">
        {items.map((item, i) => (
          <motion.li key={i} {...fadeUp(0.7 + i * 0.1)}>
            <MarkdownText text={item} as="span" />
          </motion.li>
        ))}
      </ul>
      {footerText && (
        <motion.div className="recap-footer" {...fadeUp(0.7 + items.length * 0.1)}>
          <MarkdownText text={footerText} />
        </motion.div>
      )}
    </div>
  );
}
