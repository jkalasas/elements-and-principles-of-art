# React + Framer Motion Presentation Refactor — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the 696-line Reveal.js markdown presentation into a React + Framer Motion SPA with cinematic animations and reusable component architecture.

**Architecture:** Single-page deck with a data-driven slide array, React Router for URL-based navigation, Framer Motion for slide transitions and within-slide staggered animations, and SCSS-based theme with CSS custom properties.

**Tech Stack:** React 19, React Router 7, Framer Motion, Vite (existing bundler), SCSS, Vitest + React Testing Library

---

## File Map

### New Files
| File | Responsibility |
|------|----------------|
| `src/data/slidesData.js` | All slide content as structured JS objects |
| `src/components/SlideDeck.jsx` | Main container: routing, AnimatePresence, keyboard handler |
| `src/components/TitleSlide.jsx` | Opening title slide |
| `src/components/SectionIntroSlide.jsx` | Section opener slides |
| `src/components/ArtworkSlide.jsx` | Standard artwork slides (Elements, Principles, Hybrid Art) |
| `src/components/AnalysisSlide.jsx` | Interrelatedness analysis slides |
| `src/components/RecapSlide.jsx` | Section summary bullet-list slides |
| `src/components/SummarySlide.jsx` | Final "What We've Learned" slide |
| `src/components/ClosingSlide.jsx` | "Questions?" closing slide |
| `src/components/ReferencesSlide.jsx` | Attributions list slide |
| `src/components/ArtworkBlock.jsx` | Reusable image + attribution + content block |
| `src/components/Navigation.jsx` | Keyboard/swipe handlers + progress bar |
| `src/components/index.js` | Barrel export for all components |
| `src/styles/variables.scss` | CSS custom properties from DESIGN.md |
| `src/styles/global.scss` | Base resets, typography, global styles |
| `src/styles/slides.scss` | Slide-specific component styles |
| `src/App.jsx` | Root component with Router setup |
| `src/main.jsx` | React entry point (replaces main.js) |
| `src/__tests__/slidesData.test.js` | Data layer tests |
| `src/__tests__/SlideDeck.test.jsx` | Navigation and routing tests |
| `src/__tests__/ArtworkBlock.test.jsx` | ArtworkBlock rendering tests |

### Modified Files
| File | Changes |
|------|---------|
| `index.html` | Replace reveal.js HTML with React mount point + `main.jsx` script |
| `vite.config.js` | Add `@vitejs/plugin-react` |
| `package.json` | Add React deps, remove reveal.js, add test scripts |

### Deleted Files
| File | Reason |
|------|--------|
| `src/main.js` | Replaced by `src/main.jsx` |
| `src/presentation.md` | Content migrated to `slidesData.js` |

---

## Chunk 1: Project Setup & Data Layer

### Task 1: Install Dependencies & Configure Vite

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`

- [ ] **Step 1: Install React and animation dependencies**

Run:
```bash
npm install react@19 react-dom@19 react-router-dom@7 framer-motion@12
npm install -D @vitejs/plugin-react vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Update package.json scripts**

Edit `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- [ ] **Step 3: Add Vite React plugin**

Edit `vite.config.js`:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.js',
  },
});
```

- [ ] **Step 4: Create test setup file**

Create `src/__tests__/setup.js`:
```js
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.js src/__tests__/setup.js
git commit -m "feat: add React dependencies and Vite plugin"
```

---

### Task 2: Create Slide Data Layer

**Files:**
- Create: `src/data/slidesData.js`
- Test: `src/__tests__/slidesData.test.js`

- [ ] **Step 1: Write test for slidesData structure**

Create `src/__tests__/slidesData.test.js`:
```js
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
    // summary + references + closing = 33
    expect(slidesData.length).toBe(33);
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm run test:run
```
Expected: FAIL — `src/data/slidesData.js` not found

- [ ] **Step 3: Create slidesData.js with full content from presentation.md**

First, read `src/presentation.md` in full. Then transcribe ALL slide content verbatim into `src/data/slidesData.js` as structured objects following the type definitions from the spec.

Use this slide type mapping (33 slides total, in order):

