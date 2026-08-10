'use client';

/**
 * ProjectCard — scroll-triggered spring entry + hover flip.
 *
 * Design: wide landscape card (not portrait like the reference).
 *   Front — large project index, name, tech pills, coloured left accent bar
 *   Back  — description on a tinted gradient background, "View →" label
 *
 * The coloured splash sits OUTSIDE the overflow:hidden container so it
 * is always visible behind the card.
 *
 * Spring fix: the scroll trigger (initial/whileInView) and the flip
 * (whileHover) both live on the same motion element using animate prop
 * controlled by a hover state — no conflicting initial overrides.
 */

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { Project } from '@/lib/types';

const hue = (h: number) => `hsl(${h}, 85%, 58%)`;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref            = useRef<HTMLDivElement>(null);
  const isInView       = useInView(ref, { amount: 0.3, once: true });
  const controls       = useAnimation();
  const [flipped, setFlipped] = useState(false);

  // Spring up once the card enters the viewport
  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { type: 'spring', bounce: 0.35, duration: 0.9, delay: index * 0.05 },
      });
    }
  }, [isInView, controls, index]);

  const splashBg = `linear-gradient(135deg, ${hue(project.hueA)}, ${hue(project.hueB)})`;
  const accentBar = `linear-gradient(to bottom, ${hue(project.hueA)}, ${hue(project.hueB)})`;

  return (
    // Outer ref div — scroll trigger target, no overflow clip
    <div
      ref={ref}
      data-testid="project-card-container"
      style={{ position: 'relative', marginBottom: -100, paddingTop: 16 }}
    >
      {/* Splash blob — sits behind card, not clipped */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-20px -30px',
          background: splashBg,
          borderRadius: 32,
          opacity: 0.18,
          filter: 'blur(24px)',
          zIndex: 0,
        }}
      />

      {/* Spring + flip wrapper */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          perspective: 1200,
          width: '100%',
          height: 200,
        }}
        initial={{ y: 120, opacity: 0 }}
        animate={controls}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
      >
        {/* Flip inner — rotates on hover */}
        <motion.a
          data-testid="project-card"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            position: 'relative',
            textDecoration: 'none',
            borderRadius: 16,
          }}
        >
          {/* ── FRONT ── */}
          <div
            data-testid="card-front"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'rgba(13,13,26,0.92)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
            }}
          >
            {/* Left accent bar */}
            <div style={{ width: 4, flexShrink: 0, background: accentBar, borderRadius: '16px 0 0 16px' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 24px', gap: 14 }}>
              {/* Index + name row */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: hue(project.hueA),
                  letterSpacing: '0.12em',
                  opacity: 0.8,
                  flexShrink: 0,
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}>
                  {project.name}
                </h3>
              </div>

              {/* Tech pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tech?.map((t) => (
                  <span
                    key={t}
                    data-testid="tech-pill"
                    style={{
                      fontSize: 10,
                      fontFamily: 'monospace',
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: 5,
                      padding: '2px 8px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover hint */}
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                hover to flip
              </span>
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            data-testid="card-back"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: `linear-gradient(135deg, ${hue(project.hueA)}18, ${hue(project.hueB)}18), rgba(13,13,26,0.95)`,
              border: `1px solid ${hue(project.hueA)}30`,
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '24px 28px',
              gap: 16,
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>
              {project.description}
            </p>
            <span style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: hue(project.hueB),
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              view project →
            </span>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
