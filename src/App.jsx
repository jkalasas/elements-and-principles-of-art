import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SlideDeck } from './components';
import './styles/global.scss';
import './styles/slides.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/slide/:index" element={<SlideDeck />} />
        <Route path="*" element={<Navigate to="/slide/0" replace />} />
      </Routes>
    </Router>
  );
}
