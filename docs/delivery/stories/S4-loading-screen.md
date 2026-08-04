# S4: Loading Screen

**Sprint:** Sprint 1  
**Priority:** P1 — Ships with the Hero section  
**Status:** `[ ] in progress` — RED phase active

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

- [x] Create `src/components/LoadingScreen/LoadingScreen.tsx` — stub component
- [x] Create `src/components/LoadingScreen/LoadingScreen.test.tsx` — 10 tests, 6 RED / 4 GREEN
- [ ] Implement exit logic in `LoadingScreen.tsx` — call `onExitComplete` after timeout/animation
- [ ] Implement reduced-motion fast-exit path
- [ ] Implement focus management — move focus to main content on exit
- [ ] Implement re-appearance prevention — track `hasExited` state
- [ ] Wire `LoadingScreen` into `src/app/page.tsx`

---

## Test Coverage

- **Vitest (`src/components/LoadingScreen/LoadingScreen.test.tsx`)** — 10 tests:
  - AC1 ✅ renders loading overlay on mount
  - AC1 ✅ has `role="status"` for screen readers
  - AC1 ✅ has accessible `aria-label`
  - AC3 🔴 calls `onExitComplete` after exit sequence
  - AC3 🔴 removes or hides element after exit
  - AC4 ✅ focus not trapped inside loader after exit
  - AC5 🔴 does not re-appear after initial exit
  - AC6 🔴 calls `onExitComplete` under reduced motion
  - AC6 🔴 exits faster/immediately under reduced motion
  - AC7 🔴 `onExitComplete` called within 3000ms
- **Playwright:** Covered indirectly by `hero.spec.ts` — hero content must be reachable after exit

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
