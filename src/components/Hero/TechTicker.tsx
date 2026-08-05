'use client';

/**
 * TechTicker — S1 AC4 / AC5 / AC8
 *
 * REFACTOR: Infinite horizontal marquee. Duplicates the icon list to create
 * a seamless loop. Pauses on hover. Respects prefers-reduced-motion.
 */

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import type { TechIcon } from '@/lib/types';

interface TechTickerProps {
  icons: TechIcon[];
  className?: string;
}

export function TechTicker({ icons, className }: TechTickerProps) {
  const reduceMotion = useReducedMotion();

  // Duplicate list for seamless loop (CSS animation wraps back to start)
  const items = reduceMotion ? icons : [...icons, ...icons];

  return (
    <div
      data-testid="tech-ticker"
      className={`overflow-hidden flex justify-center ${className ?? ''}`}
    >
      <div
        className={[
          'flex gap-8 w-max',
          reduceMotion ? '' : 'animate-ticker hover:[animation-play-state:paused]',
        ].join(' ')}
        style={reduceMotion ? undefined : { transform: 'translateX(-25%)' }}
      >
        {items.map((icon, index) => (
          <span
            key={`${icon.label}-${index}`}
            data-testid="tech-icon"
            aria-label={icon.label}
            title={icon.label}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <Image
              src={icon.src}
              alt={icon.label}
              width={32}
              height={32}
              unoptimized
            />
          </span>
        ))}
      </div>
    </div>
  );
}
