'use client';

/**
 * LoadingScreen — S4
 *
 * Stub component that satisfies the test contract.
 * The real implementation (Framer Motion line-reveal, AnimatePresence exit)
 * is added in the REFACTOR phase after all tests are GREEN.
 *
 * Props:
 *   onExitComplete — called when the loading screen has finished exiting.
 *                    Used by tests to simulate and assert exit behaviour.
 */

export interface LoadingScreenProps {
  onExitComplete?: () => void;
}

export function LoadingScreen({ onExitComplete }: LoadingScreenProps) {
  return (
    <div
      data-testid="loading-screen"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    />
  );
}
