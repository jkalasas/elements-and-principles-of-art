import { useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownText from './MarkdownText';

export default function ArtworkBlock({ imageSrc, imageAlt, attribution, title, children, meaning }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="artwork-block">
      <div className="artwork-image">
        {imageError ? (
          <div className="image-placeholder">{imageAlt}</div>
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <div className="attribution">{attribution}</div>
      </div>
      <div className="artwork-content">
        <h3>{title}</h3>
        {children}
        {meaning && (
          <motion.div
            className="meaning-callout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4, ease: 'easeInOut' }}
          >
            <span className="meaning-label">{meaning.label}</span>
            <MarkdownText text={meaning.text} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