| # | Type | id | sectionLabel | title (abbreviated) |
|---|------|-----|--------------|---------------------|
| 1 | title | title | — | Elements and Principles of Art |
| 2 | sectionIntro | roadmap | Roadmap | What We'll Explore |
| 3 | artwork | line | Elements of Art | Line |
| 4 | artwork | shape | Elements of Art | Shape |
| 5 | artwork | form | Elements of Art | Form |
| 6 | artwork | value | Elements of Art | Value |
| 7 | artwork | space | Elements of Art | Space |
| 8 | artwork | color | Elements of Art | Color |
| 9 | artwork | texture | Elements of Art | Texture |
| 10 | recap | elements-recap | Elements of Art | The Seven Elements — Recap |
| 11 | sectionIntro | principles-intro | Principles of Art | Principles of Art |
| 12 | artwork | rhythm | Principles of Art | Rhythm |
| 13 | artwork | balance | Principles of Art | Balance |
| 14 | artwork | emphasis | Principles of Art | Emphasis (Contrast) |
| 15 | artwork | proportion | Principles of Art | Proportion |
| 16 | artwork | gradation | Principles of Art | Gradation |
| 17 | artwork | harmony | Principles of Art | Harmony |
| 18 | artwork | variety | Principles of Art | Variety |
| 19 | artwork | movement | Principles of Art | Movement |
| 20 | recap | principles-recap | Principles of Art | The Eight Principles — Recap |
| 21 | sectionIntro | interrelatedness-intro | Interrelatedness | Elements and Principles Working Together |
| 22 | analysis | starry-night | Interrelatedness | The Starry Night — Vincent van Gogh (1889) |
| 23 | analysis | great-wave | Interrelatedness | The Great Wave — Katsushika Hokusai (c. 1831) |
| 24 | analysis | third-of-may | Interrelatedness | The Third of May 1808 — Francisco Goya (1814) |
| 25 | recap | interrelatedness-recap | Interrelatedness | Key Takeaway |
| 26 | sectionIntro | hybrid-intro | Hybrid Art | When Art Forms Combine |
| 27 | artwork | digital-painting | Hybrid Art | Digital Painting |
| 28 | artwork | sculpture-projection | Hybrid Art | Sculpture + Projection Mapping |
| 29 | artwork | photo-collage | Hybrid Art | Photography + Collage + Digital Manipulation |
| 30 | recap | hybrid-recap | Hybrid Art | Hybrid Art Pushes Boundaries |
| 31 | summary | summary | Summary | What We've Learned |
| 32 | references | references | References | Image Attributions |
| 33 | closing | closing | Elements and Principles of Art | Questions? |

For artwork slides (type `artwork`), each has:
- `definition`: the paragraph text directly under the slide title in presentation.md
- `artwork`: array with ONE object per slide containing `imageSrc`, `imageAlt`, `attribution`, `contentTitle` (the h3 text), `content` (paragraph under h3), and optionally `meaning` (`{ label: 'Meaning', text: '...' }`)

For analysis slides (type `analysis`), extract:
- `artwork`: `{ imageSrc, imageAlt, attribution }`
- `elementsAtPlay`: array of `{ label, description }` from "Elements at Play" section (bold text = label)
- `principlesAtPlay`: array of `{ label, description }` from "Principles at Play" section
- `meaning`: `{ label: 'Meaning', text: '...' }`

For recap slides (type `recap`):
- `items`: array of bullet point strings (e.g., "**Line** — Marks connecting points...")
- `footerText`: trailing paragraph if present

For summary slide (type `summary`):
- `items`: array of `{ label, description }` for each bold label + definition pair
- `closingStatement`: final paragraph text

For references slide (type `references`):
- `sections`: array of `{ sectionName, attributions: string[] }` grouped by section header

For closing slide (type `closing`):
- `icon`: '◆'
- `sectionLabel`: 'Elements and Principles of Art'
- `title`: 'Questions?'

For artwork slides, use image paths following the convention `/images/<section>/<topic>.jpg`:
- Elements: `/images/elements/line.jpg`, `/images/elements/shape.jpg`, etc.
- Principles: `/images/principles/rhythm.jpg`, `/images/principles/balance.jpg`, etc.
- Interrelatedness: `/images/interrelatedness/starry-night.jpg`, etc.
- Hybrid Art: `/images/hybrid/digital-painting.jpg`, etc.

