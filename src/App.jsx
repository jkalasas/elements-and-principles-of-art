import { BrowserRouter as Router } from 'react-router-dom';
import { SlideDeck } from './components';
import './styles/global.scss';
import './styles/slides.scss';

export default function App() {
  return (
    <Router>
      <SlideDeck />
    </Router>
  );
}
