# S1: Identity / Hero Section

**Sprint:** Sprint 1
**Priority:** P1 — First user-visible feature
**Status:** `[x] complete` — 70/70 tests green, lint clean, CI green

---

## Story

**As a** recruiter, hiring manager, or visitor,  
**I want** to immediately see who Drew is, what he does, and what technologies he works with,  
**so that** I can decide within seconds whether to keep scrolling.

---

## Acceptance Criteria

1. The page displays Drew's full name, styled prominently as the primary heading.
2. Drew's current job title is visible below the name.
3. Drew's degree and experience level (e.g. "Junior — 2+ years") are visible.
4. A horizontal tech stack icon ticker is visible above the photo strip and auto-scrolls continuously.
5. A second horizontal tech stack icon ticker is visible below the photo strip and auto-scrolls continuously.
6. Three vertical columns of photos are visible and auto-scroll at different speeds.
7. All photos have descriptive `alt` text.
8. All tech stack icons have `aria-label` or `title` attributes identifying the technology.
9. The section is fully visible and usable on 375px, 768px, and 1440px viewports.
10. The name animates with a scramble-text effect on page load (characters resolve to final name).
11. Animations respect `prefers-reduced-motion` — no motion when the user has reduced motion enabled.

---

## Tasks

- [x] Create `src/lib/types.ts` — WorkEntry, Project, TechIcon types
- [x] Create `src/lib/data.ts` — identity, techIcons, heroPhotos, workHistory, projects
- [x] Write `src/components/Hero/Hero.test.tsx` — 17 Vitest tests (RED → GREEN)
- [x] Write `tests/e2e/hero.spec.ts` — 13 Playwright tests × 3 browsers (RED → GREEN)
- [x] Create `src/components/Hero/ScrambleText.tsx` — scramble animation + reduced motion
- [x] Create `src/components/Hero/TechTicker.tsx` — horizontal marquee + reduced motion
- [x] Create `src/components/Hero/PhotoTicker.tsx` — 3-column vertical scroll + reduced motion
- [x] Create `src/components/Hero/Hero.tsx` — section wrapper with Tailwind layout
- [x] Wire `Hero` + `LoadingScreen` into `src/app/page.tsx`
- [x] REFACTOR — full Tailwind layout, Framer Motion animations, CSS keyframes in globals.css
- [x] Fix lint error — removed synchronous `setState` inside effect in `ScrambleText.tsx`
- [x] Fix lint warnings — removed unused `act` and `getByRole` imports in `LoadingScreen.test.tsx`

---

## Test Coverage

- **Vitest (`src/components/Hero/Hero.test.tsx`)** — 17 tests, all ✅:
  - AC1 ✅ name present, AC2 ✅ job title, AC3 ✅ degree, AC3 ✅ experience
  - AC10 ✅ scramble-text resolves to name, ✅ empty string, ✅ special chars
  - AC4/8 ✅ icons have aria-labels, ✅ all icons rendered, ✅ single-item array
  - AC6/7 ✅ 3 photo columns, ✅ each column has photos, ✅ all images have alt
  - AC6 ✅ empty photo array no crash
  - Integration ✅ name from data.ts, ✅ icon count from data.ts, ✅ photo srcs from data.ts
- **Playwright (`tests/e2e/hero.spec.ts`)** — 13 tests × 3 browsers = 39 runs, all ✅:
  - ✅ name, job title, degree, experience visible on root route
  - ✅ two tech tickers present, all icons have aria-labels
  - ✅ 3 photo columns, all images have alt text
  - ✅ name visible at 375px, 768px, 1440px

---

## Definition of Done

- [x] `Hero.test.tsx` — 17/17 Vitest tests green
- [x] `hero.spec.ts` — 39/39 Playwright tests green (Chromium, Firefox, WebKit)
- [x] Scramble-text, photo strip tickers, and both icon tickers animated (REFACTOR complete)
- [x] `pnpm lint` passes with zero errors and zero warnings
- [x] GitHub Actions CI green (lint + Vitest + Playwright)
- [x] Section visible on Vercel preview URL on next push

---

## Animation References

- **Scramble text:** character cycling via `setInterval` + `useRef` resolves to final name; skips under `prefers-reduced-motion`
- **Horizontal ticker:** CSS `@keyframes ticker` (`translateX 0 → -50%`) on duplicated list; `hover:[animation-play-state:paused]`; skips under `prefers-reduced-motion`
- **Vertical photo strip:** CSS `@keyframes scroll-slow/medium/fast` (`translateY 0 → -50%`) per column with staggered durations (18s / 12s / 8s); skips under `prefers-reduced-motion`
- **Reduced motion guard:** `useReducedMotion()` from Framer Motion in `TechTicker` and `PhotoTicker`; `window.matchMedia` check in `ScrambleText`
