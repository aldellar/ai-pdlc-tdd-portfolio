'use client';

/**
 * PhotoTicker — S1 AC6 / AC7
 *
 * REFACTOR: 3-column vertical auto-scroll strip. Each column scrolls at a
 * different speed. Columns duplicate their photo list for a seamless loop.
 * Respects prefers-reduced-motion.
 */

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

interface PhotoTickerProps {
  photos: string[];
  className?: string;
}

function splitIntoColumns(items: string[], count: number): string[][] {
  const cols: string[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

const COLUMN_COUNT = 3;
// Different animation durations per column for staggered feel
const COLUMN_DURATIONS = ['animate-scroll-slow', 'animate-scroll-medium', 'animate-scroll-fast'];

export function PhotoTicker({ photos, className }: PhotoTickerProps) {
  const reduceMotion = useReducedMotion();
  const columns = splitIntoColumns(photos, COLUMN_COUNT);

  return (
    <div
      data-testid="photo-ticker"
      className={`flex gap-4 justify-center overflow-hidden ${className ?? ''}`}
    >
      {columns.map((col, colIndex) => {
        // Duplicate for seamless loop unless reduced motion
        const items = reduceMotion || col.length === 0 ? col : [...col, ...col];

        return (
          <div
            key={colIndex}
            data-testid="photo-column"
            className={[
              'flex flex-col gap-4',
              reduceMotion ? '' : COLUMN_DURATIONS[colIndex] ?? '',
            ].join(' ')}
          >
            {items.map((src, imgIndex) => (
              <Image
                key={`${src}-${imgIndex}`}
                src={src}
                alt={`Photo ${colIndex * COLUMN_COUNT + (imgIndex % col.length) + 1}`}
                width={200}
                height={280}
                className="rounded-lg object-cover w-full"
                unoptimized
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
