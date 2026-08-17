'use client';

/**
 * PhotoTicker — S1 AC6 / AC7
 *
 * 3-column vertical auto-scroll strip. Each column gets a slice of the photos
 * array, doubled for a seamless CSS loop. Fixed item height ensures the
 * -50% translateY lands exactly at the seam with no teleport.
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
const ITEM_H = 380;   // px — fixed height per photo
const GAP    = 14;    // px — gap between photos

// Speeds: seconds to scroll through the full original list once
const DURATIONS = [45, 45, 45]; // all same speed

export function PhotoTicker({ photos, className }: PhotoTickerProps) {
  const reduceMotion = useReducedMotion();
  const columns = splitIntoColumns(photos, COLUMN_COUNT);

  return (
    <div
      data-testid="photo-ticker"
      className={`flex gap-3 overflow-hidden ${className ?? ''}`}
    >
      {columns.map((col, colIndex) => {
        if (col.length === 0) return null;

        // Double the list — scroll animates exactly -50% (one full copy)
        const items = reduceMotion ? col : [...col, ...col];

        // Total height of one copy = N items × (ITEM_H + GAP) - GAP
        const copyH = col.length * (ITEM_H + GAP) - GAP;

        const animStyle: React.CSSProperties = reduceMotion ? {} : {
          animation: `photo-scroll-${colIndex} ${DURATIONS[colIndex]}s linear infinite`,
        };

        return (
          <div key={colIndex} className="relative flex-1 overflow-hidden">
            <style>{`
              @keyframes photo-scroll-${colIndex} {
                from { transform: translateY(0); }
                to   { transform: translateY(-${copyH}px); }
              }
            `}</style>
            <div
              data-testid="photo-column"
              style={{ display: 'flex', flexDirection: 'column', gap: GAP, ...animStyle }}
            >
              {items.map((src, imgIndex) => (
                <div
                  key={`${src}-${imgIndex}`}
                  style={{ position: 'relative', width: '100%', height: ITEM_H, flexShrink: 0 }}
                >
                  <Image
                    src={src}
                    alt={`Photo ${imgIndex % col.length + 1}`}
                    fill
                    className="rounded-md object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
