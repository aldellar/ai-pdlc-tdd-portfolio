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
  { label: 'Next.js',     src: '/icons/nextdotjs.svg'   },
  { label: 'Node.js',     src: '/icons/nodedotjs.svg'   },
  { label: 'Python',      src: '/icons/python.svg'      },
  { label: 'Tailwind CSS',src: '/icons/tailwindcss.svg' },
  { label: 'PostgreSQL',  src: '/icons/postgresql.svg'  },
  { label: 'Docker',      src: '/icons/docker.svg'      },
  { label: 'Git',         src: '/icons/git.svg'         },
  { label: 'Figma',       src: '/icons/figma.svg'       },
  { label: 'Swift',       src: '/icons/swift.svg'       },
  { label: 'Playwright',  src: '/icons/playwright.svg'  },
  { label: 'OpenAI',      src: '/icons/openai.svg'      },
  { label: 'HTML5',       src: '/icons/html5.svg'       },
  { label: 'CSS3',        src: '/icons/css3.svg'        },
  { label: 'Xcode',       src: '/icons/xcode.svg'       },
  { label: 'Postman',     src: '/icons/postman.svg'     },
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
    location: 'San Jose, CA',
    startDate: 'Jul 2026',
    endDate: 'Present',
    description:
      'Building cloud-native services for IBM\'s Sovereign Cloud platform in Go and Kubernetes.',
    bullets: [
      'Develop and maintain cloud-native services for IBM\'s Sovereign Cloud platform, building secure and scalable solutions to support regulated enterprise and government workloads.',
      'Design and implement backend features using Go and Kubernetes, contributing to microservice architecture, deployment automation, and platform reliability initiatives.',
      'Collaborate with cross-functional engineering teams to troubleshoot production issues, improve observability, and reduce operational overhead through automation and monitoring enhancements.',
      'Participate in code reviews, technical design discussions, and agile development processes, delivering high-quality software while ensuring compliance with security and infrastructure standards.',
    ],
    logoSrc: '/logos/ibm.svg',
    url: 'https://www.ibm.com',
  },
  {
    company: "What's The Move",
    role: 'Founding iOS Developer',
    location: 'Remote, San Francisco, CA',
    startDate: 'Mar 2025',
    endDate: 'Jul 2026',
    description:
      'Spearheaded iOS development from zero to production using SwiftUI and Supabase.',
    bullets: [
      'Spearheaded development of the authentication and user profile system using SwiftUI and Supabase, implementing secure Row-Level Security (RLS) policies to control access and ensure users could only modify their own profiles.',
      'Collaborated cross-functionally with product owners and designers translating Figma designs into production-ready SwiftUI components, establishing a cohesive UI/UX theme aligned with brand vision.',
      'Led technical interviews and onboarding for new iOS engineers, helping expand the team from concept to execution while maintaining high code quality and accelerating onboarding in a fast-paced startup environment.',
      'Partnered directly with company founders to plan, scope, and iterate on core product features, ensuring alignment between business goals, technical feasibility, and user experience in a rapidly evolving startup environment.',
    ],
    logoSrc: '/logos/whats-the-move.svg',
    url: 'https://www.instagram.com/whatsthemoveapp/',
  },
  {
    company: 'Lighthouse IT Consulting',
    role: 'Founder & Lead IT Consultant',
    location: 'Remote, San Francisco, CA',
    startDate: 'Nov 2025',
    endDate: 'Jul 2026',
    description:
      'Founded and led an IT consultancy delivering Zoho-based SaaS solutions and automated HR pipelines.',
    bullets: [
      'Engineered and deployed Zoho-based SaaS solutions, translating business requirements into scalable, integrated system architectures.',
      'Architected and configured Zoho Voice telephony systems (IVR trees, call routing logic, extensions, voicemail services) to support reliable communication workflows while protecting client PHI.',
      'Designed and implemented automated HR pipelines using Zoho Flow, Forms, CRM/People, and Zoho Sign, eliminating manual processes and improving operational efficiency.',
      'Conducted website audits for functionality and ADA/WCAG compliance, delivering technical documentation and training to support maintainability and system adoption.',
    ],
    logoSrc: '/logos/lighthouse.svg',
    url: 'https://www.linkedin.com/in/andrewdellaringa/',
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
