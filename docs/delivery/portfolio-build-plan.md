# Portfolio Build Plan

## Overview

**Goal:** Build and deploy a personal portfolio website as a single scrolling page with three
distinct sections, demonstrating AI-PDLC + TDD discipline as a real product delivery methodology.

**Layout:** One page, scroll-driven. No page navigation — all three sections are revealed by
scrolling. A nav bar provides anchor-link shortcuts to each section.

**Sections:**
1. **Identity / Hero** — photos ticker, name (scramble animation), degree, experience level,
   current job, tech stack icon ticker
2. **About + Work History** — typewriter bio, work history with scroll-pinned job cards
3. **Personal Projects** — mixed tech + non-tech project cards with scroll-triggered reveal

**Approach:** Every feature follows a strict red-green-refactor TDD loop. Playwright owns all
user-facing flows and accessibility. Vitest + React Testing Library owns component logic and
utilities. No production code is written before a failing test exists.

**Not in scope for v1:** Blog, dark/light mode toggle, filterable project gallery, testimonials,
analytics dashboard, internationalisation (deferred post-launch per PR-FAQ).

**Governing documents:**
- [`docs/discovery/OpA.md`](../discovery/OpA.md)
- [`docs/discovery/PR-FAQ.md`](../discovery/PR-FAQ.md)
- [`docs/decisions/ADR-001-tech-stack.md`](../decisions/ADR-001-tech-stack.md)
- [`docs/delivery/Epic-portfolio-v1.md`](./Epic-portfolio-v1.md)

---

## Site Structure

```
Single scrolling page
│
├── Loading Screen          ← full-screen line-reveal animation on first visit
│                             (Motion: line reveal — motion.dev/examples/vue-loading-line-reveal)
│
├── Section 1: Identity / Hero
│   ├── Horizontal tech stack icon ticker (above photo strip)
│   ├── 3-column vertical photo ticker (auto-scrolling, each column at different speed)
│   ├── Name overlay with scramble-text animation
│   ├── Degree, experience level (e.g. "Junior — 2+ years"), current job title
│   └── Horizontal tech stack icon ticker (below photo strip)
│
├── Section 2: About + Work History
│   ├── About Me — typewriter natural-typing animation
│   │             (Motion: react-typewriter-natural-typing)
│   └── Work History — scroll-pinned job cards (one job pinned at a time while scrolling)
│                       (Motion: js-scroll-pinning — motion.dev/examples/js-scroll-pinning)
│                       Each card: company logo/photo, job title, dates, description, link
│
└── Section 3: Personal Projects
    └── Project cards revealed one-by-one via scroll-triggered animation
        (Motion: react-scroll-triggered — motion.dev/examples/react-scroll-triggered)
        Each card: project name, photo/screenshot, short description,
                   tech used (if applicable), link (GitHub / live site / external)
        Tech and non-tech projects mixed in one list
```

---

## Animation Inventory

| Element | Animation | Motion reference |
|---------|-----------|-----------------|
| Loading screen | Full-screen line reveal, fades out before page shows | motion.dev/examples/vue-loading-line-reveal |
| Name text | Scramble-text (randomised chars resolve to final name) | Custom — `useAnimate` + character cycling |
| Photo strip | 3 vertical columns, continuous auto-scroll, staggered speeds | CSS `animation` + `motion.div` for pause-on-hover |
| Tech icon tickers (×2) | Horizontal infinite scroll loop, top and bottom of hero | CSS marquee pattern with `motion.div` |
| About Me text | Natural typewriter — characters appear with variable timing | motion.dev/examples/react-typewriter-natural-typing |
| Work history cards | Scroll pinning — each job card pins in place while user scrolls through its content | motion.dev/examples/js-scroll-pinning |
| Project cards | Scroll-triggered — each card animates in as it enters the viewport | motion.dev/examples/react-scroll-triggered |

> **TDD note:** Animation smoothness and visual quality are outside the test suite.
> What IS tested: elements exist in the DOM, text content is correct, links point to the right
> href, ARIA labels are present, keyboard navigation works. Animation is covered by design review.

---

## Folder Structure

