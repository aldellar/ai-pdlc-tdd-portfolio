'use client';

/**
 * Projects — S3 scroll-triggered flip card section.
 *
 * Cards spring up from below as they enter the viewport (Motion.dev reference).
 * Each card flips on hover to reveal the project description on the back.
 */

import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section
      aria-label="Personal projects"
      data-testid="projects-section"
      className="relative w-full py-32"
    >
      {/* Section label */}
      <div className="px-8 md:px-16 pb-16">
        <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-3">03 — Projects</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Personal Projects</h2>
      </div>

      {/* Card stack */}
      <div
        style={{
          margin: '0 auto',
          maxWidth: 600,
          paddingBottom: 240,
          width: '100%',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