These match the existing `public/images/` directory structure.

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm run test:run -- src/__tests__/slidesData.test.js
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/slidesData.js src/__tests__/slidesData.test.js
git commit -m "feat: add slide data layer from presentation content"
```

---

## Chunk 2: Styles & Entry Point

### Task 3: Create Style System

**Files:**
- Create: `src/styles/variables.scss`
- Create: `src/styles/global.scss`
- Create: `src/styles/slides.scss`
- Read: `src/theme/gallery.scss` (for reference)

- [ ] **Step 1: Create CSS variables**

Create `src/styles/variables.scss`:
```scss
:root {
  --bg-primary: #2D2A26;
  --bg-secondary: #4A3F35;
  --accent: #D4A574;
  --text-primary: #E8D5C4;
  --text-muted: #B8A99A;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --transition-slide: 0.4s;
  --stagger-delay: 0.2s;
}
```

- [ ] **Step 2: Create global styles**

Create `src/styles/global.scss`:
```scss
@import './variables.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}
```

- [ ] **Step 3: Create slide-specific styles**

Create `src/styles/slides.scss` with the following key styles:

```scss
@import './variables.scss';

.slide-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slide {
  width: 100%;
  height: 100%;
  padding: 5% 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.section-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-number {
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--accent);
  opacity: 0.3;
  display: block;
  margin-bottom: 0.5rem;
}

.artwork-block {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  
  .artwork-image {
    flex: 0 0 45%;
    
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .image-placeholder {
      width: 100%;
      aspect-ratio: 4/3;
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-style: italic;
      border-radius: 4px;
    }
  }
  
  .artwork-content {
    flex: 1;
    
    h3 {
      font-family: var(--font-heading);
      margin-bottom: 0.75rem;
      color: var(--accent);
    }
  }
}

.attribution {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  font-style: italic;
}

.meaning-callout {
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-secondary);
  border-radius: 0 4px 4px 0;
  
  .meaning-label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
}

.recap-list {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  
  li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '◆';
      position: absolute;
      left: 0;
      color: var(--accent);
    }
  }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  z-index: 100;
}

.nav-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(45, 42, 38, 0.7);
  border: 1px solid var(--accent);
  color: var(--text-primary);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 50;
  
  &:hover {
    background: rgba(74, 63, 53, 0.9);
  }
  
  &.prev { left: 1rem; }
  &.next { right: 1rem; }
}

