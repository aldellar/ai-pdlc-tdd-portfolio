# Epic: Personal Portfolio Website — v1

**Status:** Draft  
**Date:** 2025-06-10  
**Author:** Drew  
**Scope:** Small  
**Phase:** Delivery  
**References:** [OpA](../discovery/OpA.md) · [PR-FAQ](../discovery/PR-FAQ.md) · [ADR-001](../decisions/ADR-001-tech-stack.md)

---

## 1. Problem Statement

Recruiters, hiring managers, freelance clients, and peer developers have no single destination to quickly assess Drew's skills, experience, and engineering quality. Information is scattered across LinkedIn, GitHub, and résumés — none of which tell a cohesive story, demonstrate process discipline, or make it easy to take the next step. Drew needs a polished, publicly accessible portfolio website that answers each visitor's core question in a single visit, and whose build process itself serves as a live demonstration of structured engineering delivery.

---

## 2. Product Outcomes & Instrumentation

| Phase | Product Outcome (goal) | Metric (how measured) |
|---|---|---|
| **Launch (v1)** | Every primary persona completes their visit goal without friction | Manual usability walkthrough against each persona scenario before launch |
| **Launch (v1)** | Site meets performance bar | Lighthouse score ≥ 90 on mobile and desktop (Vercel CI) |
| **Launch (v1)** | Site meets accessibility bar | Lighthouse accessibility score ≥ 95 / WCAG 2.2 AA (Vercel CI) |
| **Launch (v1)** | Contact pathway is discoverable | Playwright E2E test — user can reach contact section from any page without navigating back to hero |
| **Post-launch (30 days)** | Portfolio generates inbound professional contact | ≥ 1 recruiter, client, or collaborator contact traceable to portfolio URL |
| **Post-launch (90 days)** | Repository demonstrates value to dev community | GitHub repo receives ≥ 5 stars or forks |

---

## 3. Assumptions

### Technology
- **Framework:** Next.js 15 (App Router) with `output: 'export'` for static deployment — see [ADR-001](../decisions/ADR-001-tech-stack.md)
- **Language:** TypeScript 5.x throughout — no plain JS files
- **Animation:** Framer Motion 11.x — all animated components must use `'use client'` directive
- **CSS:** Tailwind CSS v4 — no CSS Modules or styled-components; custom overrides via Tailwind config only
- **Package manager:** pnpm exclusively — no npm or yarn usage on this project
- **Deployment:** Vercel free tier with automatic preview deployments on every pull request

### Testing
- All features are written test-first (TDD) — no component is built without Playwright E2E stubs written and failing first
- Unit tests (Vitest + React Testing Library) cover component logic; Playwright covers user flows
- Tests must pass in CI before any branch is merged

### Compatibility
- **ASSUMPTION TO VALIDATE:** Tailwind CSS v4 is compatible with Next.js 15 App Router — technical spike required before Sprint 1
- **ASSUMPTION TO VALIDATE:** Framer Motion 11.x scroll-triggered animations work correctly with Next.js App Router `'use client'` boundary — technical spike required before Hero section is built
- Browser support: latest 2 versions of Chrome, Firefox, Safari, Edge
- Mobile support: responsive layout required; tested at 375px (iPhone SE), 768px (tablet), 1440px (desktop)

### Content
- At least 3 featured projects are selected, with written narratives (problem, approach, outcome) ready before the project card component is built
- **NEEDS CLARIFICATION:** Which specific projects will be featured at launch?

### Accessibility
- WCAG 2.2 AA is a non-functional requirement, not a nice-to-have — all interactive elements must be keyboard-navigable and screen-reader labelled

---

## 4. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Performance** | Lighthouse performance score ≥ 90 on mobile and desktop |
| **Accessibility** | WCAG 2.2 AA — Lighthouse accessibility ≥ 95; all interactive elements keyboard-navigable |
| **Responsiveness** | Fully responsive at 375px, 768px, and 1440px breakpoints minimum |
| **Load time** | First Contentful Paint (FCP) < 1.5s on a simulated 4G connection |
| **Animation performance** | All Framer Motion animations must run at 60fps; no layout thrash; `will-change` used sparingly |
| **SEO** | Proper `<title>`, `<meta description>`, Open Graph tags on every page; site must be indexable |
| **Security** | No secrets or API keys in the repository; contact form uses a third-party service (no custom backend) |
| **Analytics** | Vercel Analytics (privacy-friendly, no cookie consent banner required) — added post-launch |
| **Test coverage** | All user-facing flows have a corresponding Playwright E2E test; all component logic has a Vitest unit test |
| **CI** | Playwright and Vitest must pass on every pull request before merge |
| **Static export** | Site must build cleanly with `next build` + `output: 'export'` — no server-side runtime dependencies |
| **Bundle size** | Framer Motion loaded via dynamic import to avoid bloating the initial bundle |

---

## 5. User Requirements

### Persona: Recruiter Rachel
*Goal: Quickly screen Drew for a role or talent pool. Core question: "Is Drew worth sending to the hiring manager?"*

| # | User Story | User Requirement |
|---|---|---|
| R1 | Rachel needs to identify Drew's primary skills and role immediately so she can decide if Drew fits the role she is filling | Hero section displays name, a one-line value statement, and a skills summary visible above the fold on desktop and mobile |
| R2 | Rachel needs to see relevant experience at a glance so she can screen without reading the full site | Featured projects section shows project title, tech stack used, and a one-sentence outcome summary on the card — no click required to get the essentials |
| R3 | Rachel needs a fast path to contact so she can reach out without hunting for an email | Contact section is reachable from the main navigation and includes at minimum a LinkedIn link and a direct contact method |
| R4 | Rachel needs the site to load fast on a work laptop so she is not waiting | Lighthouse performance ≥ 90; FCP < 1.5s |

