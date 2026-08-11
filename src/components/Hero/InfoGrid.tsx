'use client';

/**
 * InfoGrid — 3 rows × 2 columns identity / contact tiles
 *
 *   Row 1: Work          | Education
 *   Row 2: Experience    | Email
 *   Row 3: LinkedIn      | Instagram
 *
 * Invisible grid — no visible borders or backgrounds.
 * Each tile has an emoji icon on the left.
 */

import { useEffect, useState } from 'react';
import { identity } from '@/lib/data';

// Earliest professional start date — What's The Move, Mar 2025
const CAREER_START = new Date('2025-03-01T00:00:00');

function calcYears(): number {
  return (Date.now() - CAREER_START.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

function titleFromYears(y: number): string {
  if (y < 2)  return 'Junior Developer';
  if (y < 5)  return 'Mid-level Developer';
  if (y < 8)  return 'Senior Developer';
  if (y < 12) return 'Staff Engineer';
  return 'Principal Engineer';
}

function formatExp(): string {
  const y = calcYears();
  return `${titleFromYears(y)} — ${y.toFixed(2)} yrs`;
}

interface Tile {
  emoji: string;
  label: string;
  value: string;
  href?: string;
  /** If set, clicking smoothly scrolls to the element with this id */
  scrollTo?: string;
  testId: string;
}

const TILES: Tile[] = [
  {
    emoji: '💼',
    label: 'Work',
    value: identity.title,
    href: 'https://www.ibm.com',
    testId: 'work',
  },
  {
    emoji: '🗂️',
    label: 'Projects',
    value: 'Personal Projects',
    scrollTo: 'projects-section',
    testId: 'projects',
  },
  {
    emoji: '⚡',
    label: 'Experience',
    value: '', // replaced by live value below
    scrollTo: 'work-gallery',
    testId: 'experience',
  },
  {
    emoji: '✉️',
    label: 'Email',
    value: identity.email,
    href: `mailto:${identity.email}`,
    testId: 'email',
  },
  {
    emoji: '🔗',
    label: 'LinkedIn',
    value: 'andrewdellaringa',
    href: identity.linkedin,
    testId: 'linkedin',
  },
  {
    emoji: '📄',
    label: 'Résumé',
    value: 'August 2026',
    href: '/resume.pdf',
    testId: 'resume',
  },
];

export function InfoGrid() {
  const [expLabel, setExpLabel] = useState(formatExp);

  useEffect(() => {
    // Update every second so the decimal ticks live
    const id = setInterval(() => setExpLabel(formatExp()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-testid="info-grid"
      className="grid grid-cols-2 gap-x-16 gap-y-6"
    >
      {TILES.map((tile) => {
        const inner = (
          <div className="relative flex items-start gap-4 py-2">
            {/* scrim — sits only behind the emoji + text, dissolves outward */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background: 'radial-gradient(ellipse 120% 140% at 30% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
                filter: 'blur(8px)',
              }}
            />
            <span className="relative text-3xl leading-none mt-1 shrink-0" aria-hidden="true">
              {tile.emoji}
            </span>
            <div className="relative flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-widest text-white/60 mb-0.5">
                {tile.label}
              </span>
              <span className="text-base font-semibold text-white leading-snug drop-shadow-sm">
                {tile.testId === 'experience' ? expLabel : tile.value}
              </span>
            </div>
          </div>
        );

        if (tile.scrollTo) {
          const id = tile.scrollTo;
          return (
            <button
              key={tile.testId}
              data-testid={`info-tile-${tile.testId}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-left hover:opacity-70 transition-opacity duration-150 cursor-pointer"
            >
              {inner}
            </button>
          );
        }

        if (tile.href) {
          return (
            <a
              key={tile.testId}
              data-testid={`info-tile-${tile.testId}`}
              href={tile.href}
              target={tile.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={tile.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="hover:opacity-70 transition-opacity duration-150"
            >
              {inner}
            </a>
          );
        }

        return (
          <div
            key={tile.testId}
            data-testid={`info-tile-${tile.testId}`}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
