import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SlideDeck from '../components/SlideDeck';
import slidesData from '../data/slidesData';

describe('SlideDeck', () => {
  it('renders a stub slide when no component is registered', () => {
    render(
      <MemoryRouter initialEntries={['/slide/0']}>
        <SlideDeck />
      </MemoryRouter>
    );
    expect(screen.getByText(/Coming Soon/)).toBeInTheDocument();
  });

  it('handles out-of-bounds index by clamping to first slide', () => {
    render(
      <MemoryRouter initialEntries={['/slide/999']}>
        <SlideDeck />
      </MemoryRouter>
    );
    expect(screen.getByText(/Coming Soon/)).toBeInTheDocument();
  });
});
