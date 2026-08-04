'use client';

/**
 * MotionSmokeTest — S0 AC11
 *
 * Minimal `'use client'` component that renders a single `motion.div`.
 * Its sole purpose is to prove Framer Motion 11.x is installed and
 * works inside a Next.js App Router client component boundary.
 *
 * Not used anywhere in the production UI — exists only to satisfy the
 * S0 test. Can be deleted once the real animated components are built.
 *
 * RED: This file will cause a compile error until `framer-motion` is installed.
 */
import { motion } from 'framer-motion';

export function MotionSmokeTest() {
  return (
    <motion.div
      data-testid="motion-smoke"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
}
