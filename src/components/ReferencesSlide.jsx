import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeInOut' } },
});

export default function ReferencesSlide({ title, sections }) {
  return (
    <div className="slide references-slide">
      <motion.h2 {...fadeUp(0.3)}>
        {title}
      </motion.h2>
      {sections.map((section, i) => (
        <motion.div key={section.sectionName} className="references-section" {...fadeUp(0.5 + i * 0.15)}>
          <h3>{section.sectionName}</h3>
          <ul>
            {section.attributions.map((attr, j) => (
              <li key={j}>{attr}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
