import { motion } from 'framer-motion';
import ArtworkBlock from './ArtworkBlock';
import MarkdownText from './MarkdownText';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function AnalysisSlide({ sectionLabel, title, artwork, elementsAtPlay, principlesAtPlay, meaning }) {
  return (
    <div className="slide analysis-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <div className="analysis-layout">
        <motion.div
          className="analysis-artwork"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <img src={artwork.imageSrc} alt={artwork.imageAlt} loading="lazy" />
          <div className="attribution">{artwork.attribution}</div>
        </motion.div>
        <div className="analysis-content">
          <h3>Elements at Play</h3>
          {elementsAtPlay.map((el, i) => (
            <motion.p key={el.label} {...fadeUp(0.8 + i * 0.1)}>
              <strong>{el.label}:</strong> {el.description}
            </motion.p>
          ))}
          <h3>Principles at Play</h3>
          {principlesAtPlay.map((pr, i) => (
            <motion.p key={pr.label} {...fadeUp(1.0 + i * 0.1)}>
              <strong>{pr.label}:</strong> {pr.description}
            </motion.p>
          ))}
        </div>
      </div>
      {meaning && (
        <motion.div className="meaning-callout" {...fadeUp(1.3)}>
          <span className="meaning-label">{meaning.label}</span>
          <MarkdownText text={meaning.text} />
        </motion.div>
      )}
    </div>
  );
}
