'use client';

/**
 * WorkHistory — S2 Experience section
 *
 * Scroll-pinning layout inspired by motion.dev/examples/js-scroll-pinning:
 *   • The left panel (company logo + name) sticks while the right panel scrolls.
 *   • Each job entry occupies at least 100vh so the pin has room to breathe.
 *   • Uses framer-motion's useScroll + useTransform for a subtle parallax fade
 *     on the bullet list as each entry scrolls into view.
 *
 * Layout per entry:
 *   ┌──────────────────────────┬──────────────────────────────────────────┐
 *   │  [LOGO]   (sticky)       │  Role · Location · Date range            │
 *   │  Company name            │  • bullet                                │
 *   │                          │  • bullet                                │
 *   │                          │  • bullet                                │
 *   └──────────────────────────┴──────────────────────────────────────────┘
 */

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { workHistory } from '@/lib/data';
import type { WorkEntry } from '@/lib/types';

// ---------------------------------------------------------------------------
// Single entry — the outer div is the scroll container for pinning
// ---------------------------------------------------------------------------
function WorkEntryCard({ entry }: { entry: WorkEntry }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this specific entry
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.15'],
  });

  // Bullets fade + slide up as the card scrolls into view
  const opacity   = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.2, 1, 1, 0.2]);
  const translateY = useTransform(scrollYProgress, [0, 0.18], [24, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row min-h-[100vh] border-b border-white/10"
    >
      {/* ── LEFT: sticky logo panel ───────────────────────────────────────── */}
      <div className="md:sticky md:top-0 md:h-screen md:w-[280px] lg:w-[320px] shrink-0
                      flex flex-col items-center justify-center gap-5 px-8 py-12
                      border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
        {/* Logo container */}
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-24 h-24 rounded-2xl overflow-hidden
                     bg-white/5 border border-white/10
                     flex items-center justify-center
                     transition-all duration-300
                     hover:bg-white/10 hover:border-white/25 hover:scale-105"
          aria-label={`Visit ${entry.company}`}
        >
          <Image
            src={entry.logoSrc}
            alt={`${entry.company} logo`}
            width={72}
            height={72}
            className="object-contain p-2"
            unoptimized
          />
        </a>

        {/* Company name */}
        <div className="text-center">
          <p className="text-white font-semibold text-base leading-tight">{entry.company}</p>
          <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">
            {entry.startDate} — {entry.endDate}
          </p>
        </div>
      </div>

      {/* ── RIGHT: scrolling content panel ───────────────────────────────── */}
      <motion.div
        style={{ opacity, y: translateY }}
        className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-24"
      >
        {/* Role + meta */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
            {entry.role}
          </h3>
          <p className="text-white/50 text-sm">
            {entry.company} · {entry.location} · {entry.startDate} – {entry.endDate}
          </p>
        </div>

        {/* Bullet list */}
        <ul className="space-y-4 max-w-2xl">
          {entry.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: 'easeOut' }}
              className="flex gap-3 text-white/70 text-sm md:text-base leading-relaxed"
            >
              {/* Accent dot */}
              <span
                className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-[#3b82d4] shrink-0"
                aria-hidden="true"
              />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WorkHistory — section wrapper
// ---------------------------------------------------------------------------
export function WorkHistory() {
  return (
    <section
      aria-label="Work experience"
      data-testid="work-history-section"
      className="relative w-full bg-[#060612] text-white"
    >
      {/* Section header */}
      <div className="relative z-10 px-8 md:px-16 pt-20 pb-12 border-b border-white/10">
        <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-3">02 — Experience</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Work History
        </h2>
      </div>

      {/* Entry cards */}
      {workHistory.map((entry) => (
        <WorkEntryCard key={entry.company} entry={entry} />
      ))}

      {/* Bottom spacer */}
      <div className="h-16 border-t border-white/10" />
    </section>
  );
}
