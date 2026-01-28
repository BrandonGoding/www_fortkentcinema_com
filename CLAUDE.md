# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start Vite dev server with HMR (localhost:5173)
npm run build    # Production build to /dist
npm run lint     # ESLint code quality checks
npm run preview  # Preview production build locally
```

## Technology Stack

- **React 19** with Vite 7
- **React Router DOM 7** for client-side routing
- **react-helmet-async** for SEO meta tags
- **Pure CSS** with CSS custom properties (no preprocessors)

## Architecture Overview

### Data Flow

The app fetches data from two external sources with local JSON fallbacks:

1. **Cinema Data** (`src/services/api.js`):
   - Primary: `https://www.leprinceos.com/api/v1` (cinema_sass API)
   - Fallback: Local JSON files in `/src/data/`
   - Toggle: `USE_API` flag in api.js
   - Handles UTC → America/New_York timezone conversion for showtimes

2. **Blog Posts**: `https://api.fortkentcinema.com/api/posts/` (paginated)

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main router, fetches all data on mount, manages loading state |
| `src/services/api.js` | Data fetching layer with API/local fallback logic |
| `src/data/siteConfig.json` | Cinema info, hours, navigation menu |
| `src/data/membership.json` | 5-tier membership plans with perks and pricing |
| `src/styles/variables.css` | Design system (colors, fonts, spacing) |

### Routes

- `/` - Homepage with Hero, NowShowing, ComingSoon, Membership sections
- `/blog` - Blog listing with infinite scroll
- `/blog/:slug` - Individual blog post
- `/rentals` - Private rental packages

### Component Patterns

- **NowShowing**: Groups showtimes by date, uses date filtering with useMemo
- **BlogListPage**: Intersection Observer for infinite scroll pagination
- **Nav**: Context-aware routing (hash links on homepage, full routes elsewhere)
- **Membership**: Card-based tiers with Square checkout links

## Styling

CSS custom properties defined in `src/styles/variables.css`:
- Dark theme: `--color-dark-bg`, `--color-charcoal`
- Accents: `--color-neon-red`, `--color-gold`, `--color-cream`
- Fonts: Bebas Neue (display), Playfair Display (headings), Inter (body)

## Deployment

- Hosted on Netlify/Vercel (see `/public/_redirects` for SPA routing)
- SEO: Rich meta tags in `/index.html` with schema.org MovieTheater structured data
