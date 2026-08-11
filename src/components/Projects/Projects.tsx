'use client';

/**
 * Projects — S3 folder-per-project scroll section.
 *
 * Each project is wrapped in a motion.div with whileInView="onscreen" so
 * ProjectCard's cardVariants inherit the animation state and the card springs
 * out of its folder as it enters the viewport.
 */

import { motion, type Variants } from 'framer-motion';
import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';

// Subtle fade+lift for the whole folder unit entering the viewport
const folderVariants: Variants = {
  offscreen: { opacity: 0, y: 28 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.18, duration: 0.7 },
  },
};

export function Projects() {
  return (
    <section
      id="projects-section"
      aria-label="Personal projects"
      data-testid="projects-section"
      className="relative w-full py-32"
    >
      {/* Section label */}
      <div className="px-8 md:px-16 pb-16">
        {/* inline-block wrapper shrinks to text width so the scrim hugs the lines */}
        <div className="relative inline-block" style={{ isolation: 'isolate' }}>
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: '-0.5em', bottom: '-0.8em',
              left: '-1.2em', right: '-1.2em',
              zIndex: 0,
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.60) 20%, rgba(0,0,0,0.30) 60%, transparent 100%)',
              filter: 'blur(18px)',
            }}
          />
          <p className="relative z-10 text-white/40 text-xs uppercase tracking-[0.25em] mb-3">03 — Projects</p>
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-white">Personal Projects</h2>
        </div>
      </div>

      {/* Folder stack */}
      <div
        style={{
          margin: '0 auto',
          maxWidth: 700,
          padding: '60px 32px 120px',
          width: '100%',
        }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            variants={folderVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.2 }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
