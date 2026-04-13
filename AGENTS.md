# AGENTS.md — Development Guidelines

## Commit Messages
- Semantic, one-liner only
- Format: `type(scope): message`
- Types: `feat`, `fix`, `style`, `chore`, `docs`, `refactor`
- No descriptions, no body text

## Adding Slides
- All slides live in `src/presentation.md`
- Horizontal slide separator: `---`
- Each slide should have: section label, heading, content, artwork (if applicable)
- Artwork images go in `public/images/<section>/`

## Image Sourcing
- Use open-access/public domain sources
- Always record attribution (artist, title, year, source URL)
- Update the references slide (last slide) with new attributions
- Preferred sources: Met Museum Open Access, Wikimedia Commons, Rijksmuseum

## Running the Project
- `npm run dev` — start dev server on port 3000
- `npm run build` — build for production
- `npm run preview` — preview production build

## Theme Changes
- Edit `src/theme/gallery.scss`
- Color variables at the top of the file
- Component styles organized by section label