```
ai-pdlc-tdd-portfolio/
├── docs/
│   ├── decisions/
│   │   ├── ADR-001-tech-stack.md
│   │   └── ADR-002-tech-spikes.md          ← written in Pre-Sprint
│   ├── discovery/
│   │   ├── OpA.md
│   │   └── PR-FAQ.md
│   └── delivery/
│       ├── Epic-portfolio-v1.md
│       ├── portfolio-build-plan.md          ← this file
│       └── stories/                         ← one file per user story
│           ├── S1-identity-hero.md
│           ├── S2-about-typewriter.md
│           ├── S3-work-history-pinned.md
│           └── S4-projects-scroll-reveal.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                       ← metadata, OG tags, loading screen
│   │   ├── page.tsx                         ← assembles all 3 sections
│   │   └── globals.css
│   ├── components/
│   │   ├── LoadingScreen/
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── LoadingScreen.test.tsx
│   │   ├── Hero/
│   │   │   ├── Hero.tsx                     ← Section 1 wrapper
│   │   │   ├── PhotoTicker.tsx              ← 3-col vertical scroll
│   │   │   ├── TechTicker.tsx               ← horizontal icon marquee (used ×2)
│   │   │   ├── ScrambleText.tsx             ← name scramble animation
│   │   │   └── Hero.test.tsx
│   │   ├── About/
│   │   │   ├── About.tsx                    ← Section 2 wrapper
│   │   │   ├── TypewriterText.tsx           ← bio typewriter
│   │   │   ├── WorkHistory.tsx              ← scroll-pinned job cards
│   │   │   ├── WorkCard.tsx                 ← single job card
│   │   │   └── About.test.tsx
│   │   └── Projects/
│   │       ├── Projects.tsx                 ← Section 3 wrapper
│   │       ├── ProjectCard.tsx              ← individual card with scroll trigger
│   │       └── Projects.test.tsx
│   └── lib/
│       ├── types.ts                         ← WorkEntry, Project types
│       └── data.ts                          ← work history + project content
├── tests/
│   └── e2e/
│       ├── hero.spec.ts
│       ├── about.spec.ts
│       ├── projects.spec.ts
│       └── accessibility.spec.ts
├── public/
│   ├── photos/                              ← ticker photos (optimised)
│   ├── logos/                              ← company logos for work cards
│   └── projects/                           ← project screenshots
├── .github/
│   └── workflows/
│       └── ci.yml
├── playwright.config.ts
├── vitest.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## TDD Workflow

### Tool Assignment

| Test type | Tool | Scope |
|-----------|------|-------|
| Section content present in DOM | Playwright | All 3 sections |
| Links point to correct href | Playwright | Work history, project cards, nav |
| Keyboard navigation + focus order | Playwright | Full page |
| ARIA labels, alt text | Playwright | All images, interactive elements |
| Component renders correct props | Vitest + RTL | PhotoTicker, TechTicker, WorkCard, ProjectCard, ScrambleText |
| Data types and utility functions | Vitest | `src/lib/types.ts`, `src/lib/data.ts` |
| Animation timing / visual smoothness | ❌ None | Covered by design review only |

### Red-Green-Refactor Loop

Every user story follows this exact sequence. No exceptions.

```
1. RED    — Write a failing Playwright spec (user flow) or Vitest test (component logic).
             Run it. It must fail for the right reason — missing element, wrong text,
             broken link. Not a syntax error.

2. GREEN  — Write the minimum implementation to make the test pass.
             No Tailwind styling. No Framer Motion. No polish.
             Commit: "feat: [story-id] green — [description]"

3. REFACTOR — Add Tailwind layout, Framer Motion animations, visual polish.
               Run full test suite. All tests must stay green.
               Commit: "refactor: [story-id] — [what changed]"