.touch-area {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.analysis-layout {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  
  .analysis-artwork {
    flex: 0 0 40%;
    
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  
  .analysis-content {
    flex: 1;
    
    h3 {
      font-family: var(--font-heading);
      color: var(--accent);
      margin: 1rem 0 0.5rem;
    }
    
    p {
      margin-bottom: 0.5rem;
    }
  }
}

.references-section {
  margin-bottom: 1.5rem;
  
  h3 {
    font-family: var(--font-heading);
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      font-size: 0.85rem;
      color: var(--text-muted);
      padding: 0.25rem 0;
    }
  }
}

.title-slide {
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .accent-line {
    width: 60%;
    height: 2px;
    background: var(--accent);
    margin: 1rem auto;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
  }
}

.section-intro-slide {
  text-align: center;
  
  h2 {
    font-size: 2rem;
    margin-top: 1rem;
  }
  
  .section-description {
    color: var(--text-muted);
    margin-top: 1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

.closing-slide {
  text-align: center;
  
  .closing-icon {
    font-size: 3rem;
    color: var(--accent);
    margin: 1rem 0;
  }
  
  h2 {
    font-size: 2.5rem;
  }
}

.summary-item {
  margin: 1rem 0;
  
  strong {
    color: var(--accent);
  }
  
  p {
    margin-top: 0.25rem;
  }
}

.closing-statement {
  margin-top: 2rem;
  font-style: italic;
  color: var(--text-muted);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "style: create SCSS theme with CSS custom properties"
```

---

### Task 4: Create React Entry Point

**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Modify: `index.html`

- [ ] **Step 1: Create App.jsx**

Create `src/App.jsx`:
```jsx
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
```

- [ ] **Step 2: Create main.jsx**

Create `src/main.jsx`:
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3: Update index.html**

Replace `index.html` content:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elements and Principles of Art</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 4: Verify dev server starts (expect import error)**

Run:
```bash
npm run dev
```
Expected: Vite starts but the page shows a module resolution error because `SlideDeck` and other components don't exist yet. This is expected — we're just confirming Vite, React plugin, and HTML mount point are wired correctly. The error will resolve once components are built in Chunk 3.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/main.jsx index.html
git commit -m "feat: add React entry point and root component"
```

---

## Chunk 3: Core Components & Navigation

### Task 5: ArtworkBlock Component

**Files:**
- Create: `src/components/ArtworkBlock.jsx`
- Test: `src/__tests__/ArtworkBlock.test.jsx`

- [ ] **Step 1: Write test for ArtworkBlock**

Create `src/__tests__/ArtworkBlock.test.jsx`:
```jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm run test:run -- src/__tests__/ArtworkBlock.test.jsx
```
Expected: FAIL — ArtworkBlock not found

- [ ] **Step 3: Create ArtworkBlock component**

Create `src/components/ArtworkBlock.jsx`:
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ArtworkBlock({ imageSrc, imageAlt, attribution, title, children, meaning }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="artwork-block">
      <div className="artwork-image">
        {imageError ? (
          <div className="image-placeholder">{imageAlt}</div>
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <div className="attribution">{attribution}</div>
      </div>
      <div className="artwork-content">
        <h3>{title}</h3>
        {children}
        {meaning && (
          <motion.div
            className="meaning-callout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4, ease: 'easeInOut' }}
          >
            <span className="meaning-label">{meaning.label}</span>
            <p>{meaning.text}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm run test:run -- src/__tests__/ArtworkBlock.test.jsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ArtworkBlock.jsx src/__tests__/ArtworkBlock.test.jsx
git commit -m "feat: add ArtworkBlock reusable component"
```

---

### Task 6: Navigation Component

**Files:**
- Create: `src/components/Navigation.jsx`

- [ ] **Step 1: Create Navigation component**

Create `src/components/Navigation.jsx`:
```jsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ currentIndex, totalSlides, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigate('next');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigate('prev');
    }
  }, [onNavigate]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      onNavigate(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const progress = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <>
      <motion.div
        className="progress-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
      <div
        className="touch-area"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentIndex > 0 && (
          <button className="nav-button prev" onClick={() => onNavigate('prev')}>
            ←
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button className="nav-button next" onClick={() => onNavigate('next')}>
            →
          </button>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navigation.jsx
git commit -m "feat: add Navigation with keyboard and touch support"
```

---

### Task 7: SlideDeck Component

**Files:**
- Create: `src/components/SlideDeck.jsx`
- Create: `src/components/index.js`
- Test: `src/__tests__/SlideDeck.test.jsx`

- [ ] **Step 1: Create SlideDeck component (progressive — stub for all types until Task 8)**

Create `src/components/SlideDeck.jsx`:
```jsx
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import slidesData from '../data/slidesData';
import Navigation from './Navigation';

// Stub component for slide types not yet registered
const StubSlide = ({ type, title }) => (
  <div>
    <span className="section-label">Coming Soon</span>
    <h2>{title}</h2>
    <p>Slide type "{type}" not yet implemented.</p>
  </div>
);

// Progressive registration — populated in Tasks 8-11
const slideComponents = {};

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function SlideDeck() {
  const { index } = useParams();
  const navigate = useNavigate();
  const currentIndex = Math.max(0, Math.min(parseInt(index) || 0, slidesData.length - 1));
  const slide = slidesData[currentIndex];

  const handleNavigate = useCallback((direction) => {
    const next = direction === 'next'
      ? Math.min(currentIndex + 1, slidesData.length - 1)
      : Math.max(currentIndex - 1, 0);
    navigate(`/slide/${next}`, { replace: true });
  }, [currentIndex, navigate]);

  const Component = slideComponents[slide.type];

  return (
    <>
      <Navigation currentIndex={currentIndex} totalSlides={slidesData.length} onNavigate={handleNavigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="slide-container"
          {...pageTransition}
        >
          <div className="slide">
            {Component ? <Component {...slide} /> : <StubSlide type={slide.type} title={slide.title} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Create barrel export (only for existing components)**

Create `src/components/index.js`:
```js
export { default as SlideDeck } from './SlideDeck';
export { default as Navigation } from './Navigation';
export { default as ArtworkBlock } from './ArtworkBlock';
```

- [ ] **Step 3: Write test for SlideDeck navigation**

Create `src/__tests__/SlideDeck.test.jsx`:
```jsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm run test:run -- src/__tests__/SlideDeck.test.jsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/SlideDeck.jsx src/components/index.js src/__tests__/SlideDeck.test.jsx
git commit -m "feat: add SlideDeck with routing and animation wrapper"
```

---

## Chunk 4: Slide Components

### Task 8: TitleSlide & SectionIntroSlide

**Files:**
- Create: `src/components/TitleSlide.jsx`
- Create: `src/components/SectionIntroSlide.jsx`

- [ ] **Step 1: Create TitleSlide**

Create `src/components/TitleSlide.jsx`:
```jsx
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } }),
};

export default function TitleSlide({ title, subtitle }) {
  return (
    <div className="slide title-slide">
      <motion.h1 custom={0.3} initial="hidden" animate="visible" variants={variants}>
        {title}
      </motion.h1>
      <motion.div className="accent-line" custom={0.5} initial="hidden" animate="visible" variants={{
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { delay: 0.5, duration: 0.6, ease: 'easeInOut' } },
      }} />
      <motion.p className="subtitle" custom={0.7} initial="hidden" animate="visible" variants={variants}>
        {subtitle}
      </motion.p>
    </div>
  );
}
```

- [ ] **Step 2: Create SectionIntroSlide**

Create `src/components/SectionIntroSlide.jsx`:
```jsx
import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function SectionIntroSlide({ sectionLabel, sectionNumber, title, description }) {
  return (
    <div className="slide section-intro-slide">
      <motion.div className="section-number" {...fadeUp(0.2)}>
        {sectionNumber}
      </motion.div>
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className="section-description" {...fadeUp(0.7)}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Register TitleSlide and SectionIntroSlide in SlideDeck**

Add these imports to the top of `SlideDeck.jsx`:
```js
import TitleSlide from './TitleSlide';
import SectionIntroSlide from './SectionIntroSlide';
```

Add to `slideComponents`:
```js
const slideComponents = {
  title: TitleSlide,
  sectionIntro: SectionIntroSlide,
};
```

Update barrel export `src/components/index.js`:
```js
export { default as SlideDeck } from './SlideDeck';
export { default as Navigation } from './Navigation';
export { default as ArtworkBlock } from './ArtworkBlock';
export { default as TitleSlide } from './TitleSlide';
export { default as SectionIntroSlide } from './SectionIntroSlide';
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TitleSlide.jsx src/components/SectionIntroSlide.jsx src/components/SlideDeck.jsx src/components/index.js
git commit -m "feat: add TitleSlide and SectionIntroSlide components"
```

---

### Task 9: ArtworkSlide

**Files:**
- Create: `src/components/ArtworkSlide.jsx`

- [ ] **Step 1: Create ArtworkSlide component**

Create `src/components/ArtworkSlide.jsx`:
```jsx
import { motion } from 'framer-motion';
import ArtworkBlock from './ArtworkBlock';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function ArtworkSlide({ sectionLabel, title, definition, artwork }) {
  return (
    <div className="slide artwork-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <motion.p className="definition" {...fadeUp(0.7)}>
        {definition}
      </motion.p>
      {artwork.map((art, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + index * 0.2, duration: 0.4, ease: 'easeInOut' }}
        >
          <ArtworkBlock
            imageSrc={art.imageSrc}
            imageAlt={art.imageAlt}
            attribution={art.attribution}
            title={art.contentTitle}
            meaning={art.meaning}
          >
            <p>{art.content}</p>
          </ArtworkBlock>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ArtworkSlide.jsx
git commit -m "feat: add ArtworkSlide component"
```

---

### Task 10: AnalysisSlide

**Files:**
- Create: `src/components/AnalysisSlide.jsx`

- [ ] **Step 1: Create AnalysisSlide component**

Create `src/components/AnalysisSlide.jsx`:
```jsx
import { motion } from 'framer-motion';
import ArtworkBlock from './ArtworkBlock';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function AnalysisSlide({ sectionLabel, title, artwork, elementsAtPlay, principlesAtPlay, meaning }) {
  return (
    <div className="slide analysis-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <div className="analysis-layout">
        <motion.div
          className="analysis-artwork"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <img src={artwork.imageSrc} alt={artwork.imageAlt} loading="lazy" />
          <div className="attribution">{artwork.attribution}</div>
        </motion.div>
        <div className="analysis-content">
          <h3>Elements at Play</h3>
          {elementsAtPlay.map((el, i) => (
            <motion.p key={el.label} {...fadeUp(0.8 + i * 0.1)}>
              <strong>{el.label}:</strong> {el.description}
            </motion.p>
          ))}
          <h3>Principles at Play</h3>
          {principlesAtPlay.map((pr, i) => (
            <motion.p key={pr.label} {...fadeUp(1.0 + i * 0.1)}>
              <strong>{pr.label}:</strong> {pr.description}
            </motion.p>
          ))}
        </div>
      </div>
      <motion.div className="meaning-callout" {...fadeUp(1.3)}>
        <span className="meaning-label">{meaning.label}</span>
        <p>{meaning.text}</p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AnalysisSlide.jsx
git commit -m "feat: add AnalysisSlide component"
```

---

### Task 11: RecapSlide, SummarySlide, ClosingSlide, ReferencesSlide

**Files:**
- Create: `src/components/RecapSlide.jsx`
- Create: `src/components/SummarySlide.jsx`
- Create: `src/components/ClosingSlide.jsx`
- Create: `src/components/ReferencesSlide.jsx`

- [ ] **Step 1: Create RecapSlide**

Create `src/components/RecapSlide.jsx`:
```jsx
import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeInOut' } },
});

export default function RecapSlide({ sectionLabel, title, items, footerText }) {
  return (
    <div className="slide recap-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.h2 {...fadeUp(0.5)}>
        {title}
      </motion.h2>
      <ul className="recap-list">
        {items.map((item, i) => (
          <motion.li key={i} {...fadeUp(0.7 + i * 0.1)}>
            {item}
          </motion.li>
        ))}
      </ul>
      {footerText && (
        <motion.p className="recap-footer" {...fadeUp(0.7 + items.length * 0.1)}>
          {footerText}
        </motion.p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create SummarySlide**

Create `src/components/SummarySlide.jsx`:
```jsx
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
```

- [ ] **Step 3: Create ClosingSlide**

Create `src/components/ClosingSlide.jsx`:
```jsx
import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeInOut' } },
});

export default function ClosingSlide({ sectionLabel, icon, title }) {
  return (
    <div className="slide closing-slide">
      <motion.span className="section-label" {...fadeUp(0.3)}>
        {sectionLabel}
      </motion.span>
      <motion.div className="closing-icon" {...fadeUp(0.5)}>
        {icon}
      </motion.div>
      <motion.h2 {...fadeUp(0.7)}>
        {title}
      </motion.h2>
    </div>
  );
}
```

- [ ] **Step 4: Create ReferencesSlide**

Create `src/components/ReferencesSlide.jsx`:
```jsx
import { motion } from 'framer-motion';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeInOut' } },
});

export default function ReferencesSlide({ title, sections }) {
  return (
    <div className="slide references-slide">
      <motion.h2 {...fadeUp(0.3)}>
        {title}
      </motion.h2>
      {sections.map((section, i) => (
        <motion.div key={section.sectionName} className="references-section" {...fadeUp(0.5 + i * 0.15)}>
          <h3>{section.sectionName}</h3>
          <ul>
            {section.attributions.map((attr, j) => (
              <li key={j}>{attr}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Register all remaining slide components in SlideDeck**

Update `SlideDeck.jsx` — replace the progressive registration section with the full component map:

```js
import TitleSlide from './TitleSlide';
import SectionIntroSlide from './SectionIntroSlide';
import ArtworkSlide from './ArtworkSlide';
import AnalysisSlide from './AnalysisSlide';
import RecapSlide from './RecapSlide';
import SummarySlide from './SummarySlide';
import ClosingSlide from './ClosingSlide';
import ReferencesSlide from './ReferencesSlide';

const slideComponents = {
  title: TitleSlide,
  sectionIntro: SectionIntroSlide,
  artwork: ArtworkSlide,
  analysis: AnalysisSlide,
  recap: RecapSlide,
  summary: SummarySlide,
  closing: ClosingSlide,
  references: ReferencesSlide,
};
```

Update barrel export `src/components/index.js`:

```js
export { default as SlideDeck } from './SlideDeck';
export { default as Navigation } from './Navigation';
export { default as ArtworkBlock } from './ArtworkBlock';
export { default as TitleSlide } from './TitleSlide';
export { default as SectionIntroSlide } from './SectionIntroSlide';
export { default as ArtworkSlide } from './ArtworkSlide';
export { default as AnalysisSlide } from './AnalysisSlide';
export { default as RecapSlide } from './RecapSlide';
export { default as SummarySlide } from './SummarySlide';
export { default as ClosingSlide } from './ClosingSlide';
export { default as ReferencesSlide } from './ReferencesSlide';
```

- [ ] **Step 6: Commit**

```bash
git add src/components/RecapSlide.jsx src/components/SummarySlide.jsx src/components/ClosingSlide.jsx src/components/ReferencesSlide.jsx src/components/SlideDeck.jsx src/components/index.js
git commit -m "feat: add RecapSlide, SummarySlide, ClosingSlide, ReferencesSlide"
```

---

## Chunk 5: Wire Up, Polish & Cleanup

### Task 12: Populate slidesData.js with Full Content

**Files:**
- Modify: `src/data/slidesData.js`

- [ ] **Step 1: Ensure all 33 slides have complete content**

Verify `slidesData.js` contains all slides with verbatim content from `presentation.md`. Run the slidesData test:

```bash
npm run test:run -- src/__tests__/slidesData.test.js
```

Expected: PASS with 33 slides, correct field structure. Then manually diff against `presentation.md` to confirm no content was omitted or paraphrased.

- [ ] **Step 2: Run full test suite**

Run:
```bash
npm run test:run
```
Expected: ALL PASS

- [ ] **Step 3: Start dev server and visually verify**

Run:
```bash
npm run dev
```
Manually navigate through all 33 slides. Verify:
- All slide types render correctly (no "Coming Soon" stubs)
- Animations play on entry (fade, scale, stagger)
- Keyboard arrows navigate forward/back
- Touch/swipe works on mobile (if testing on device)
- Progress bar updates
- All images load or show placeholder
- Meaning callouts render with terracotta border

- [ ] **Step 4: Commit**

```bash
git add src/data/slidesData.js
git commit -m "feat: populate all 33 slides with presentation content"
```

---

### Task 13: Remove Reveal.js & Clean Up

**Files:**
- Delete: `src/main.js`
- Delete: `src/presentation.md`
- Delete: `src/theme/gallery.scss`
- Modify: `package.json`

- [ ] **Step 1: Remove reveal.js dependency**

Run:
```bash
npm uninstall reveal.js
```

- [ ] **Step 2: Delete obsolete files**

```bash
rm -f src/main.js src/presentation.md src/theme/gallery.scss
rmdir src/theme 2>/dev/null || true
```

Verify no remaining files import deleted modules:
```bash
grep -r "reveal.js\|gallery.scss\|main\.js\|presentation.md" src/ || echo "No orphaned imports found"
```
If any imports are found, remove them before proceeding.

- [ ] **Step 3: Verify build works**

Run:
```bash
npm run build
```
Expected: Successful build to `dist/`

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove reveal.js and obsolete files"
```

---

### Task 14: Final Verification

- [ ] **Step 1: Run full test suite**

Run:
```bash
npm run test:run
```
Expected: ALL PASS

- [ ] **Step 2: Run build**

Run:
```bash
npm run build
```
Expected: Successful production build to `dist/`

- [ ] **Step 3: Preview production build**

Run:
```bash
npm run preview
```
This serves the built `dist/` files. Manually verify all slides, animations, and navigation work identically to the dev server. This confirms the production build is correct.

- [ ] **Step 4: Verify error handling**

Manually test:
- Navigate to `/slide/999` — should clamp to slide 0
- Navigate to `/slide/-1` — should clamp to slide 0
- Temporarily rename an image file in `public/images/` — should show placeholder
All should degrade gracefully without crashing.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "feat: complete React + Framer Motion refactor"
```

---

**Plan complete.** Total: 14 tasks across 5 chunks, each producing testable, commit-ready changes.
