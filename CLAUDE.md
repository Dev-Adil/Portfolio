# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run build:analyze  # Build + generate dist/stats.html bundle visualization
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run typecheck    # TypeScript check without emit
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Architecture

Single-page React + TypeScript portfolio, no router. `src/App.tsx` is the root — it lazy-loads every section (Navbar, Hero, Stats, About, Experience, Tech/Skills, Education, Contact, Footer) for code splitting.

**v2.0 is performance-first and has no Three.js / WebGL.** The original 3D layer (Earth globe, tech balls, star/wave canvases) was removed to cut ~72MB of assets and the ~900KB three.js bundle. Visual interest now comes from cheap, GPU-friendly effects:
- `src/components/HeroBackdrop.tsx` — a lightweight 2D `<canvas>` constellation field (drifting points + connecting lines + pointer interaction). Pauses when off-screen and renders a single static frame under reduced motion. No library.
- CSS effects in `src/index.css`: `hero-aurora` (drifting gradient glow), `gradient-border` (animated panel framing, used by Contact), `gradient-text`, `texture-dots`.
- `src/components/Stats.tsx` — count-up impact metrics that animate on scroll-in.

**Sections** (`src/components/`): Hero (+ HeroBackdrop), Stats, About, Experience (vertical timeline), Tech (Skills), Education (degrees + certifications with inline SVG icons from `icons.tsx`), Contact (EmailJS form + gradient-border "connect" panel), Footer.

**Section HOC** (`src/hoc/SectionWrapper.tsx`): wraps each section with a scroll-triggered Framer Motion reveal and an `id` anchor for navbar linking. Import via `src/hoc/index.ts`.

**Content data** (`src/constants/index.ts`): all portfolio content — `profile` (name/links/email), `services`, `skillGroups`, `experiences`, `education`, `certifications`. Edit content here, not in the components.

**Reduced motion / accessibility**: `src/utils/performance.ts` exposes `prefersReducedMotion()`; every animation (hero canvas, aurora, stats, reveals) respects it. Targets: Lighthouse mobile Perf ≥90, Accessibility / Best-Practices / SEO = 100.

**Styling**: Tailwind CSS (`tailwind.config.cjs`) + custom tokens in `src/style.ts`, plus the custom classes in `src/index.css` noted above.

**Build output**: Vite with manual chunks (`react`, `motion`), Brotli+Gzip compression, PWA via `vite-plugin-pwa`. Console and debugger calls are stripped in production (`esbuild.drop`).