```

### Animation Spike Rule

All Framer Motion animation patterns (scroll-pinning, scroll-triggered, ticker, scramble,
typewriter, loading reveal) must be prototyped and confirmed working in a spike branch
**before** the corresponding story enters the TDD loop. Spike findings go in ADR-002.
This prevents the green phase being blocked by an unresolved animation API question.

### CI Gate

Every pull request must pass:
- `pnpm test` — Vitest unit + component tests
- `pnpm test:e2e` — Playwright E2E suite

No merge without green CI. Enforced via GitHub Actions `ci.yml`.

---

## Phased Delivery Plan

### Pre-Sprint: Unblock

**Goal:** Resolve all animation and compatibility unknowns before Sprint 1 begins.
No production code is written in this phase — only spikes, ADRs, stories, and content.

**Deliverables:**
- [ ] Tech spike: Tailwind CSS v4 + Next.js 15 App Router compatibility confirmed
- [ ] Animation spike: Framer Motion scroll-pinning (`useScroll` + `useTransform`) in App Router
- [ ] Animation spike: Framer Motion scroll-triggered card reveal in App Router
- [ ] Animation spike: Scramble-text effect using `useAnimate` character cycling
- [ ] Animation spike: Typewriter natural-typing pattern
- [ ] Animation spike: Loading screen line-reveal with exit transition
- [ ] Animation spike: Infinite horizontal ticker (marquee pattern)
- [ ] Animation spike: 3-column vertical auto-scroll photo strip
- [ ] Write ADR-002 documenting all spike findings (compatible / workarounds / rejected patterns)
- [ ] Gather and optimise all photos for the ticker (compressed, correct aspect ratio)
- [ ] Write project narratives for all personal projects (name, description, tech, link)
- [ ] Write work history entries (company, role, dates, description, logo, link)
- [ ] Write 4 User Story files in `docs/delivery/stories/`

**Exit criteria:** ADR-002 accepted. All animation patterns confirmed working. All content ready.

---

### Sprint 1: Foundation + Loading Screen + Hero

**Goal:** Scaffold the project, configure CI, build the loading screen and Section 1 end-to-end.

**Deliverables:**
- [ ] Project scaffolded: Next.js 15 App Router, TypeScript, Tailwind v4, pnpm
- [ ] Playwright and Vitest configured
- [ ] GitHub Actions `ci.yml` — Playwright + Vitest gate on every PR
- [ ] Vercel connected — preview deployments active on every push
- [ ] **Loading screen** — full-screen line-reveal, exits before page content shows
- [ ] **Section 1 — Identity / Hero:**
  - [ ] Horizontal tech stack icon ticker (above photo strip)
  - [ ] 3-column vertical photo ticker (auto-scroll, staggered column speeds)
  - [ ] Name with scramble-text animation
  - [ ] Degree, experience level ("Junior — 2+ years"), current job title
  - [ ] Horizontal tech stack icon ticker (below photo strip)
- [ ] `hero.spec.ts` green on CI
- [ ] Lighthouse baseline score recorded

**TDD sequence for Hero:**
1. Write `hero.spec.ts` — assert name, degree, experience, job title present in DOM
2. Write `Hero.test.tsx` — assert sub-components render correct props
3. GREEN — minimum markup, no animation
4. REFACTOR — add Tailwind layout, then Framer Motion animations one-by-one

**Exit criteria:** All Sprint 1 tests green on CI. Section 1 visible on Vercel preview URL.

---

### Sprint 2: About + Work History

**Goal:** Build Section 2 with typewriter bio and scroll-pinned work history cards.

**Deliverables:**
- [ ] **About Me text** — typewriter natural-typing animation
- [ ] **Work history** — scroll-pinned cards (one job pinned while user scrolls through it)
  - [ ] Each card: company logo, job title, date range, description, company link
  - [ ] All work history entries from `src/lib/data.ts`
- [ ] `about.spec.ts` green — bio text present, all work entries in DOM, links correct
- [ ] `WorkCard.test.tsx` green — component renders all props correctly
- [ ] `About.test.tsx` green

**TDD sequence:**
1. Write `about.spec.ts` — assert bio text container present, work cards visible, each has
   company name, title, dates, and a link
2. Write `WorkCard.test.tsx` and `About.test.tsx`
3. GREEN — minimum markup
4. REFACTOR — typewriter animation on bio, scroll-pinning on work cards

**Exit criteria:** All Sprint 2 tests green on CI. Section 2 visible on Vercel preview URL.

---

### Sprint 3: Personal Projects

**Goal:** Build Section 3 with scroll-triggered project card reveal, tech and non-tech mixed.

**Deliverables:**
- [ ] **Project cards** — one card per project, revealed via scroll-triggered animation
  - [ ] Each card: project name, photo/screenshot, description, tech (if applicable), link
  - [ ] Tech and non-tech projects in one mixed list
- [ ] `projects.spec.ts` green — all project cards in DOM, each has name, description, link
- [ ] `ProjectCard.test.tsx` green — component renders all props

**TDD sequence:**
1. Write `projects.spec.ts` — assert all project cards present, each has name and a link
2. Write `ProjectCard.test.tsx`
3. GREEN — minimum markup, data from `src/lib/data.ts`
4. REFACTOR — scroll-triggered entrance animation per card

**Exit criteria:** All Sprint 3 tests green on CI. Section 3 visible on Vercel preview URL.

---

### Sprint 4: Accessibility, Polish, and Launch

**Goal:** Meet all NFRs, pass accessibility audit, ship to production.

**Deliverables:**

**Accessibility (WCAG 2.2 AA):**
- [ ] `accessibility.spec.ts` — keyboard Tab through all interactive elements
- [ ] All photos have `alt` text describing the image
- [ ] All links have descriptive text or `aria-label`
- [ ] Focus indicators visible on all interactive elements
- [ ] Colour contrast passes WCAG AA (4.5:1 body text, 3:1 large text)
- [ ] Lighthouse accessibility ≥ 95 on mobile and desktop

**Performance:**
- [ ] Framer Motion loaded via `dynamic()` to protect initial bundle
- [ ] All photos served via `next/image` with correct `sizes` and `priority`
- [ ] Vercel deployment configured (standard Next.js runtime — no static export)
- [ ] FCP < 1.5s on simulated 4G (Lighthouse)
- [ ] Lighthouse performance ≥ 90 (mobile and desktop)

**SEO:**
- [ ] `<title>`, `<meta description>`, Open Graph tags in `layout.tsx`
- [ ] Canonical URL set

**Mobile responsiveness:**
- [ ] Manual walkthrough at 375px (iPhone SE), 768px (tablet), 1440px (desktop)
- [ ] Ticker and pinning patterns work correctly at all breakpoints

**Launch:**
- [ ] All Playwright + Vitest tests green on `main`
- [ ] Custom domain configured (or vercel.app URL confirmed)
- [ ] Production deployment from `main`
- [ ] README updated with live URL, methodology callout, test coverage badge
- [ ] Repository made public

**Exit criteria:** Lighthouse ≥ 90 performance, ≥ 95 accessibility. All CI gates green. Site live.

---

### Post-Launch: Growth Phase

**Goal:** Measure whether the site achieves its success metrics before adding any new features.

**Deliverables:**
- [ ] Vercel Analytics enabled (privacy-friendly, no cookie banner required)
- [ ] 30-day check: ≥ 1 inbound contact from recruiter, client, or collaborator
- [ ] 90-day check: ≥ 5 GitHub stars/forks
- [ ] Identify top-performing section by scroll depth
- [ ] Decide v2 scope based on observed gaps (dark mode, project filter, blog, etc.)

---

## First 3 Concrete Actions After Plan Approval

**Action 1 — Run all animation spikes and write ADR-002**

Create a branch `spike/animations`. In a minimal Next.js 15 + Framer Motion app, prototype
all 8 animation patterns listed in the Pre-Sprint phase. Confirm each one works in the
App Router with `'use client'`. Record any workarounds. Write ADR-002.
This is the most critical unblocking step — Sprint 1 cannot begin safely without it.

**Action 2 — Gather and write all content**

Collect and compress all photos for the ticker. Write work history entries (company, role,
dates, description, link). Write all personal project entries (name, photo, description,
tech, link). Save everything to `src/lib/data.ts` as typed data. This is a content dependency
for every section — it must exist before any component is built.

**Action 3 — Scaffold the project and write the first failing test**

Run `pnpm create next-app`, configure Playwright + Vitest, create `ci.yml`, connect to Vercel.
Write the first failing `hero.spec.ts` — assert name, degree, experience, and job title appear
in the DOM. This is the official RED phase start. Sprint 1 is live.

---

## Sub-Tasks for Implementation

Each sub-task is designed to be processed independently in Agent mode, one at a time.

---

### Sub-Task 1: Write ADR-002 (Animation + Compatibility Spikes)

**Status:** `[ ] pending`

**Intent:** Validate all animation patterns and tech compatibility before any production code
is written. Every unresolved spike is a Sprint 1 blocker.

**Expected Outcomes:**
- `docs/decisions/ADR-002-tech-spikes.md` exists and is accepted
- All 8 animation patterns confirmed working (or alternatives documented)
- Tailwind v4 + Next.js 15 App Router compatibility confirmed

**Todo List:**
1. Create branch `spike/animations`
2. Scaffold minimal Next.js 15 + Tailwind v4 + Framer Motion app with pnpm
3. Prototype each animation: scroll-pinning, scroll-triggered reveal, scramble-text,
   typewriter, loading line-reveal, horizontal ticker, 3-col vertical photo ticker
4. Record any `'use client'` requirements, workarounds, or fallbacks
5. Write `docs/decisions/ADR-002-tech-spikes.md` following ADR-001 format
6. Check off blocking items in `Epic-portfolio-v1.md`

**Relevant Context:**
- [`docs/decisions/ADR-001-tech-stack.md`](../decisions/ADR-001-tech-stack.md) — format to follow
- Animation references: motion.dev/examples/js-scroll-pinning,
  motion.dev/examples/react-scroll-triggered,
  motion.dev/examples/vue-loading-line-reveal,
  motion.dev/examples/react-typewriter-natural-typing

---

### Sub-Task 2: Write User Story Files + Populate Content Data

**Status:** `[ ] pending`

**Intent:** Create the 4 story files with testable acceptance criteria, and populate
`src/lib/data.ts` with all work history and project content so no component is blocked
waiting for data.

**Expected Outcomes:**
- 4 story files in `docs/delivery/stories/` with acceptance criteria and test file mappings
- `src/lib/types.ts` — `WorkEntry` and `Project` types defined
- `src/lib/data.ts` — all work entries and project entries populated
- All photos collected and placed in `public/photos/`, `public/logos/`, `public/projects/`

**Todo List:**
1. Write `docs/delivery/stories/S1-identity-hero.md`
2. Write `docs/delivery/stories/S2-about-typewriter.md`
3. Write `docs/delivery/stories/S3-work-history-pinned.md`
4. Write `docs/delivery/stories/S4-projects-scroll-reveal.md`
5. Define `WorkEntry` and `Project` types in `src/lib/types.ts`
6. Populate `src/lib/data.ts` with all real work history and project content
7. Optimise and place all photos in `public/`

**Relevant Context:**
- [`docs/delivery/Epic-portfolio-v1.md`](./Epic-portfolio-v1.md) — persona requirements

---

### Sub-Task 3: Scaffold Project + Configure CI

**Status:** `[ ] pending`

**Intent:** Create the full application scaffolding and wire up GitHub Actions CI so every
PR is gated on passing tests.

**Expected Outcomes:**
- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts` at root
- `playwright.config.ts` and `vitest.config.ts` configured
- `.github/workflows/ci.yml` runs `pnpm test` and `pnpm test:e2e` on every PR
- Vercel preview deployments active on push
- `pnpm dev` runs without errors

