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
  '/photos/079AD341-AD8E-4F75-A0C5-941BF2C9C689_1_105_c.jpeg',
  '/photos/0C78B480-D422-4C83-8579-CC69076B5EB5_1_105_c.jpeg',
  '/photos/13809550-AAD7-4455-9101-BF6CD8747FED_1_105_c.jpeg',
  '/photos/2690BEFE-CD0E-4A15-B6BB-8FA8B7B27A17_1_105_c.jpeg',
  '/photos/2D3A723F-7C4B-4B84-9D82-BC49B656E36F_1_105_c.jpeg',
  '/photos/311389DA-F0B8-4382-89D3-0728C146A9A1_4_5005_c.jpeg',
  '/photos/380A65CE-24AF-4F3B-AA90-7BDAF08C5FA6_4_5005_c.jpeg',
  '/photos/3885179C-BF0E-4865-95B4-95F563DA3B28_4_5005_c.jpeg',
  '/photos/41DE6A97-1173-4FCA-8F7C-201C777F0629_1_105_c.jpeg',
  '/photos/452D91B5-77F3-4B43-B20E-27DE45D3C70F_4_5005_c.jpeg',
  '/photos/4702125F-1548-4112-87CA-484F14DC0426_1_105_c.jpeg',
  '/photos/5A043A5E-918E-484C-9ED9-DEDB5E662CB5_1_105_c.jpeg',
  '/photos/5D385E90-D6D4-4A20-A7FE-528181A6052F_4_5005_c.jpeg',
  '/photos/68CC488B-55DA-4966-9681-DF0B0F165D0D_1_105_c.jpeg',
  '/photos/6C5C687F-107C-4819-9803-848B01DEF971_1_105_c.jpeg',
  '/photos/6C82098E-BFAE-42EB-BE5C-3B50AFC89DBA_1_105_c-compressed.png',
  '/photos/6DA991BB-A3C3-4C54-87F8-1DDC5487C0E8_1_105_c.jpeg',
  '/photos/707421C7-8C91-4552-A56D-03B0296484BA_4_5005_c.jpeg',
  '/photos/75DE1A3F-8083-4D1D-B461-BFFFF1D5894D_1_105_c.jpeg',
  '/photos/7F88281F-8762-4BB6-A8B5-84B3F7D6E011_1_105_c.jpeg',
  '/photos/825602F5-0FFF-4077-9E0B-D73BBB555583_4_5005_c.jpeg',
  '/photos/8684F16C-78AD-48CE-969D-2E0790304A9C_1_105_c.jpeg',
  '/photos/8B11C894-3B34-433D-AAB0-2D2BEAE4024B_1_105_c.jpeg',
  '/photos/8E3465ED-FD48-4A40-9419-89F43BBAB591_4_5005_c.jpeg',
  '/photos/99EE2C13-F53D-448A-8D7E-F6583360FB98_1_105_c.jpeg',
  '/photos/A798FC14-3FE0-43A1-BC27-8C794DAF6708_4_5005_c.jpeg',
  '/photos/A9F7D3D3-EE74-4BC6-AD14-5AA3CCFB7906_1_102_o.jpeg',
  '/photos/ABBA61D7-30FA-45C4-8D21-7A9C4FDD45C9_1_105_c.jpeg',
  '/photos/AF82E6AB-B6DB-4B85-AA20-BB66A10555AC_4_5005_c.jpeg',
  '/photos/B0B1DE38-BA58-4A5C-8DD0-EA0B873F9BA2_4_5005_c.jpeg',
  '/photos/B2EE07A5-18A1-408C-AA74-BD1F9C46B832_1_105_c.jpeg',
  '/photos/B9BCE260-7819-4341-8C9A-7720224DED90_1_105_c.jpeg',
  '/photos/C31906E5-C510-482B-9B5F-CFB52B3F73AF_1_105_c.jpeg',
  '/photos/C3DB959F-24C4-4F2C-8E66-F77DBA14AC89_1_105_c.jpeg',
  '/photos/C6BADAB3-790F-460C-B6F1-3CABF6AF8158_4_5005_c.jpeg',
  '/photos/CC27FCBE-CD29-4CFD-B1C9-06F9A381F733_4_5005_c.jpeg',
  '/photos/D3759362-30B9-4852-9370-3A7C5B17C572_1_105_c.jpeg',
  '/photos/E2145E6E-D35D-41F7-B47C-41031181EA63_1_105_c.jpeg',
  '/photos/E3BC9DB7-40A9-4E9A-9845-438AB898E97D_4_5005_c.jpeg',
  '/photos/E511D1FE-1B16-431F-90BB-BC0341330CCB_4_5005_c.jpeg',
  '/photos/E559877C-A548-4984-871C-05317B885174_1_105_c.jpeg',
  '/photos/F488A7D2-454A-4E09-AD2D-A5830390FD13_1_105_c.jpeg',
  '/photos/F78E96F4-2C22-43A7-8F4E-85A247CA8842_1_105_c.jpeg',
  '/photos/F996B0C4-9044-4989-8B7F-532A34D60E87_1_105_c.jpeg',
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
    logoSrc: '/logos/ibm.jpeg',
    url: 'https://www.ibm.com/products/content-cortex',
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
    logoSrc: '/logos/whats-the-move.webp',
    url: 'https://apps.apple.com/us/app/wtm-nightlife-discovery/id6754407875',
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
    logoSrc: '/logos/lighthouse.png',
    url: 'https://www.linkedin.com/company/lighthouse-it-consulting/',
  },
  {
    company: 'The Bot Company',
    role: 'R&D Operator',
    location: 'San Francisco, CA',
    startDate: 'Feb 2026',
    endDate: 'Jul 2026',
    description:
      'Operated and evaluated robotic systems under contract, conducting AI policy evaluations and supporting field testing.',
    bullets: [
      'Operated, tested, and evaluated robotic systems across various environments, collecting performance data and validating new releases.',
      'Conducted AI policy evaluations, executed orchestrator workflows, applied minor policy corrections, and managed robot task metadata through internal tools.',
      'Provided structured feedback to engineering teams based on real-world testing observations, supporting iterative improvements to system reliability.',
      'Supported onsite and field testing while adhering to established SOPs, ensuring consistent and safe robot operation across environments.',
    ],
    logoSrc: '/logos/the-bot-company.jpeg',
    url: 'https://www.thebotcompany.com',
  },
];

