# S0: Framework Setup + Hosting

**Sprint:** Sprint 1  
**Priority:** P0 — Blocker. Nothing else can be built until this is done.  
**Status:** `[x] complete`

---

## Story

**As a** developer,  
**I want** a fully scaffolded Next.js project with CI and Vercel hosting configured,  
**so that** every subsequent feature can be built, tested, and previewed in a real deployment environment from day one.

---

## Acceptance Criteria

1. [x] Running `pnpm install` succeeds with no errors.
2. [x] Running `pnpm dev` starts the local dev server and the default Next.js page loads at `http://localhost:3000`.
3. [x] Running `pnpm build` completes without errors (standard Next.js runtime — no static export).
4. [x] Running `pnpm test` executes the Vitest suite and exits with no failures — 4/4 passing.
5. [x] Running `pnpm test:e2e` executes the Playwright suite and exits with no failures.
6. [x] GitHub Actions CI workflow triggers on push to `main` and runs `pnpm test` and `pnpm test:e2e` — green.
7. [x] Pushing to any branch generates a unique Vercel preview URL automatically — live at `https://ai-pdlc-tdd-portfolio-5n9pobmme-dellaringa.vercel.app`.
8. [x] Repository folder structure matches the layout defined in `docs/delivery/portfolio-build-plan.md`.
9. [x] TypeScript strict mode is enabled (`strict: true` in `tsconfig.json`) — verified by automated test.
10. [x] Tailwind CSS v4 utility classes apply correctly — verified visually in dev.
11. [x] Framer Motion 12.x installed and `motion.div` renders without runtime error — verified by automated test.

---

## Tasks

- [x] Run `pnpm create next-app@latest` — App Router, TypeScript, Tailwind, `src/` directory
- [x] Install Framer Motion: `pnpm add framer-motion`
- [x] Install Playwright: `pnpm add -D @playwright/test` + `pnpm dlx playwright install`
- [x] Install Vitest + RTL: `pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`
- [x] Create `vitest.config.ts` with jsdom environment and RTL setup file
- [x] Create `playwright.config.ts` — base URL `http://127.0.0.1:3000`, Chromium + Firefox + WebKit
- [x] Add `test`, `test:watch`, and `test:e2e` scripts to `package.json`
- [x] Create `.github/workflows/ci.yml` — install, `pnpm test`, `pnpm test:e2e` on push/pull_request to `main`
- [x] Fix CI Node version to 22 — pnpm 11 requires Node ≥ 22.13
- [x] Create folder structure: `src/components/`, `src/lib/`, `tests/e2e/`, `public/photos/`, `public/logos/`, `public/projects/`
- [x] Connect repo to Vercel via dashboard — preview deployments active
- [x] Verify `pnpm build` passes — confirmed clean

---

## Test Coverage

- **Vitest (`src/lib/tsconfig.test.ts`)** — AC9:
  - Assert `tsconfig.json` exists at the project root
  - Assert `compilerOptions.strict` is `true`
- **Vitest (`src/components/MotionSmokeTest/MotionSmokeTest.test.tsx`)** — AC11:
  - Assert `motion.div` renders without throwing a runtime error
  - Assert the rendered element is present in the DOM
- **Playwright:** No E2E tests yet — verified by `pnpm test:e2e` exiting cleanly on an empty suite
- **CI:** GitHub Actions workflow run must be green on the setup PR

---

## Definition of Done

- [x] `main` branch CI is green
- [x] Vercel preview URL is generated on push — `https://ai-pdlc-tdd-portfolio-5n9pobmme-dellaringa.vercel.app`
- [x] Repo cloneable — `pnpm install && pnpm dev` runs cleanly

---

## Notes

- Do **not** set `output: 'export'` in `next.config.ts` — this site uses the standard Next.js runtime on Vercel
- pnpm only — do not run `npm install` or `yarn` at any point
- TypeScript strict mode is non-negotiable per ADR-001
