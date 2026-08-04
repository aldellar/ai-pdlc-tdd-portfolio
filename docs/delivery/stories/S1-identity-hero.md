# S1: Identity / Hero Section

**Sprint:** Sprint 1  
**Priority:** P1 — First user-visible feature  
**Status:** `[ ] pending` — blocked by S0

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

- [ ] Create `src/components/Hero/Hero.tsx` — section wrapper
- [ ] Create `src/components/Hero/ScrambleText.tsx` — scramble-text name animation
- [ ] Create `src/components/Hero/TechTicker.tsx` — horizontal infinite icon marquee
- [ ] Create `src/components/Hero/PhotoTicker.tsx` — 3-column vertical auto-scroll
- [ ] Add tech stack icon list and photo paths to `src/lib/data.ts`
- [ ] Wire `Hero` into `src/app/page.tsx`
- [ ] Write `src/components/Hero/Hero.test.tsx` (Vitest — component renders name, title, degree)
- [ ] Write `tests/e2e/hero.spec.ts` (Playwright — name, title, degree, experience visible in DOM)

---

## Test Coverage

- **Playwright (`tests/e2e/hero.spec.ts`):**
  - Assert Drew's name is present in the DOM
  - Assert job title text is present
  - Assert degree and experience level text is present
  - Assert at least one tech icon ticker element is present
  - Assert photo elements are present and have `alt` attributes
- **Vitest (`src/components/Hero/Hero.test.tsx`):**
  - Assert `Hero` renders all identity text from props
  - Assert `TechTicker` renders icon items from a data array
  - Assert `ScrambleText` renders the resolved final text in the DOM

---

## Definition of Done

- `hero.spec.ts` is green on CI
- `Hero.test.tsx` is green on CI
- Section is visible on Vercel preview URL
- Scramble-text, photo strip, and both tickers are animated in the refactor pass

---

## Animation References

- Scramble text: custom `useAnimate` + character cycling
- Horizontal ticker: CSS marquee + `motion.div` pause-on-hover
- Vertical photo strip: CSS `animation` with staggered column speeds + `motion.div`
- Reduced motion: wrap all animations in `useReducedMotion()` check from Framer Motion