**Todo List:**
1. Run `pnpm create next-app@latest` with App Router, TypeScript, Tailwind, `src/` dir
2. Install Playwright: `pnpm dlx playwright install`
3. Install Vitest + RTL: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
4. Configure `vitest.config.ts` with jsdom environment
5. Configure `playwright.config.ts` — base URL, Chromium + Firefox + WebKit, reporter
6. Write `.github/workflows/ci.yml` — install deps, lint, `pnpm test`, `pnpm test:e2e`
7. Connect repo to Vercel via `vercel link` (standard Next.js runtime — no `output: 'export'`)
8. Confirm `pnpm build` succeeds

**Relevant Context:**
- [`docs/decisions/ADR-001-tech-stack.md`](../decisions/ADR-001-tech-stack.md) — exact versions

---

### Sub-Task 4: Loading Screen (TDD)

**Status:** `[ ] pending`

**Intent:** Build the loading screen that appears on first visit and exits via a line-reveal
animation before the main page content is shown.

**Expected Outcomes:**
- `LoadingScreen.test.tsx` green — component renders, disappears after animation completes
- Loading screen exits cleanly and page content is accessible after exit
- No accessibility trap (focus must not be stuck in loading screen after exit)

**Todo List:**
1. Write `LoadingScreen.test.tsx` — assert loading element present on mount, gone after exit
2. RED → GREEN (minimum — renders and disappears after timeout)
3. REFACTOR — add Framer Motion line-reveal animation, exit transition
4. Verify keyboard focus moves to page content after loading screen exits

