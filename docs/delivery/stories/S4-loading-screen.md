# S4: Loading Screen

**Sprint:** Sprint 1
**Priority:** P1 — Ships with the Hero section
**Status:** `[x] complete` — 10/10 tests green, full animation implemented, lint clean

---

## Story

**As a** first-time visitor,  
**I want** to see a polished loading screen when the site first loads,  
**so that** the experience feels considered and intentional rather than a blank page flash.

---

## Acceptance Criteria

1. [x] A full-screen loading overlay is displayed immediately when the page is first visited.
2. [x] The loading screen plays a line-reveal animation — horizontal line sweeps left-to-right, overlay slides up off-screen via AnimatePresence.
3. [x] After the animation completes, the loading screen exits and the main page content becomes visible and accessible.
4. [x] The loading screen does not block keyboard focus after it exits — focus moves to the main page content.
5. [x] The loading screen does not re-appear on subsequent section scrolls or navigation within the page.
6. [x] If `prefers-reduced-motion` is enabled, the loading screen still exits cleanly but without the animation.
7. [x] The loading screen exit completes within 3 seconds on a standard connection.

---

## Tasks

- [x] Create `src/components/LoadingScreen/LoadingScreen.tsx` — stub component
- [x] Create `src/components/LoadingScreen/LoadingScreen.test.tsx` — 10 tests written
- [x] Implement exit logic — `onExitComplete` called after 1800ms timeout
- [x] Implement reduced-motion fast-exit path — exits on next tick when `prefers-reduced-motion: reduce`
- [x] Implement focus management — no focusable children, focus never trapped
- [x] Implement re-appearance prevention — `hasExited` ref prevents re-show on re-render
- [x] Wire `LoadingScreen` into `src/app/page.tsx` — completed in S1 integration
- [x] Fix lint warnings — removed unused `act` and `getByRole` in test file
- [x] REFACTOR: Framer Motion line-reveal bar (`scaleX` 0→1) + `AnimatePresence` overlay slides up (`y: '-100%'`) on exit
- [x] Split reduced-motion detection — `window.matchMedia` for timing, `useReducedMotion()` for animation variants

---

## Test Coverage

- **Vitest (`src/components/LoadingScreen/LoadingScreen.test.tsx`)** — 10 tests, all ✅:
  - AC1 ✅ renders loading overlay on mount
  - AC1 ✅ has `role="status"` for screen readers
  - AC1 ✅ has accessible `aria-label`
  - AC3 ✅ calls `onExitComplete` after exit sequence
  - AC3 ✅ removes or hides element after exit
  - AC4 ✅ focus not trapped inside loader after exit
  - AC5 ✅ does not re-appear after initial exit
  - AC6 ✅ calls `onExitComplete` under reduced motion
  - AC6 ✅ exits faster/immediately under reduced motion
  - AC7 ✅ `onExitComplete` called within 3000ms
- **Playwright:** Covered indirectly by `hero.spec.ts` — hero content must be reachable after exit

---

## Definition of Done

- [x] `LoadingScreen.test.tsx` is green — 10/10 passing
- [x] `LoadingScreen` wired into `src/app/page.tsx` — exits before Hero is shown
- [x] Hero content accessible after loading screen exits (no focus trap)
- [x] `pnpm lint` passes with zero errors and zero warnings
- [x] GitHub Actions CI green
- [x] Framer Motion line-reveal animation — implemented and all 10 tests green

---

## Animation References

- **Line reveal:** `motion.div` with `initial={{ scaleX: 0, originX: 0 }}` → `animate={{ scaleX: 1 }}`, `duration: 0.8s ease-in-out`
- **Exit transition:** `AnimatePresence` + `exit={{ y: '-100%' }}` on the overlay, `duration: 0.4s` cubic-bezier easing
- **Timing:** 900ms hold (line sweep plays) → `setVisible(false)` → AnimatePresence drives 400ms slide-up → `onExitComplete` fires (~1300ms total, well under 3000ms AC7 limit)
- **Reduced motion:** `window.matchMedia` for timing (0ms delay), `useReducedMotion()` for animation variant (`opacity: 0` fade instead of slide); line-reveal bar hidden entirely
