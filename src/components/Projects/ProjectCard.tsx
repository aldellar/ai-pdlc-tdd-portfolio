'use client';

/**
 * ProjectCard — hover-flip card with spring scroll-trigger.
 *
 * Front: project name + tech stack pills
 * Back:  description + "View Project →" link
 *
 * Animation:
 *   - Springs up from y:300 when 80% of the card enters the viewport
 *     (matches the Motion.dev scroll-triggered card pattern)
 *   - Flips on hover via CSS 3D transform (rotateY 0 → 180deg)
 *   - The coloured "splash" shape sits behind the card matching the reference
 */

import { motion, type Variants } from 'framer-motion';
import type { Project } from '@/lib/types';

const cardVariants: Variants = {
  offscreen: { y: 300, opacity: 0 },
  onscreen: {
    y: 50,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
  },
};

const hue = (h: number) => `hsl(${h}, 90%, 55%)`;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const splashBg = `linear-gradient(306deg, ${hue(project.hueA)}, ${hue(project.hueB)})`;

  return (
    <motion.div
      data-testid="project-card-container"
      style={{
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 20,
        marginBottom: -120,
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4 }}
    >
      {/* Coloured splash behind card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: splashBg,
          clipPath: 'path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")',
        }}
      />

      {/* Perspective wrapper required for 3D flip */}
      <div style={{ perspective: 1000, width: 300, height: 430 }}>

      {/* Flip card shell */}
      <motion.a
        data-testid="project-card"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        variants={cardVariants}
        whileHover={{ rotateY: 180 }}
        initial="unflipped"
        style={{
          width: 300,
          height: 430,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transformOrigin: '10% 60%',
          borderRadius: 20,
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
          rotateY: 0,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* ── FRONT ── */}
        <div
          data-testid="card-front"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#0d0d1a',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '32px 24px',
            gap: 20,
          }}
        >
          {/* Project name */}
          <h3 style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            {project.name}
          </h3>

          {/* Divider */}
          <div style={{ width: 40, height: 2, background: `linear-gradient(to right, ${hue(project.hueA)}, ${hue(project.hueB)})`, borderRadius: 2 }} />

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {project.tech?.map((t) => (
              <span
                key={t}
                data-testid="tech-pill"
                style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 6,
                  padding: '3px 10px',
                  letterSpacing: '0.04em',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Hover hint */}
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            hover to flip
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          data-testid="card-back"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${hue(project.hueA)}22, ${hue(project.hueB)}22), #0d0d1a`,
            border: `1px solid ${hue(project.hueA)}44`,
            boxShadow: '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '32px 24px',
            gap: 20,
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {project.description}
          </p>
          <span style={{
            marginTop: 8,
            fontSize: 12,
            fontFamily: 'monospace',
            color: hue(project.hueB),
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            View Project →
          </span>
        </div>
      </motion.a>
      </div>
    </motion.div>
  );
}