**Relevant Context:**
- ADR-002 spike findings for loading screen pattern

---

### Sub-Task 5: Section 1 — Identity / Hero (TDD)

**Status:** `[ ] pending`

**Intent:** Build the full Hero section: photo tickers, tech icon tickers, scramble-text name,
identity details. This is the first impression for every visitor.

**Expected Outcomes:**
- `hero.spec.ts` green — name, degree, experience level, job title present in DOM
- `Hero.test.tsx`, `PhotoTicker.test.tsx`, `TechTicker.test.tsx`, `ScrambleText.test.tsx` green
- All animations wired (scramble, ticker, photo strip) — suite remains green

**Todo List:**
1. Write `hero.spec.ts` — assert name, degree, experience, job title in DOM; tech icons present
2. Write component unit tests for `PhotoTicker`, `TechTicker`, `ScrambleText`
3. RED → GREEN for each component (minimum markup from `data.ts`)
4. Assemble in `Hero.tsx`, wire into `page.tsx`
5. REFACTOR — scramble-text on name, horizontal ticker on tech icons (×2), 3-col photo strip

**Relevant Context:**
- Story `docs/delivery/stories/S1-identity-hero.md`
- `src/lib/data.ts` — tech stack icons, photo paths
- ADR-002 spike findings for ticker and scramble patterns

