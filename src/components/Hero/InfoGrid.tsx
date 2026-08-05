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

import { identity } from '@/lib/data';

interface Tile {
  emoji: string;
  label: string;
  value: string;
  href?: string;
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
    emoji: '🎓',
    label: 'Education',
    value: identity.degree,
    testId: 'education',
  },
  {
    emoji: '⚡',
    label: 'Experience',
    value: identity.experience,
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
    emoji: '📸',
    label: 'Instagram',
    value: '@d3llaringa',
    href: identity.instagram,
    testId: 'instagram',
  },
];

export function InfoGrid() {
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
                {tile.value}
              </span>
            </div>
          </div>
        );

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
