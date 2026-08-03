# Opportunity Assessment: Personal Portfolio Website

**Status:** Draft  
**Date:** 2025-06-10  
**Author:** Drew  
**Scope:** Small  
**Phase:** Discovery

---

## Opportunity Value & Viability

### Value

**What is the problem today?**

Recruiters, hiring managers, freelance clients, and fellow developers have no single, reliable place to quickly assess Drew's skills, experience, and work quality. Information is scattered across LinkedIn, GitHub, and résumés — none of which tell a cohesive story or demonstrate craft in a way that builds immediate trust and confidence.

**What is the impact of this problem?**

- Recruiters screening at volume cannot quickly determine fit — Drew risks being skipped over in favour of candidates with a more immediately legible online presence
- Hiring managers evaluating technical depth have no evidence of quality beyond a résumé and a GitHub profile with no narrative context
- Freelance clients considering hiring Drew cannot assess professionalism, range, or past work quality before initiating contact
- Peer developers have no reference point for credibility, collaboration, or shared interests

**What could be the impact of a solution?**

A polished, purpose-built portfolio site would give every visitor the fastest possible path to the answer they need — whether that is "is Drew worth interviewing?", "can Drew handle this contract?", or "should I follow Drew's work?". The site itself, built using AI-PDLC methodology and TDD, also serves as a live demonstration of engineering craft and structured thinking — a differentiator no résumé can replicate.

**How would you know you've solved the problem? What would you measure?**

- Recruiters can identify Drew's primary skills and a relevant project within 30 seconds of landing on the site
- Hiring managers can find evidence of code quality, methodology, and problem-solving approach without leaving the site
- Freelance clients can view past work, understand Drew's process, and find a contact path in a single visit
- The portfolio build process itself (ADRs, PDLC artifacts, TDD tests) is publicly visible and linked, demonstrating structured delivery

---

### Viability

**What would success look like?**

- Portfolio is live, publicly accessible, and indexed by search engines
- Every primary persona can complete their core task (assess, evaluate, contact) in a single visit without friction
- The repository demonstrates full AI-PDLC + TDD discipline — governing documents, ADRs, test coverage — making the build process itself a portfolio piece
- Drew receives inbound contact (recruiter outreach, interview requests, freelance inquiries, or GitHub follows) traceable to the portfolio

---

## Supporting Evidence

### Target Customers & Personas

**Who is the target customer?**

Anyone who needs to evaluate Drew's professional capability and decide whether to engage — recruit, hire, contract, or collaborate.

**Who is NOT the target customer?**

- General public with no professional interest in Drew
- Employers seeking highly specialised narrow-stack engineers (Drew is a generalist — this site celebrates breadth, not depth in one niche)

**Personas**

| Persona | Goal on site visit | Key question they need answered |
|---|---|---|
| **Recruiter Rachel** | Screen Drew quickly for a role or talent pool | "Is Drew worth sending to the hiring manager?" |
| **Hiring Manager Marcus** | Evaluate technical depth, problem-solving, and culture fit | "Can Drew do the job and would they thrive here?" |
| **Peer Developer Priya** | Assess credibility, shared interests, and collaboration potential | "Is Drew someone worth following or working with?" |
| **Freelance Client Cameron** | Evaluate trust, range, and professionalism before hiring | "Can Drew deliver what I need, and are they reliable?" |

**Use cases**

- Rachel lands on the site from a LinkedIn link and needs to confirm Drew's stack and experience in under a minute
- Marcus digs into a featured project to understand how Drew approaches problems, not just what Drew has built
- Priya explores the repository to review the PDLC + TDD methodology and decides whether to star or fork
- Cameron reads the About section, reviews past projects, and finds the contact form to start a conversation

---

### Existing Workarounds

**How do people currently assess Drew without a portfolio?**

- LinkedIn profile — provides career history but no demonstration of quality or personality
- GitHub profile — shows code but lacks narrative context, project rationale, or visual presentation
- Résumé — static, text-heavy, and provides no interactive evidence of capability
- Word of mouth / referrals — effective but not scalable and dependent on Drew's network

**What is missing from these workarounds?**

None of the above combine narrative, code quality evidence, process transparency, and contact pathway in one place. A portfolio site is the only artifact that does all four simultaneously.

---

### Competitive Landscape

**What do strong developer portfolios do well?**

- Clear, fast-loading hero section with an immediate value statement ("who I am, what I do")
- Featured projects with context — not just screenshots, but the problem solved and the approach taken
- A visible link to the GitHub repository so technical visitors can go deeper
- Contact pathway that feels personal, not transactional
- Personality — design choices, writing voice, and visual polish that distinguish the person from a résumé

