# S3: Personal Projects Section

**Sprint:** Sprint 3  
**Priority:** P1  
**Status:** `[ ] pending` — blocked by S0, S1, S2

---

## Story

**As a** recruiter, client, or peer developer,  
**I want** to browse Drew's personal projects (both technical and non-technical) with a clear name, description, and link for each,  
**so that** I can get a sense of his range, interests, and initiative outside of formal work.

---

## Acceptance Criteria

1. At least one project card is visible on the page.
2. Each project card displays: project name, a photo or screenshot, a short description, and a link.
3. Tech projects also display the technologies used (e.g. "React, TypeScript, Vercel").
4. Non-tech projects display without a tech stack label — the field is optional.
5. All project cards are in a single mixed list (tech and non-tech are not separated into groups).
6. Each project card animates into view as it enters the viewport (scroll-triggered reveal).
7. Cards are staggered — each card animates in slightly after the previous one.
8. All project photos/screenshots have descriptive `alt` text.
9. All project links open in a new tab with `rel="noopener noreferrer"`.
10. The section is fully usable on 375px, 768px, and 1440px viewports.
11. Animations respect `prefers-reduced-motion`.

---

## Tasks

- [ ] Write all project entries in `src/lib/data.ts` (name, photo path, description, tech array or null, URL)
- [ ] Add project screenshots/photos to `public/projects/`
- [ ] Create `src/components/Projects/ProjectCard.tsx` — individual card
- [ ] Create `src/components/Projects/Projects.tsx` — section wrapper with staggered scroll-trigger
- [ ] Wire `Projects` into `src/app/page.tsx`
- [ ] Write `src/components/Projects/Projects.test.tsx` (Vitest)
- [ ] Write `tests/e2e/projects.spec.ts` (Playwright)

---

## Test Coverage

- **Playwright (`tests/e2e/projects.spec.ts`):**
  - Assert all project card names are present in the DOM
  - Assert all project card descriptions are present
  - Assert all project cards have a link with a valid `href`
  - Assert all project photos have `alt` text
  - Assert tech stack text is present for tech projects
- **Vitest (`src/components/Projects/Projects.test.tsx`):**
  - Assert `ProjectCard` renders name, description, and link from props
  - Assert `ProjectCard` renders tech stack when provided
  - Assert `ProjectCard` does not render a tech stack label when `tech` is null/undefined
  - Assert `ProjectCard` link has `target="_blank"` and `rel="noopener noreferrer"`

---

## Definition of Done

- `projects.spec.ts` is green on CI
- `Projects.test.tsx` is green on CI
- All project cards visible on Vercel preview URL
- Scroll-triggered staggered entrance animation wired in refactor pass

---

## Content Dependency

All project entries (name, photo, description, tech or null, URL) must be written in
`src/lib/data.ts` **before** this story enters the TDD loop.

---

## Animation References

- Scroll-triggered reveal: motion.dev/examples/react-scroll-triggered
- Staggered cards: Framer Motion `staggerChildren` on the container `variants`
- Reduced motion: wrap all animations in `useReducedMotion()` check
