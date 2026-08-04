'use client';

/**
 * ScrambleText — S1 AC10
 *
 * REFACTOR: On mount, cycles each character position through random chars
 * before resolving to the final letter. Respects prefers-reduced-motion —
 * renders text directly with no animation when motion is reduced.
 */

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const CYCLES_PER_CHAR = 6;   // how many random frames before resolving
const FRAME_INTERVAL = 40;   // ms between frames

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!text) return;

    // Respect prefers-reduced-motion — skip scramble entirely.
    // No setState needed: display is already initialised to `text`.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    let frame = 0;
    const totalFrames = text.length * CYCLES_PER_CHAR;

    frameRef.current = setInterval(() => {
      frame++;

      const resolved = Math.floor(frame / CYCLES_PER_CHAR);
      const scrambled = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < resolved) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (frame >= totalFrames) {
        setDisplay(text);
        if (frameRef.current) clearInterval(frameRef.current);
      }
    }, FRAME_INTERVAL);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  // text is stable — only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span data-testid="scramble-text" className={className} aria-label={text}>
      {display}
    </span>
  );
}
