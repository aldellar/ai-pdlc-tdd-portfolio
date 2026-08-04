'use client';

/**
 * LoadingScreen — S4 REFACTOR (complete)
 *
 * Visual: full-screen black overlay with a horizontal line that sweeps
 * from left to right (line-reveal), then the overlay slides up off-screen
 * and exits. AnimatePresence drives the unmount transition.
 *
 * Test contract preserved:
 *  - data-testid="loading-screen" present on mount
 *  - aria-hidden="true" set after exit (hidden state)
 *  - onExitComplete called after AnimatePresence onExitComplete fires
 *  - No focusable children (AC4)
 *  - hasExited ref prevents re-appearance (AC5)
 *  - prefers-reduced-motion: skips animation, exits immediately (AC6)
 *  - Exit completes within 3000ms (AC7 — line sweep 800ms + slide 400ms = 1200ms)
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface LoadingScreenProps {
  onExitComplete?: () => void;
}

// Total visible duration before the exit animation begins.
// Line sweep (800ms) plays during this window.
// Must keep total time well under 3000ms for AC7.
const HOLD_DURATION_MS = 900;

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function LoadingScreen({ onExitComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const hasExited = useRef(false);
  // useReducedMotion for animation variant selection (visual only)
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (hasExited.current) return;

    // Use matchMedia directly so the test mock is respected for timing logic
    const delay = getReducedMotion() ? 0 : HOLD_DURATION_MS;

    const timer = setTimeout(() => {
      if (hasExited.current) return;
      setVisible(false); // triggers AnimatePresence exit animation
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Called by AnimatePresence once the exit animation fully completes
  function handleExitComplete() {
    if (hasExited.current) return;
    hasExited.current = true;
    setHidden(true);
    onExitComplete?.();
  }

  return (
    <div
      data-testid="loading-screen"
      role="status"
      aria-label="Loading"
      aria-live="polite"
      aria-hidden={hidden ? 'true' : undefined}
      style={hidden ? { display: 'none' } : undefined}
    >
      <AnimatePresence onExitComplete={handleExitComplete}>
        {visible && (
          <motion.div
            key="loading-overlay"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: '-100%' }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
            }
          >
            {/* Line-reveal bar — sweeps left to right */}
            {!prefersReducedMotion && (
              <motion.div
                className="h-px w-full max-w-sm bg-white"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
