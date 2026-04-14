import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SlideDeck from '../components/SlideDeck';
import slidesData from '../data/slidesData';

describe('SlideDeck', () => {
  it('renders the title slide at index 0', () => {
    render(
      <MemoryRouter initialEntries={['/slide/0']}>
        <SlideDeck />
      </MemoryRouter>
    );
    expect(screen.getByText('Elements and Principles of Art')).toBeInTheDocument();
  });

  it('handles out-of-bounds index by clamping to first slide', () => {
    render(
      <MemoryRouter initialEntries={['/slide/999']}>
        <SlideDeck />
      </MemoryRouter>
    );
    expect(screen.getByText('Elements and Principles of Art')).toBeInTheDocument();
  });

  it('renders negative index as first slide', () => {
    render(
      <MemoryRouter initialEntries={['/slide/-1']}>
        <SlideDeck />
      </MemoryRouter>
    );
    expect(screen.getByText('Elements and Principles of Art')).toBeInTheDocument();
  });

  it('renders correct number of slides in data', () => {
    expect(slidesData.length).toBe(42);
  });
});
