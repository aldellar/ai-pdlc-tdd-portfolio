# Personal Portfolio — AI-PDLC + TDD

A personal portfolio website built as a corporate-style delivery using the **IBM AI-PDLC methodology** and **Test-Driven Development**. Every decision, artifact, and phase of work is tracked here as it would be in a real product delivery.

---

## Tech Stack

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

> See [`docs/decisions/ADR-001-tech-stack.md`](docs/decisions/ADR-001-tech-stack.md) for the full rationale and alternatives considered.

---

## Project Structure

```
.
├── docs/
│   ├── decisions/          # Architecture Decision Records (ADRs)
│   ├── discovery/          # PDLC Discovery phase artifacts (OpA, PR-FAQ, personas)
│   └── delivery/           # PDLC Delivery phase artifacts (epics, user stories)
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable React components
│   └── styles/             # Global styles and Tailwind config
├── tests/
│   ├── e2e/                # Playwright end-to-end tests
│   └── unit/               # Vitest unit tests
├── public/                 # Static assets
└── README.md
```

> Directories marked above that do not exist yet will be created as each phase of work begins.

---

## Development Methodology

### AI-PDLC Phases

This project follows three phases:

| Phase | Purpose | Key Artifacts |
|---|---|---|
| **Discovery** | Define the problem, users, and opportunity | OpA, PR-FAQ, personas, competitive research |
| **Delivery** | Design, build, and test the solution | Epics, user stories, sprint plans, ADRs |
| **Growth** | Measure, iterate, and improve | Analytics, feedback, retrospectives |

### Test-Driven Development

Every feature follows the **red-green-refactor** loop:

1. **Red** — write failing tests first (Playwright for E2E, Vitest for units)
2. **Green** — write the minimum code to make tests pass
3. **Refactor** — clean up with tests still passing

No feature code is written without a corresponding test suite scaffolded first.

---

## Architecture Decision Records

All significant technical decisions are documented as ADRs in [`docs/decisions/`](docs/decisions/).

| ADR | Title | Status |
|---|---|---|
| [ADR-001](docs/decisions/ADR-001-tech-stack.md) | Tech Stack Selection | Accepted |

---

## Getting Started

> ⚠️ Project is in **Discovery phase** — no application code exists yet.

Once the Delivery phase begins:

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run E2E tests
pnpm playwright test

# Run unit tests
pnpm vitest
```

---

## Documentation

| Document | Location | Phase | Description |
|---|---|---|---|
| ADR-001: Tech Stack | [`docs/decisions/ADR-001-tech-stack.md`](docs/decisions/ADR-001-tech-stack.md) | Delivery | Framework, animation, CSS, and tooling decisions |
| OpA | [`docs/discovery/OpA.md`](docs/discovery/OpA.md) | Discovery | Opportunity assessment — problem, personas, risk scores, and success criteria |

More documents will be added as Discovery and Delivery phases progress.
