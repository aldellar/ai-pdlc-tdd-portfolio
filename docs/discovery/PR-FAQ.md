# PR-FAQ: Drew's Personal Portfolio Website

**Status:** Draft  
**Date:** 2025-06-10  
**Author:** Drew  
**Scope:** Small  
**Phase:** Discovery  
**References:** [OpA](./OpA.md) · [ADR-001](../decisions/ADR-001-tech-stack.md)

---

## Team

| Role | Owner |
|---|---|
| Product + Engineering + Design | Drew |

---

## Press Release

### Headline

**Software Engineer Drew Launches Portfolio Site Built the Way Real Products Are Built**

### Subheadline

A personal portfolio website built with AI-PDLC methodology and Test-Driven Development — giving recruiters, hiring managers, and clients a single place to assess Drew's skills, projects, and engineering craft.

### Dateline

**Available now at [portfolio-url]** — Drew, a generalist software engineer, today launched a personal portfolio website that does something most developer portfolios don't: it shows not just *what* was built, but *how* it was built and *why*.

### Opening Paragraph

The portfolio gives every visitor — recruiter, hiring manager, freelance client, or fellow developer — the fastest possible path to the information they need. Skills and featured projects are front and centre. Behind the scenes, the repository is fully open, structured with governing documents, Architecture Decision Records, and a complete TDD test suite, making the build process itself a demonstration of the engineering standards Drew brings to every project.

### Problem Statement

Most developer portfolios are digital résumés. They list skills, show screenshots, and include a contact email. They answer the question "what have you built?" but not "how do you think?", "how do you approach a problem?", or "can you deliver something structured and maintainable?" For a generalist engineer whose value lies in breadth, process discipline, and adaptability, a skills list alone understates the case entirely.

Recruiters screening dozens of candidates a day cannot spend time piecing together a picture from a LinkedIn profile, a GitHub account, and an attached résumé. Hiring managers who care about engineering quality have no way to see it demonstrated without an interview. Freelance clients weighing whether to hire someone they have never met need to build trust fast — screenshots of old projects don't do that.

The information exists. The problem is that it is scattered, decontextualised, and fails to tell a coherent story about who Drew is as an engineer.

### Solution Overview

Drew's portfolio is a single, polished destination that answers the core question each visitor brings with them. Recruiters see a clear value statement, a skills summary, and featured projects within seconds of landing. Hiring managers can go deeper — reading the story behind each project, the problem it solved, and how it was approached. The GitHub repository is linked and structured: ADRs document every major technical decision, PDLC governing documents trace the project from Discovery through Delivery, and Playwright test coverage demonstrates TDD discipline in practice.

The site itself is built to the same standard Drew applies to production work. Next.js 15 with the App Router, TypeScript, Framer Motion for animations, and Tailwind CSS v4 — a stack chosen explicitly for performance, developer experience, and the quality of motion design it enables. The result is a site that feels considered and polished rather than assembled from a template.

Freelance clients and peer developers get what they need too: an About section that communicates personality alongside capability, a contact pathway that feels direct and professional, and a public repository they can explore at any level of depth they choose.

### Key Benefits

- **One destination for every audience** — recruiter, hiring manager, client, and peer developer each find what they need without friction, in a single visit
- **Process as a portfolio piece** — the repository's ADRs, PDLC artifacts, and TDD test coverage demonstrate engineering discipline that no résumé can show
- **Polished, performance-first design** — scroll-triggered animations, smooth transitions, and mobile-responsive layout that signals craft from the first interaction
- **Transparent methodology** — built with AI-PDLC and TDD from day one, with every decision documented and publicly visible
- **Always current** — structured as a living site, not a static snapshot, making it easy to add projects and keep content fresh

### Author Quote

"I wanted to build something that shows how I work, not just what I've worked on. Anyone can list frameworks on a résumé. This site is the proof of work."

### Availability

The portfolio is publicly available at **[portfolio-url]** and the source repository is open at **[github-repo-url]**. Built with Next.js 15, Framer Motion, and Tailwind CSS v4. Deployed on Vercel.

---

## Customer FAQs