---

### Sub-Task 6: Section 2 — About + Work History (TDD)

**Status:** `[ ] pending`

**Intent:** Build the About section with typewriter bio and scroll-pinned work history cards.

**Expected Outcomes:**
- `about.spec.ts` green — bio text container present, all work cards in DOM, each has
  company name, title, dates, and a working link
- `WorkCard.test.tsx` and `About.test.tsx` green
- Scroll-pinning animation wired — suite stays green

**Todo List:**
1. Write `about.spec.ts` — assert bio element, all work entries, links
2. Write `WorkCard.test.tsx` — assert all props render (company, title, dates, link)
3. RED → GREEN for `WorkCard`, `WorkHistory`, `TypewriterText`, `About`
4. Wire into `page.tsx`
5. REFACTOR — typewriter on bio text, scroll-pinning on work cards

**Relevant Context:**
- Stories `S2-about-typewriter.md`, `S3-work-history-pinned.md`
- `src/lib/data.ts` — work history entries
- ADR-002 spike findings for scroll-pinning and typewriter patterns

---

### Sub-Task 7: Section 3 — Personal Projects (TDD)

**Status:** `[ ] pending`

**Intent:** Build the Projects section with scroll-triggered card reveal for all tech and
non-tech personal projects.

**Expected Outcomes:**
- `projects.spec.ts` green — all project cards in DOM, each has name, description, and a link
- `ProjectCard.test.tsx` green — all props render correctly
- Scroll-triggered animation wired — suite stays green

**Todo List:**
1. Write `projects.spec.ts` — assert all project cards present, each has name and link
2. Write `ProjectCard.test.tsx` — assert name, description, tech (optional), link render
3. RED → GREEN — render all projects from `data.ts`
4. Wire into `page.tsx`
5. REFACTOR — scroll-triggered entrance animation per card (staggered)

**Relevant Context:**
- Story `docs/delivery/stories/S4-projects-scroll-reveal.md`
- `src/lib/data.ts` — project entries
- ADR-002 spike findings for scroll-triggered pattern

---

### Sub-Task 8: Accessibility Audit + NFR Pass

**Status:** `[ ] pending`

**Intent:** Verify WCAG 2.2 AA compliance and confirm all NFR targets (performance,
accessibility, SEO) are met before launch.

**Expected Outcomes:**
- `accessibility.spec.ts` green — Tab order moves through all interactive elements correctly
- All images have `alt` text; all links have descriptive labels
- Lighthouse accessibility ≥ 95 (mobile + desktop)
- Lighthouse performance ≥ 90 (mobile + desktop), FCP < 1.5s
- Open Graph + meta description in `layout.tsx`

**Todo List:**
1. Write `accessibility.spec.ts` — Tab through nav, work links, project links; assert focus order
2. Audit all `<img>` for `alt`, all `<a>` for descriptive text or `aria-label`
3. Run Lighthouse — fix any accessibility failures
4. Confirm Framer Motion loaded via `dynamic()` (bundle protection)
5. Confirm all photos use `next/image` with `sizes` and `priority`
6. Add OG tags and meta description to `layout.tsx`
7. Run Lighthouse again — confirm ≥ 90 / ≥ 95

**Relevant Context:**
- NFRs in [`docs/delivery/Epic-portfolio-v1.md`](./Epic-portfolio-v1.md)

---

### Sub-Task 9: Launch

**Status:** `[ ] pending`

**Intent:** Ship the site to production and make the repository public.

**Expected Outcomes:**
- Site live on production URL
- Repository public with live URL in README
- All CI gates green on `main`

**Todo List:**
1. Merge all Sprint 4 PRs — confirm `main` CI green
2. Configure domain in Vercel (custom or vercel.app)
3. Trigger production deployment
4. Update README — live URL, methodology callout, test coverage badge
5. Make repository public
6. Manual verification at 375px, 768px, 1440px on production URL
7. Record final Lighthouse scores

**Relevant Context:**
- Success metrics in [`docs/discovery/PR-FAQ.md`](../discovery/PR-FAQ.md)