### Persona: Hiring Manager Marcus
*Goal: Evaluate technical depth, problem-solving approach, and culture fit. Core question: "Can Drew do the job and would they thrive here?"*

| # | User Story | User Requirement |
|---|---|---|
| M1 | Marcus needs to understand how Drew approaches problems so he can assess thinking, not just output | Each featured project includes a narrative: the problem it solved, the approach taken, and the outcome — not just screenshots and a tech list |
| M2 | Marcus needs evidence of code quality and process discipline so he can trust what he sees on the site | Repository link is prominently displayed; README links to ADRs, PDLC governing documents, and test coverage |
| M3 | Marcus needs to understand what kind of engineer Drew is beyond the CV so he can assess culture fit | About section includes working style, what Drew finds engaging, and how Drew approaches delivery — written with personality, not CV language |
| M4 | Marcus needs the site itself to demonstrate the quality of work Drew claims to deliver | Site visual polish, animation quality, and mobile responsiveness must be consistent with the Linear.app / Stripe benchmark referenced in the PR-FAQ |

### Persona: Peer Developer Priya
*Goal: Assess credibility and shared interests. Core question: "Is Drew someone worth following or working with?"*

| # | User Story | User Requirement |
|---|---|---|
| P1 | Priya needs to quickly evaluate the repository structure so she can assess engineering rigour | GitHub repository is linked from the site; repository README is comprehensive and links to ADRs, PDLC docs, and test files |
| P2 | Priya needs to see the tech stack and methodology at a glance so she can decide if there is shared ground | Skills section and/or project cards display the stack and methodology (AI-PDLC, TDD) clearly |
| P3 | Priya needs a way to follow Drew's work so she can stay connected | GitHub profile link and/or LinkedIn are accessible from the site without digging |

### Persona: Freelance Client Cameron
*Goal: Evaluate trust, range, and professionalism before hiring. Core question: "Can Drew deliver what I need, and are they reliable?"*

| # | User Story | User Requirement |
|---|---|---|
| C1 | Cameron needs to understand the range of work Drew has delivered so he can assess whether his project is in scope | Featured projects span different problem types and demonstrate generalist range — not all the same domain or technology |
| C2 | Cameron needs to understand how Drew works before committing to a conversation so he can decide if it is worth his time | About section describes Drew's working style, process, and the types of projects that are most engaging |
| C3 | Cameron needs a professional, low-friction contact path so he can reach out without feeling like he is filling in a corporate form | Contact section feels direct and personal — form or email link, not a generic "get in touch" dead end |
| C4 | Cameron needs the site to feel professionally built so it builds trust in Drew's ability to deliver his project | Design quality, responsiveness, and load speed all signal craft — a poorly built portfolio actively undermines the pitch |

---

## 6. Open Questions & Considerations

### Blocking — Must resolve before Sprint 1

- [ ] **Tech spike:** Confirm Tailwind CSS v4 + Next.js 15 App Router compatibility — document findings in ADR-002
- [ ] **Tech spike:** Confirm Framer Motion 11.x scroll-triggered animation patterns work in Next.js App Router with `'use client'` — document findings in ADR-002
- [ ] **Content:** Which 3–5 projects will be featured at launch? Narratives (problem, approach, outcome) must be written before the project card component is built

### Non-blocking — Resolve before Sprint 2

- [ ] **Contact form:** Which service will handle form submissions — Resend, Formspree, or direct email link? Drives the contact section implementation
- [ ] **Domain:** Custom domain at launch, or vercel.app URL? Custom domain requires DNS setup before go-live

### Design considerations

- Dark mode is explicitly out of scope for v1 — choose one polished theme and execute it well; do not split attention
- Animation should be restrained and purposeful — every motion should have a reason; avoid animation for animation's sake
- Typography is a primary design lever on a text-heavy site — font pairing and scale hierarchy should be defined before any component is built
- **DISCOVERY NEEDED:** Informal review of site design with 2–3 people from target personas before Sprint 1 design work begins

### TDD considerations

- Visual polish (animation smoothness, colour feel, layout balance) lives outside the test suite — accept this and do not attempt to write tests for it
- Accessibility assertions (ARIA labels, keyboard nav, focus management) ARE testable and must be covered in Playwright
- Each section (Hero, About, Skills, Projects, Contact) should have its own Playwright spec file in `tests/e2e/`

---

## Next Steps

1. **Resolve blocking open questions** — tech spikes and project selection before Sprint 1 begins
2. **Write ADR-002** — document tech spike findings for Framer Motion + Tailwind v4 + Next.js 15 compatibility
3. **Write User Stories** — break each user requirement (R1–R4, M1–M4, P1–P3, C1–C4) into Jira/Git tickets with acceptance criteria
4. **TDD mode — generate test cases** — for each story, run Bob in TDD mode to generate categorised test cases before writing any code
5. **Sprint 1 begins** — Hero section first (highest impact, sets the visual tone, validates the animation stack)

---

## References

- [OpA](../discovery/OpA.md)
- [PR-FAQ](../discovery/PR-FAQ.md)
- [ADR-001: Tech Stack Selection](../decisions/ADR-001-tech-stack.md)
- [Winning Products — Epics](https://w3.ibm.com/w3publisher/winning-products/toolkits/methods-artifacts/epics)
- [PDLC Delivery Phase](https://w3.ibm.com/w3publisher/winning-products/how-we-work/product-development-lifecycle/delivery)
