'use client';

/**
 * LoadingScreen — S4
 *
 * GREEN phase: plain useEffect implementation that satisfies all test
 * contracts. Framer Motion line-reveal animation is added in the REFACTOR
 * phase once all 10 tests are green.
 *
 * Behaviour:
 *  - Mounts visible immediately (AC1)
 *  - Checks prefers-reduced-motion on mount:
 *      • reduced motion → calls onExitComplete on next tick (AC6, <500ms)
 *      • normal          → calls onExitComplete after 1800ms (AC7, <3000ms)
 *  - On exit: sets aria-hidden="true" + records hasExited so re-renders
 *    keep the element hidden (AC3, AC5)
 *  - Never traps focus — no focusable children (AC4)
 */

import { useEffect, useRef, useState } from 'react';

export interface LoadingScreenProps {
  onExitComplete?: () => void;
}

// Duration in ms before the loading screen exits in normal motion mode.
// Must be under 3000ms to satisfy AC7.
const EXIT_DELAY_MS = 1800;

export function LoadingScreen({ onExitComplete }: LoadingScreenProps) {
  const [hidden, setHidden] = useState(false);
  // Ref so the exit fires only once even if the component re-renders (AC5)
  const hasExited = useRef(false);

  useEffect(() => {
    if (hasExited.current) return;

    // Detect prefers-reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Delay is 0 for reduced motion (exits on next tick), 1800ms otherwise
    const delay = prefersReduced ? 0 : EXIT_DELAY_MS;

    const timer = setTimeout(() => {
      if (hasExited.current) return;
      hasExited.current = true;
      setHidden(true);
      onExitComplete?.();
    }, delay);

    return () => clearTimeout(timer);
  // onExitComplete is intentionally excluded — we only want this to run once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-testid="loading-screen"
      role="status"
      aria-label="Loading"
      aria-live="polite"
      aria-hidden={hidden ? 'true' : undefined}
      style={hidden ? { display: 'none' } : undefined}
    />
  );
}
