import { describe, it, expect } from 'vitest';
import slidesData from '../data/slidesData';

describe('slidesData', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(slidesData)).toBe(true);
    expect(slidesData.length).toBeGreaterThan(0);
  });

  it('every slide has a type and id', () => {
    slidesData.forEach((slide, index) => {
      expect(slide.type).toBeDefined();
      expect(slide.id).toBeDefined();
      expect(typeof slide.id).toBe('string');
      expect(slide.title).toBeDefined();
    });
  });

  it('has the correct number of slides (excluding empty transitions)', () => {
    // Title + roadmap + 7 elements + 1 recap + 4 section intros + 
    // 8 principles + 1 recap + 3 analysis + 1 recap + 3 hybrid + 1 recap +
    // summary + 2 references + closing + 5 MC + 1 TF + 1 matching + 1 short answer = 42
    expect(slidesData.length).toBe(42);
  });

  it('artwork slides have required fields', () => {
    const artworkSlides = slidesData.filter(s => s.type === 'artwork');
    artworkSlides.forEach(slide => {
      expect(slide.sectionLabel).toBeDefined();
      expect(slide.definition).toBeDefined();
      expect(Array.isArray(slide.artwork)).toBe(true);
      slide.artwork.forEach(art => {
        expect(art.imageSrc).toBeDefined();
        expect(art.imageAlt).toBeDefined();
        expect(art.attribution).toBeDefined();
        expect(art.contentTitle).toBeDefined();
        expect(art.content).toBeDefined();
      });
    });
  });

  it('analysis slides have required fields', () => {
    const analysisSlides = slidesData.filter(s => s.type === 'analysis');
    analysisSlides.forEach(slide => {
      expect(Array.isArray(slide.elementsAtPlay)).toBe(true);
      expect(Array.isArray(slide.principlesAtPlay)).toBe(true);
      expect(slide.meaning).toBeDefined();
    });
  });
});
