import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function SummarySlide({ title, items, closingStatement }) {
  return (
    <div className="slide summary-slide">
      <motion.h2 {...fadeUp(0.3)}>
        {title}
      </motion.h2>
      {items.map((item, i) => (
        <motion.div key={item.label} className="summary-item" {...fadeUp(0.5 + i * 0.15)}>
          <strong>{item.label}</strong>
          <p>{item.description}</p>
        </motion.div>
      ))}
      <motion.p className="closing-statement" {...fadeUp(0.5 + items.length * 0.15)}>
        {closingStatement}
      </motion.p>
    </div>
  );
}