**Reference benchmarks**

| Benchmark | What it does well |
|---|---|
| Linear.app | Scroll-triggered animations, micro-interactions, premium visual polish |
| Stripe.com | Clarity of value proposition, typographic hierarchy, restrained use of motion |
| Josh Comeau's portfolio | Personality-forward writing, interactive elements, dev-community credibility |
| Brittany Chiang's portfolio | Clean layout, featured project cards, accessible and fast |

**DISCOVERY NEEDED:** Review 3–5 current developer portfolio sites in Drew's peer group to identify specific gaps and differentiators before finalising the design direction.

---

## Risk Assessment

### Value Risk

**Score: 4 / 5**

**Evidence:**
- Recruiter and hiring manager behaviour is well-documented — a portfolio site with live projects and clear positioning materially improves callback rates compared to résumé-only candidates
- The portfolio build process (AI-PDLC + TDD) is itself a differentiator — few candidates can show a governed, test-driven personal project delivery
- Drew has existing work to showcase, reducing the "empty portfolio" risk entirely

**Gaps:**
- [ ] Validate that target employers and clients actually visit personal portfolio sites (vs. relying entirely on LinkedIn)
- [ ] Confirm which project types resonate most with target personas

---

### Viability Risk

**Score: 5 / 5**

**Evidence:**
- Zero cost to build and deploy (Vercel free tier, GitHub free public repo)
- No revenue model required — success is measured in professional outcomes (interviews, contracts, collaborations), not revenue
- Single-person delivery eliminates coordination risk

**Gaps:**
- [ ] None identified — viability risk is minimal for a personal project with no budget dependency

---

### Usability Risk

**Score: 3 / 5**

**Evidence:**
- Framer Motion + Tailwind CSS v4 stack is capable of producing the target level of visual polish
- Next.js App Router introduces `use client` complexity that requires care when mixing animated and server components

**Gaps:**
- [ ] No user testing has been conducted yet — initial design direction is based on benchmark analysis, not validated user feedback
- [ ] Mobile responsiveness requirements need explicit definition before Delivery begins
- [ ] Accessibility standards (WCAG 2.2 AA) need to be confirmed as a non-functional requirement

---

### Feasibility Risk

**Score: 4 / 5**

**Evidence:**
- Tech stack is well-documented with strong community support (Next.js 15, Framer Motion 11, Tailwind v4, Playwright)
- Stack decisions are captured in [ADR-001](../decisions/ADR-001-tech-stack.md) with alternatives considered
- TDD workflow using Playwright for E2E and Vitest for unit tests is established practice for this stack

**Gaps:**
- [ ] Framer Motion scroll-triggered animation patterns in Next.js App Router need a technical spike before the Hero section is built
- [ ] Verify Tailwind v4 compatibility with Next.js 15 App Router before Delivery Sprint 1

---

## Discovery Activities Needed

### Research Questions
- [ ] Which projects in Drew's existing portfolio best demonstrate range for a generalist engineer?
- [ ] What contact method (form, email link, LinkedIn CTA) has the highest conversion for recruiter outreach?
- [ ] What do target employers/clients look for first when visiting a developer portfolio?

### Validation Activities
- [ ] Review 3–5 peer developer portfolios against the persona goals defined above
- [ ] Conduct a technical spike: Framer Motion scroll animations in Next.js 15 App Router with `use client`
- [ ] Verify Tailwind CSS v4 + Next.js 15 integration (known early-adopter compatibility surface)
- [ ] Draft a project card template and review against Recruiter Rachel and Hiring Manager Marcus personas before building

### Success Criteria for Discovery Validation
- Technical spike confirms scroll animation approach is viable before Sprint 1 begins
- At least 3 existing projects are identified, documented, and ready to feature at launch
- Mobile and accessibility requirements are defined and added to the Epic before stories are written

---

## Next Steps

1. **Complete Discovery Activities** listed above — prioritise the technical spike and project selection
2. **Write PR-FAQ** using this OpA as the foundation — working backwards from what each persona reads on launch day
3. **Create Epic** once PR-FAQ is approved — break down the site into features with acceptance criteria
4. **Begin Delivery** — Sprint 1 starts only after Epic is written and user stories have TDD test cases scaffolded

---

## References

- [ADR-001: Tech Stack Selection](../decisions/ADR-001-tech-stack.md)
- [Winning Products — Opportunity Assessment Method](https://w3.ibm.com/w3publisher/winning-products/toolkits/methods-artifacts/opportunity-assessment)
- [PDLC Discovery Phase](https://w3.ibm.com/w3publisher/winning-products/how-we-work/product-development-lifecycle/discovery)
