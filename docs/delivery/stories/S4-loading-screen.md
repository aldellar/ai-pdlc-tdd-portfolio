# S4: Loading Screen

**Sprint:** Sprint 1  
**Priority:** P1 — Ships with the Hero section  
**Status:** `[ ] pending` — blocked by S0

---

## Story

**As a** first-time visitor,  
**I want** to see a polished loading screen when the site first loads,  
**so that** the experience feels considered and intentional rather than a blank page flash.

---

## Acceptance Criteria

1. A full-screen loading overlay is displayed immediately when the page is first visited.
2. The loading screen plays a line-reveal animation.
3. After the animation completes, the loading screen exits and the main page content becomes visible and accessible.
4. The loading screen does not block keyboard focus after it exits — focus moves to the main page content.
5. The loading screen does not re-appear on subsequent section scrolls or navigation within the page.
6. If `prefers-reduced-motion` is enabled, the loading screen still exits cleanly but without the animation.
7. The loading screen exit completes within 3 seconds on a standard connection.

---

## Tasks

- [ ] Create `src/components/LoadingScreen/LoadingScreen.tsx`
- [ ] Create `src/components/LoadingScreen/LoadingScreen.test.tsx` (Vitest)
- [ ] Wire `LoadingScreen` into `src/app/layout.tsx` or `src/app/page.tsx`
- [ ] Ensure focus is returned to main content after exit (accessibility requirement)
- [ ] Test exit timing — must complete within 3 seconds

---

## Test Coverage

- **Vitest (`src/components/LoadingScreen/LoadingScreen.test.tsx`):**
  - Assert loading screen element is present in the DOM on initial render
  - Assert loading screen element is removed from the DOM (or hidden) after exit callback fires
  - Assert main page content is accessible after exit
- **Playwright:** Covered indirectly — `hero.spec.ts` assertions must pass after loading screen exits (the hero content must be reachable)

---

## Definition of Done

- `LoadingScreen.test.tsx` is green on CI
- Loading screen appears and exits cleanly on Vercel preview URL
- Hero content is accessible via keyboard after loading screen exits

---

## Animation References

- Line reveal: motion.dev/examples/vue-loading-line-reveal (adapt to React/Framer Motion)
- Exit transition: `AnimatePresence` + `exit` prop on the loading screen `motion.div`
- Reduced motion: check `useReducedMotion()` — skip animation but still exit cleanly
