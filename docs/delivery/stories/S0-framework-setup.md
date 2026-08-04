# S0: Framework Setup + Hosting

**Sprint:** Sprint 1  
**Priority:** P0 — Blocker. Nothing else can be built until this is done.  
**Status:** `[ ] in progress`

---

## Story

**As a** developer,  
**I want** a fully scaffolded Next.js project with CI and Vercel hosting configured,  
**so that** every subsequent feature can be built, tested, and previewed in a real deployment environment from day one.

---

## Acceptance Criteria

1. Running `pnpm install` succeeds with no errors.
2. Running `pnpm dev` starts the local dev server and the default Next.js page loads at `http://localhost:3000`.
3. Running `pnpm build` completes without errors (standard Next.js runtime — no static export).
4. Running `pnpm test` executes the Vitest suite and exits with no failures (empty suite passes).
5. Running `pnpm test:e2e` executes the Playwright suite and exits with no failures (empty suite passes).
6. A pull request to `main` triggers the GitHub Actions CI workflow, which runs `pnpm test` and `pnpm test:e2e` — both must pass before merge is allowed.
7. Pushing to any branch (or opening a PR) generates a unique Vercel preview URL automatically.
8. The repository folder structure matches the layout defined in `docs/delivery/portfolio-build-plan.md`.
9. TypeScript strict mode is enabled (`strict: true` in `tsconfig.json`). No type errors on a clean build.
10. Tailwind CSS v4 utility classes apply correctly to a test element (verified visually in dev).
11. Framer Motion 11.x is installed and a `motion.div` renders without runtime error in a `'use client'` component.

---

## Tasks

- [ ] Run `pnpm create next-app@latest` — App Router, TypeScript, Tailwind, `src/` directory
- [ ] Install Framer Motion: `pnpm add framer-motion`
- [ ] Install Playwright: `pnpm add -D @playwright/test` + `pnpm dlx playwright install`
- [ ] Install Vitest + RTL: `pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`
- [ ] Create `vitest.config.ts` with jsdom environment and RTL setup file
- [ ] Create `playwright.config.ts` — base URL `http://localhost:3000`, Chromium + Firefox + WebKit
- [ ] Add `test` and `test:e2e` scripts to `package.json`
- [ ] Create `.github/workflows/ci.yml` — install, `pnpm test`, `pnpm test:e2e` on pull_request to `main`
- [ ] Create folder structure: `src/components/`, `src/lib/`, `tests/e2e/`, `public/photos/`, `public/logos/`, `public/projects/`
- [ ] Connect repo to Vercel via `vercel link` or Vercel dashboard — enable preview deployments
- [ ] Verify `pnpm build` passes on Vercel

---

## Test Coverage

- **Vitest:** No unit tests for scaffolding itself — verified by `pnpm build` passing clean
- **Playwright:** No E2E tests yet — verified by `pnpm test:e2e` exiting cleanly on an empty suite
- **CI:** GitHub Actions workflow run must be green on the setup PR

---

## Definition of Done

- `main` branch CI is green
- Vercel preview URL is generated on a test push
- A teammate (or you, acting as reviewer) can clone the repo, run `pnpm install && pnpm dev`, and see the app running locally

---

## Notes

- Do **not** set `output: 'export'` in `next.config.ts` — this site uses the standard Next.js runtime on Vercel
- pnpm only — do not run `npm install` or `yarn` at any point
- TypeScript strict mode is non-negotiable per ADR-001