### Who is this for?

Anyone who needs to evaluate Drew professionally before deciding to engage:

- **Recruiters** screening candidates for software engineering roles
- **Hiring managers** evaluating technical depth, problem-solving approach, and culture fit
- **Freelance clients** assessing capability and professionalism before commissioning work
- **Peer developers** looking for collaboration, shared interests, or reference implementations

### What problem does this solve?

Drew's professional information was scattered across LinkedIn, GitHub, and a résumé — none of which told a complete story. The portfolio brings everything into one place with narrative context, so any visitor can answer their core question ("is Drew right for this?") in a single visit.

### How does this improve my workflow as a recruiter or hiring manager?

You land on the site, read a clear value statement, scan the skills summary, and click through to one or two featured projects. Each project tells you the problem it solved, the approach taken, and the outcome — not just a technology list. If you want to go deeper, the GitHub link is right there. You have everything you need to decide whether to reach out, without chasing multiple tabs.

### Why does the methodology matter to me as a hiring manager?

The way this site was built is the answer to "how does Drew work?". The repository has Architecture Decision Records for every major technical choice (with alternatives considered and trade-offs documented), PDLC governing documents tracing Discovery through Delivery, and Playwright E2E tests written before implementation. If you care about engineering process, this is a live demonstration of it.

### How do I contact Drew?

A contact section is available on the site with a direct contact form and links to LinkedIn and GitHub. **NEEDS CLARIFICATION:** Confirm preferred contact method (form, direct email link, or LinkedIn CTA) before building the contact section.

### What might disappoint me?

- The site focuses on quality over quantity — it features a curated selection of projects rather than an exhaustive archive. If you are looking for a specific technology not represented, it may not be immediately visible.
- As a static site with no backend, the contact form requires a third-party service (e.g. Resend, Formspree). **NEEDS CLARIFICATION:** Confirm contact form service before building.
- The portfolio represents Drew's generalist breadth — if you are hiring for a deep specialist in a single narrow domain, this positioning may not match your requirement.

### How will I know if Drew is a fit for a contract or freelance project?

The About section describes Drew's working style, the types of problems that are most engaging, and the process used on projects. Past project write-ups include the context for each engagement — not just the output. If you are still unsure, the contact pathway is low-friction.

---

## Internal FAQs

### What is the launch feature set?

Core features for v1 (launch):

| Section | Description |
|---|---|
| **Hero** | Name, value statement, primary CTA (view work / contact) |
| **About** | Short bio, working style, current focus |
| **Skills** | Grouped summary — languages, frameworks, tools, methodologies |
| **Featured Projects** | 3–5 curated projects with problem, approach, outcome, and links |
| **Process / Repository** | Link to repo with callout to ADRs, PDLC docs, and test coverage |
| **Contact** | Form or direct CTA linking to email / LinkedIn |

### What is NOT included at launch?

- Blog or writing section (post-launch if content exists)
- Dark/light mode toggle (post-launch; default to one polished theme)
- Filterable project gallery (launch with curated featured cards only)
- Testimonials / recommendations section (add when content is available)
- Analytics dashboard (Vercel Analytics to be added post-launch)
- Internationalisation / multi-language support (out of scope)

### What are the success metrics?

| Metric | Target | How measured |
|---|---|---|
| Recruiter task completion | Persona can identify Drew's stack and one relevant project in < 30s | Manual usability review before launch |
| Contact pathway clarity | Every persona can find the contact section without scrolling back to nav | Playwright E2E test on contact flow |
| Lighthouse performance score | ≥ 90 on mobile and desktop | Vercel / Lighthouse CI |
| Lighthouse accessibility score | ≥ 95 (WCAG 2.2 AA target) | Vercel / Lighthouse CI |
| Inbound contact | At least 1 recruiter, client, or collaborator contact traceable to the portfolio within 60 days of launch | Manual tracking |
| Repository engagement | GitHub repo receives ≥ 5 stars or forks within 90 days of launch | GitHub Insights |

### What are the top risks?

