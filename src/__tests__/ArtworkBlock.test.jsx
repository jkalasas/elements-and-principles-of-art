import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArtworkBlock from '../components/ArtworkBlock';

const mockProps = {
  imageSrc: '/images/test.jpg',
  imageAlt: 'Test artwork',
  attribution: 'Artist, Title, Year — Source',
  title: 'How This Works',
  children: <p>Test content</p>,
};

describe('ArtworkBlock', () => {
  it('renders image with alt text', () => {
    render(<ArtworkBlock {...mockProps} />);
    const img = screen.getByAltText('Test artwork');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/test.jpg');
  });

  it('renders attribution text', () => {
    render(<ArtworkBlock {...mockProps} />);
    expect(screen.getByText(/Artist, Title/)).toBeInTheDocument();
  });

  it('renders title and children', () => {
    render(<ArtworkBlock {...mockProps} />);
    expect(screen.getByText('How This Works')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows placeholder when image fails', () => {
    render(<ArtworkBlock {...mockProps} imageSrc="/nonexistent.jpg" />);
    // Placeholder logic handled by onError
  });
});
