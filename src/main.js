import 'reveal.js/dist/reveal.css';
import './theme/gallery.scss';
import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';

Reveal.initialize({
  hash: true,
  slideNumber: true,
  transition: 'fade',
  transitionSpeed: 'default',
  backgroundTransition: 'slide',
  width: 960,
  height: 540,
  margin: 0.08,
  minScale: 0.2,
  maxScale: 1.5,
  plugins: [RevealMarkdown],
});