**Execution Risk:**
- Framer Motion scroll animation patterns in Next.js 15 App Router (`use client` boundary) are not yet validated — mitigation: run technical spike before Sprint 1
- Tailwind CSS v4 + Next.js 15 integration is early-adopter surface — mitigation: verify compatibility before Delivery begins, document any workarounds in ADR-002

**Content Risk:**
- Project write-ups require Drew to articulate the "problem + approach + outcome" narrative for each piece of work — this takes time and is the most common reason portfolio builds stall — mitigation: write all project narratives before building the project card component
- **DISCOVERY NEEDED:** Which 3–5 existing projects best represent Drew's range as a generalist? This must be decided before the Epic is written.

**Design Risk:**
- No user testing conducted yet — initial design direction is based on benchmark analysis (Linear.app, Stripe, Brittany Chiang, Josh Comeau) — mitigation: informal review with 2–3 people from target personas before Sprint 1 design work begins

### What alternative approaches were considered?

| Alternative | Why not chosen |
|---|---|
| **Notion public page** | No custom design, no domain, looks unprofessional for an engineer claiming UI craft |
| **GitHub Pages with Jekyll** | Template-constrained, limited animation capability, does not demonstrate modern stack knowledge |
| **Webflow / Framer (no-code)** | Cannot demonstrate TDD, PDLC methodology, or code quality — undermines the core differentiator |
| **WordPress** | Heavyweight, not aligned with the target stack, template aesthetic |
| **LinkedIn only** | No control over design or narrative, algorithm-dependent visibility, no code demonstration |

The custom Next.js build was chosen specifically because the *how it was built* is as important as the *what it looks like*.

### What dependencies exist?

| Dependency | Status | Blocking? |
|---|---|---|
| Next.js 15 + Tailwind v4 compatibility confirmed | **NEEDS VALIDATION** | Yes — blocks Sprint 1 |
| Framer Motion scroll animation spike in App Router | **NEEDS VALIDATION** | Yes — blocks Hero section |
| 3–5 projects selected and narratives written | **NEEDS CLARIFICATION** | Yes — blocks project card component |
| Contact form service selected (Resend / Formspree / other) | **NEEDS CLARIFICATION** | No — can be deferred to Sprint 2 |
| Custom domain purchased and pointed to Vercel | **NEEDS CLARIFICATION** | No — can launch on vercel.app URL |

### What is the go-to-market strategy?

This is a personal project with no marketing budget. Distribution is through:

1. **LinkedIn** — share launch post with link and repo; tag relevant people
2. **GitHub** — public repository with a strong README drives organic discovery
3. **Dev communities** — share on relevant Slack groups, Discord servers, or Twitter/X if active
4. **Direct outreach** — add portfolio URL to résumé, LinkedIn, email signature, and all recruiter conversations immediately at launch

### What is the deployment and infrastructure plan?

- **Hosting:** Vercel free tier (static export, automatic previews on every pull request)
- **CI:** Vercel preview deployments run Playwright E2E tests on each PR
- **Domain:** **NEEDS CLARIFICATION** — custom domain or vercel.app URL at launch?
- **Analytics:** Vercel Analytics (privacy-friendly, no cookie banner required) — add post-launch

---

## Next Steps

1. **Resolve blocking NEEDS CLARIFICATION items** — project selection, contact method, domain decision
2. **Run technical spikes** — Framer Motion + Next.js App Router, Tailwind v4 + Next.js 15
3. **Write project narratives** — problem, approach, outcome for each featured project before building
4. **Draft Epic** — using this PR-FAQ as the foundation, break the site into features with acceptance criteria and personas
5. **Scaffold User Stories** — each Epic requirement becomes a story with TDD acceptance criteria before any code is written

---

## References

- [Opportunity Assessment (OpA)](./OpA.md)
- [ADR-001: Tech Stack Selection](../decisions/ADR-001-tech-stack.md)
- [Winning Products — PR-FAQ Method](https://w3.ibm.com/w3publisher/winning-products/toolkits/methods-artifacts/pr-faq)
- [PDLC Discovery Phase](https://w3.ibm.com/w3publisher/winning-products/how-we-work/product-development-lifecycle/discovery)