// ---------------------------------------------------------------------------
// Personal projects — used by S3 Projects section
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  {
    name: 'AI PDLC TDD Portfolio',
    description:
      'This portfolio site — built using IBM Winning Products AI-PDLC methodology and strict TDD with Playwright and Vitest. Features a terminal-style work gallery, scroll-pinned horizontal sections, and a global hue-cycling canvas background.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Playwright', 'Vitest'],
    url: 'https://github.com/aldellar/ai-pdlc-tdd-portfolio',
    hueA: 220,
    hueB: 260,
  },
  {
    name: 'TechPath AI',
    description:
      'iOS app that helps CS students and new grads build a personalised weekly routine and interview prep plan using OpenAI — all data stays 100% local on device. No accounts, no cloud, no data storage.',
    tech: ['Swift', 'SwiftUI', 'Node.js', 'Express', 'OpenAI'],
    url: 'https://github.com/aldellar/TechPath-AI',
    hueA: 160,
    hueB: 200,
  },
  {
    name: 'Distributed Key-Value Store',
    description:
      'Primary/Backup replication model with RESTful HTTP endpoints for storing, retrieving, and deleting key-value pairs. Deployed across 3 Docker containers on AWS EC2 with automated CI/CD via GitHub Actions.',
    tech: ['Node.js', 'Express', 'Docker', 'AWS EC2', 'GitHub Actions'],
    url: 'https://github.com/aldellar/Distributed-Key-Value-Store',
    hueA: 30,
    hueB: 60,
  },
  {
    name: 'CollabSpace',
    description:
      'Collaborative workspace management app with account auth, workspace creation, and user role management. JWT-based authentication, OpenAPI/Swagger docs, and a responsive Material UI frontend.',
    tech: ['React', 'Material UI', 'Node.js', 'Express', 'PostgreSQL'],
    url: 'https://github.com/aldellar/CollabSpace',
    hueA: 280,
    hueB: 320,
  },
  {
    name: 'Cryptor',
    description:
      'Assembly-language cryptography tool implementing encryption and decryption algorithms via direct hardware-level operations. Optimized low-level codebase with compiled object files for maximum efficiency.',
    tech: ['Assembly', 'x86', 'Cryptography'],
    url: 'https://github.com/aldellar/Cryptor',
    hueA: 340,
    hueB: 20,
  },
  {
    name: 'Workout Logger',
    description:
      'Workout tracking web app for logging exercises, tracking history, and monitoring progressive overload. Built with a React frontend and a minimal Node.js backend.',
    tech: ['React', 'JavaScript', 'Node.js'],
    url: 'https://github.com/aldellar/Workout-Logger',
    hueA: 100,
    hueB: 140,
  },
  {
    name: 'Slug Dining',
    description:
      'C-based simulation of the Dining Philosophers problem using POSIX threads, semaphores, and mutexes. Implements custom resource management algorithms to solve deadlock and concurrency issues. Runs in a Docker container.',
    tech: ['C', 'POSIX Threads', 'Docker', 'Makefile'],
    url: 'https://github.com/aldellar/Slug-Dining',
    hueA: 190,
    hueB: 230,
  },
];
