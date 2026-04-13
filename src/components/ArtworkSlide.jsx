import { motion } from 'framer-motion';
import ArtworkBlock from './ArtworkBlock';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function ArtworkSlide({ sectionLabel, title, definition, artwork }) {
  return (
    <div className="slide artwork-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <motion.p className="definition" {...fadeUp(0.7)}>
        {definition}
      </motion.p>
      {artwork.map((art, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + index * 0.2, duration: 0.4, ease: 'easeInOut' }}
        >
          <ArtworkBlock
            imageSrc={art.imageSrc}
            imageAlt={art.imageAlt}
            attribution={art.attribution}
            title={art.contentTitle}
            meaning={art.meaning}
          >
            <p>{art.content}</p>
          </ArtworkBlock>
        </motion.div>
      ))}
    </div>
  );
}
