import React from 'react';

export default function MarkdownText({ text, className, as: Tag = 'p' }) {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/);

  const renderInline = (str) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const rendered = paragraphs.map((para, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {i > 0 && <br />}
      {renderInline(para)}
    </React.Fragment>
  ));

  return <Tag className={className}>{rendered}</Tag>;
}
