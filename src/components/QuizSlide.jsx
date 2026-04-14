import { motion } from 'framer-motion';
import MarkdownText from './MarkdownText';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeInOut' } },
});

function MultipleChoiceQuestion({ question, options, number, index }) {
  const num = number ?? (index + 1);
  return (
    <motion.div className="quiz-question" {...fadeUp(0.3)}>
      <p className="quiz-question-text">
        <strong>{num}.</strong> {question}
      </p>
      <ul className="quiz-options">
        {options.map((option, i) => (
          <li key={i}>
            <span className="option-letter">{String.fromCharCode(97 + i)})</span> {option}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TrueFalseQuestion({ question, index }) {
  return (
    <motion.div className="quiz-question" {...fadeUp(0.3 + index * 0.15)}>
      <p className="quiz-question-text">
        <strong>{index + 1}.</strong> {question}
      </p>
    </motion.div>
  );
}

function MatchingTable({ items }) {
  const shuffledDefinitions = [...items].sort(() => Math.random() - 0.5);
  return (
    <motion.div className="quiz-matching" {...fadeUp(0.3)}>
      <table className="matching-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td><strong>{i + 1}.</strong> {item.term}</td>
              <td>{String.fromCharCode(97 + i)}) {shuffledDefinitions[i].definition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function ShortAnswerQuestion({ question, index, total }) {
  return (
    <motion.div className="quiz-question" {...fadeUp(0.3 + index * 0.15)}>
      <p className="quiz-question-text">
        {total > 1 && <strong>{index + 1}.</strong>} <MarkdownText text={question} as="span" />
      </p>
      <div className="quiz-short-answer-space" />
    </motion.div>
  );
}

export default function QuizSlide({ sectionLabel, title, questions, question, matchItems }) {
  const isMatching = !!matchItems;
  const isSingleQuestion = !!question;

  return (
    <div className="slide quiz-slide">
      <motion.span className="section-label" {...fadeUp(0)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.2)}>
        {title}
      </motion.h2>

      {isMatching && <MatchingTable items={matchItems} />}

      {isSingleQuestion && (
        <MultipleChoiceQuestion question={question.question} options={question.options} number={question.number} />
      )}

      {!isMatching && !isSingleQuestion && questions?.map((q, i) => {
        if (q.type === 'truefalse') {
          return <TrueFalseQuestion key={i} question={q.question} index={i} />;
        }
        if (q.type === 'shortanswer') {
          return <ShortAnswerQuestion key={i} question={q.question} index={i} total={questions.length} />;
        }
        return <MultipleChoiceQuestion key={i} question={q.question} options={q.options} index={i} />;
      })}
    </div>
  );
}
