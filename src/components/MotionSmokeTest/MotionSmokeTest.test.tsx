/**
 * S0 — AC11
 * Verifies that Framer Motion 11.x is installed and a `motion.div` renders
 * without a runtime error inside a `'use client'` component boundary.
 *
 * RED: This test will fail until:
 *   1. The project is scaffolded (`pnpm create next-app`)
 *   2. Framer Motion is installed (`pnpm add framer-motion`)
 *   3. The MotionSmokeTest component exists at the path below
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MotionSmokeTest } from './MotionSmokeTest';

describe('S0 — AC11: Framer Motion smoke test', () => {
  it('renders a motion.div without throwing a runtime error', () => {
    // If framer-motion is not installed or the component throws,
    // this render call will throw and the test will fail.
    expect(() => render(<MotionSmokeTest />)).not.toThrow();
  });

  it('renders the motion.div element into the DOM', () => {
    render(<MotionSmokeTest />);
    // The component must render a div with data-testid="motion-smoke"
    expect(screen.getByTestId('motion-smoke')).toBeDefined();
  });
});
