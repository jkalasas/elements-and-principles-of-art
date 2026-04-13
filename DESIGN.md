# Design System — Elements and Principles of Art Presentation

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Deep Charcoal | `#2D2A26` | Slide backgrounds |
| Secondary BG | Warm Brown | `#4A3F35` | Cards, code blocks, callouts |
| Accent | Terracotta | `#D4A574` | Links, headings emphasis, progress bar |
| Text / Light | Cream | `#E8D5C4` | Primary text, headings |
| Muted Text | Warm Gray | `#B8A99A` | Subtitles, attributions, secondary labels |

## Typography

- **Headings:** Playfair Display (serif) — elegant, art-gallery aesthetic
- **Body:** Inter (sans-serif) — modern, highly readable
- Google Fonts loaded via `<link>` in `index.html`

## Visual Components

### Artwork Display
- Image on left (45% width), content on right
- Attribution below image in muted text
- "Meaning" callout box with terracotta left border

### Section Labels
- Uppercase, wide letter-spacing, terracotta color
- Appears above section headings

### Recap Slides
- Diamond bullet points in terracotta
- Clean list layout

### Analysis Cards
- Warm brown background cards for interrelatedness/hybrid sections
- Shows elements used, principles used, and meaning breakdown

## Transitions
- Content slides: `fade`
- Section transitions: `slide` (via backgroundTransition)

## Layout
- Presentation size: 1200x700
- Margin: 8%
- Slide numbers enabled (bottom-right)
