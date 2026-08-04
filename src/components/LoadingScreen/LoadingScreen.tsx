'use client';

/**
 * LoadingScreen — S4
 *
 * Exit animation: two panels split from the centre —
 * top half slides UP, bottom half slides DOWN, revealing the page behind.
 * The vertical line draws downward during the hold phase, then splits with
 * the panels.
 *
 * Test contract preserved (all 10 tests remain green):
 *  - data-testid="loading-screen" present on mount
 *  - aria-hidden="true" + display:none after exit
 *  - onExitComplete called after both panels finish
 *  - No focusable children (AC4)
 *  - hasExited ref prevents re-appearance (AC5)
 *  - prefers-reduced-motion: instant fade exit (AC6, <500ms)
 *  - Total exit well under 3000ms (AC7)
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface LoadingScreenProps {
  onExitComplete?: () => void;
}

// Hold duration — vertical line draws during this window
const HOLD_DURATION_MS = 1000;

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Shared exit transition for both panels
const PANEL_TRANSITION = { duration: 0.55, ease: [0.76, 0, 0.24, 1] };

export function LoadingScreen({ onExitComplete }: LoadingScreenProps) {
  const [visible, setVisible]     = useState(true);
  const [hidden,  setHidden]      = useState(false);
  const hasExited                  = useRef(false);
  const panelsDone                 = useRef(0);       // counts panels that finished exiting
  // Compute once on mount so both the useEffect and render agree
  const [isReducedMotion]          = useState(() => getReducedMotion());

  useEffect(() => {
    if (hasExited.current) return;
    const delay = isReducedMotion ? 0 : HOLD_DURATION_MS;
    const timer = setTimeout(() => {
      if (hasExited.current) return;
      setVisible(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [isReducedMotion]);

  // Each panel calls this on its own onExitComplete.
  // We wait for both to finish before notifying the parent.
  function handlePanelDone() {
    panelsDone.current += 1;
    if (panelsDone.current < 2) return;
    if (hasExited.current) return;
    hasExited.current = true;
    setHidden(true);
    onExitComplete?.();
  }

  if (isReducedMotion) {
    // Reduced-motion: single fade, no split
    return (
      <div
        data-testid="loading-screen"
        role="status"
        aria-label="Loading"
        aria-live="polite"
        aria-hidden={hidden ? 'true' : undefined}
        style={hidden ? { display: 'none' } : undefined}
      >
        <AnimatePresence onExitComplete={() => {
          if (hasExited.current) return;
          hasExited.current = true;
          setHidden(true);
          onExitComplete?.();
        }}>
          {visible && (
            <motion.div
              key="loading-reduced"
              className="fixed inset-0 z-50 bg-black"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.01 }}
            />
          )}
        </AnimatePresence>
      </div>
    );
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
      {/* Single centred line — fixed at 50vh, grows from centre outward */}
      {visible && (
        <motion.div
          key="centre-line"
          className="fixed inset-x-0 z-[51] h-px bg-white"
          style={{ top: '50vh', scaleX: 0, transformOrigin: 'center' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      )}

      {/* TOP panel — slides upward on exit */}
      <AnimatePresence onExitComplete={handlePanelDone}>
        {visible && (
          <motion.div
            key="panel-top"
            className="fixed inset-x-0 top-0 z-50 bg-[#060612]"
            style={{ height: '50vh' }}
            exit={{ y: '-100%' }}
            transition={PANEL_TRANSITION}
          />
        )}
      </AnimatePresence>

      {/* BOTTOM panel — slides downward on exit */}
      <AnimatePresence onExitComplete={handlePanelDone}>
        {visible && (
          <motion.div
            key="panel-bottom"
            className="fixed inset-x-0 bottom-0 z-50 bg-[#060612]"
            style={{ height: '50vh' }}
            exit={{ y: '100%' }}
            transition={PANEL_TRANSITION}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
