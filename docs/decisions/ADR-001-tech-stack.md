# ADR-001: Tech Stack Selection

**Status:** Accepted  
**Date:** 2025-06-10  
**Project:** Personal Portfolio Website (AI-PDLC + TDD)

---

## Context

We are building a personal portfolio website treated as a corporate-style delivery using the AI-PDLC methodology and Test-Driven Development. Before beginning the Discovery phase, a foundational tech stack decision was required.

The selection criteria were:

- **Rich UI** — smooth animations, scroll-triggered effects, fade-ins, and micro-interactions targeting Linear.app / Stripe-level visual polish
- **Developer experience** — fast hot reload, component-based architecture
- **TDD-friendly** — compatible with Playwright for E2E tests and a unit testing framework
- **Static deployment** — hosted on Vercel or GitHub Pages with no backend required
- **Developer level** — intermediate, willing to learn and challenge existing knowledge

---

## Decision

We will use the following stack:

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Animation | Framer Motion | 11.x |
| CSS | Tailwind CSS | 4.x |
| E2E Testing | Playwright | latest |
| Unit Testing | Vitest + React Testing Library | latest |
| Deployment | Vercel | — |
| Package Manager | pnpm | 9.x |

---

## Alternatives Considered

### Primary Framework

| Framework | Animation-Friendly | TDD / Playwright | Static Export | DX & Hot Reload | Learning Curve |
|---|---|---|---|---|---|
| **Next.js 15 (App Router)** ✅ | Excellent | First-class | `output: export` flag | Turbopack | Medium |
| Astro 5 | Good (islands only) | Good | Native | Very fast | Medium-High |
| Vite + React 19 | Excellent | Good | Native | Fastest | Low-Medium |
| Remix | Good | Good | Requires server | Good | High |

Next.js 15 was chosen for its ecosystem maturity, zero-friction Vercel deployment, and room to grow into more advanced patterns.

---

### Animation Library

| Library | Best For | Complexity | Bundle Size |
|---|---|---|---|
| **Framer Motion** ✅ | Component animations, layout transitions, scroll effects | Low-Medium | ~45kb gzip |
| GSAP | Timeline animations, SVG, ultra-precise sequencing | Medium-High | ~30kb core |
| Motion One | Lightweight CSS-based animations | Low | ~3kb |
| React Spring | Physics-based animations | Medium | ~25kb |
| CSS `@keyframes` | Simple fades, hover states | Very Low | 0kb |

Framer Motion was chosen because it is purpose-built for React, uses a declarative API consistent with React's mental model, and handles scroll-triggered animations, layout animations, and page transitions out of the box. GSAP remains an option for future timeline-sequenced or SVG path animations.

---

### CSS Approach

| Approach | Animation Integration | Component Scoping | Design System Ready | Learning Curve |
|---|---|---|---|---|
| **Tailwind CSS v4** ✅ | Utility classes + arbitrary values | Global (no scoping) | Excellent token system | Low |
| CSS Modules | Full control | Scoped by default | Manual | Medium |
| Vanilla CSS + Custom Properties | Full control | Global | Manual | Low |
| styled-components | Good | Scoped | Good | Medium |

Tailwind CSS v4 was chosen for its speed of iteration, responsive utilities, and clean pairing with Framer Motion (Framer owns motion; Tailwind owns layout/spacing/color).

---

## Consequences

### Known Tradeoffs

| Tradeoff | Detail |
|---|---|
| **Next.js App Router learning curve** | `use client` vs server component distinction will require care — Framer Motion components must be client components |
| **Framer Motion bundle size** | ~45kb gzip is non-trivial for a static portfolio; mitigate with dynamic imports where Lighthouse score matters |
| **Tailwind v4 maturity** | Released early 2025; most online tutorials reference v3 syntax — always consult the v4 docs directly |
| **pnpm discipline** | Mixing npm and pnpm will cause lockfile conflicts — pnpm is the only package manager to be used on this project |
| **TDD coverage limits on animations** | Unit and E2E tests cover component logic and user flows; visual smoothness of animations cannot be meaningfully asserted in tests and is accepted as outside test coverage |

### Positive Outcomes Expected

- Full TypeScript type safety across framework, animation, and CSS layers
- Playwright-compatible component rendering with no special configuration
- Vercel preview URLs enable CI-based E2E test runs on every pull request
- Declarative Framer Motion API reduces animation complexity for an intermediate developer
- Tailwind v4 utility classes accelerate visual iteration without context-switching to separate style files

---

## References

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Playwright Docs](https://playwright.dev)
- [Vitest Docs](https://vitest.dev)
- [pnpm Docs](https://pnpm.io)
