/**
 * src/lib/data.ts
 *
 * Single source of truth for all portfolio content.
 * Components read from here — never hardcode content in JSX.
 */

import type { TechIcon, WorkEntry, Project } from './types';

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------
export const identity = {
  name: "Andrew Dell'Aringa",
  title: 'SWE @ IBM',
  degree: 'B.A. Computer Science, UC Santa Cruz',
  experience: 'Junior Developer — 2 years',
  email: 'dellaringa@ibm.com',
  linkedin: 'https://www.linkedin.com/in/andrewdellaringa/',
  instagram: 'https://www.instagram.com/d3llaringa',
};

// ---------------------------------------------------------------------------
// Tech stack icons — used by TechTicker (horizontal marquee ×2)
// ---------------------------------------------------------------------------
export const techIcons: TechIcon[] = [
  { label: 'TypeScript',  src: '/icons/typescript.svg'  },
  { label: 'React',       src: '/icons/react.svg'       },
  { label: 'Next.js',     src: '/icons/nextjs.svg'      },
  { label: 'Node.js',     src: '/icons/nodejs.svg'      },
  { label: 'Python',      src: '/icons/python.svg'      },
  { label: 'Tailwind CSS',src: '/icons/tailwind.svg'    },
  { label: 'PostgreSQL',  src: '/icons/postgresql.svg'  },
  { label: 'Docker',      src: '/icons/docker.svg'      },
  { label: 'Git',         src: '/icons/git.svg'         },
  { label: 'Figma',       src: '/icons/figma.svg'       },
];

// ---------------------------------------------------------------------------
// Hero photos — used by PhotoTicker (3-column vertical scroll)
// Each column gets a slice of this list; columns loop independently.
// ---------------------------------------------------------------------------
export const heroPhotos: string[] = [
  '/photos/photo-1.jpg',
  '/photos/photo-2.jpg',
  '/photos/photo-3.jpg',
  '/photos/photo-4.jpg',
  '/photos/photo-5.jpg',
  '/photos/photo-6.jpg',
];

// ---------------------------------------------------------------------------
// Work history — used by S2 About / WorkHistory section
// ---------------------------------------------------------------------------
export const workHistory: WorkEntry[] = [
  {
    company: 'IBM',
    role: 'Software Engineer',
    startDate: '2023',
    endDate: 'Present',
    description:
      'Building AI-powered product lifecycle tooling for IBM Software using Next.js, TypeScript, and Python.',
    logoSrc: '/logos/ibm.svg',
    url: 'https://www.ibm.com',
  },
];

// ---------------------------------------------------------------------------
// Personal projects — used by S3 Projects section
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  {
    name: 'AI PDLC TDD Portfolio',
    description:
      'This portfolio site — built using IBM Winning Products AI-PDLC methodology and strict TDD with Playwright and Vitest.',
    imageSrc: '/projects/portfolio.png',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Playwright', 'Vitest'],
    url: 'https://github.com/aldellar/ai-pdlc-tdd-portfolio',
  },
];
