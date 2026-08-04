# S2: About Me + Work History Section

**Sprint:** Sprint 2  
**Priority:** P1  
**Status:** `[ ] pending` — blocked by S0, S1

---

## Story

**As a** hiring manager or recruiter,  
**I want** to read a short bio about Drew and see his work history with company details and links,  
**so that** I can assess his background, experience trajectory, and fit for a role.

---

## Acceptance Criteria

1. An "About Me" text block is visible on the page.
2. The About Me text animates in with a natural typewriter effect when the section scrolls into view.
3. At least one work history entry is visible on the page.
4. Each work history entry displays: company name, job title, date range, and a short description.
5. Each work history entry has a link to the company website (opens in a new tab).
6. Each work history entry displays a company logo or photo.
7. Work history cards use scroll-pinning — each card pins in place while the user scrolls through its content, then releases to the next.
8. All company logos have descriptive `alt` text.
9. All external links have `rel="noopener noreferrer"` and `target="_blank"`.
10. The section is fully readable and usable on 375px, 768px, and 1440px viewports.
11. Animations respect `prefers-reduced-motion`.

---

## Tasks

- [ ] Write work history entries in `src/lib/data.ts` (company, role, dates, description, logo path, URL)
- [ ] Add company logos to `public/logos/`
- [ ] Create `src/components/About/WorkCard.tsx` — single job entry card
- [ ] Create `src/components/About/WorkHistory.tsx` — scroll-pinned card list
- [ ] Create `src/components/About/TypewriterText.tsx` — natural typewriter animation
- [ ] Create `src/components/About/About.tsx` — section wrapper
- [ ] Wire `About` into `src/app/page.tsx`
- [ ] Write `src/components/About/About.test.tsx` (Vitest)
- [ ] Write `tests/e2e/about.spec.ts` (Playwright)

---

## Test Coverage

- **Playwright (`tests/e2e/about.spec.ts`):**
  - Assert About Me text container is present in the DOM
  - Assert all work entry company names are present
  - Assert all work entry job titles are present
  - Assert all work entry links are present and have a valid `href`
  - Assert all company logos have `alt` text
- **Vitest (`src/components/About/About.test.tsx`):**
  - Assert `WorkCard` renders company name, title, dates, description, and link from props
  - Assert `WorkCard` link has `target="_blank"` and `rel="noopener noreferrer"`
  - Assert `TypewriterText` renders the final text string in the DOM

---

## Definition of Done

- `about.spec.ts` is green on CI
- `About.test.tsx` is green on CI
- Section is visible on Vercel preview URL
- Typewriter animation on bio and scroll-pinning on work cards are wired in the refactor pass

---

## Content Dependency

All work history entries (company, role, dates, description, logo, URL) must be written in
`src/lib/data.ts` **before** this story enters the TDD loop. This is a hard content dependency.

---

## Animation References

- Typewriter: motion.dev/examples/react-typewriter-natural-typing
- Scroll pinning: motion.dev/examples/js-scroll-pinning
- Reduced motion: wrap all animations in `useReducedMotion()` check
