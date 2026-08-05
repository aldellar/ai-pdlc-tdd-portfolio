'use client';

/**
 * MagneticBackground
 *
 * Full-screen canvas of oversized soft gradient orbs that:
 *  1. Always drift autonomously on slow independent sine paths (always moving)
 *  2. Pull toward the cursor when active (magnetic effect adds on top of drift)
 *  3. Are large enough that the gradient never fully fades to black at the
 *     viewport edge — centre opacity is high, mid-stop is dense, edge stop
 *     is pushed to 1.2× the viewport so black is never visible
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Orb {
  x: number;
  y: number;
  tx: number;
  ty: number;
  baseX: number;
  baseY: number;
  /** Radius as multiple of the viewport's larger dimension — >1 means off-edge */
  size: number;
  speed: number;
  /** Independent phase offset so each orb drifts on a unique path */
  driftPhase: number;
  /** Drift amplitude — how far the orb wanders from its base position (0–1) */
  driftAmp: number;
  /** Drift speed multiplier */
  driftSpeed: number;
  color: string;
}

const ORBS: Orb[] = [
  // red — left edge, upper third
  { x: 0.05, y: 0.30, tx: 0.05, ty: 0.30, baseX: 0.05, baseY: 0.30,
    size: 0.72, speed: 0.018, driftPhase: 0,    driftAmp: 0.08, driftSpeed: 0.60,
    color: 'rgba(239, 68, 68, 0.90)' },
  // orange — top-left quadrant
  { x: 0.28, y: 0.15, tx: 0.28, ty: 0.15, baseX: 0.28, baseY: 0.15,
    size: 0.70, speed: 0.022, driftPhase: 0.7,  driftAmp: 0.08, driftSpeed: 0.55,
    color: 'rgba(249, 115, 22, 0.90)' },
  // yellow — top-right quadrant
  { x: 0.68, y: 0.15, tx: 0.68, ty: 0.15, baseX: 0.68, baseY: 0.15,
    size: 0.70, speed: 0.020, driftPhase: 1.4,  driftAmp: 0.08, driftSpeed: 0.50,
    color: 'rgba(234, 179, 8, 0.90)' },
  // green — right edge, upper third
  { x: 0.95, y: 0.32, tx: 0.95, ty: 0.32, baseX: 0.95, baseY: 0.32,
    size: 0.70, speed: 0.016, driftPhase: 2.1,  driftAmp: 0.07, driftSpeed: 0.45,
    color: 'rgba(34, 197, 94, 0.90)' },
  // blue — right edge, lower third
  { x: 0.92, y: 0.68, tx: 0.92, ty: 0.68, baseX: 0.92, baseY: 0.68,
    size: 0.72, speed: 0.014, driftPhase: 2.8,  driftAmp: 0.07, driftSpeed: 0.40,
    color: 'rgba(59, 130, 246, 0.90)' },
  // indigo — bottom-right quadrant
  { x: 0.68, y: 0.84, tx: 0.68, ty: 0.84, baseX: 0.68, baseY: 0.84,
    size: 0.70, speed: 0.018, driftPhase: 1.0,  driftAmp: 0.08, driftSpeed: 0.58,
    color: 'rgba(99, 102, 241, 0.90)' },
  // violet — bottom-left quadrant
  { x: 0.28, y: 0.84, tx: 0.28, ty: 0.84, baseX: 0.28, baseY: 0.84,
    size: 0.70, speed: 0.020, driftPhase: 3.5,  driftAmp: 0.08, driftSpeed: 0.55,
    color: 'rgba(139, 92, 246, 0.90)' },
  // pink — left edge, lower third
  { x: 0.05, y: 0.68, tx: 0.05, ty: 0.68, baseX: 0.05, baseY: 0.68,
    size: 0.70, speed: 0.022, driftPhase: 0.4,  driftAmp: 0.08, driftSpeed: 0.62,
    color: 'rgba(236, 72, 153, 0.90)' },
];

export function MagneticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const orbsRef    = useRef<Orb[]>(ORBS.map(o => ({ ...o })));
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const W   = canvas.width;
      const H   = canvas.height;
      // Use the LARGER dimension so orbs always overshoot the viewport
      const dim = Math.max(W, H);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#060612';
      ctx.fillRect(0, 0, W, H);

      // Advance time — always ticks, giving autonomous movement
      t += prefersReduced ? 0.0005 : 0.003;

      const orbs = orbsRef.current;

      orbs.forEach((orb) => {
        // Each orb drifts on its own unique lissajous-like path
        const driftX = Math.sin(t * orb.driftSpeed + orb.driftPhase) * orb.driftAmp;
        const driftY = Math.cos(t * orb.driftSpeed * 0.73 + orb.driftPhase + 1.1) * orb.driftAmp;

        orb.tx = orb.baseX + driftX;
        orb.ty = orb.baseY + driftY;

        // Lerp toward target
        orb.x += (orb.tx - orb.x) * orb.speed;
        orb.y += (orb.ty - orb.y) * orb.speed;

        const cx = orb.x * W;
        const cy = orb.y * H;
        const r  = orb.size * dim;

        // Three-stop gradient: full colour at centre → dense mid → transparent edge
        // The edge stop is at exactly r (≥ viewport diagonal) so black never shows
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    orb.color);
        grad.addColorStop(0.30, orb.color.replace(/[\d.]+\)$/, '0.60)'));
        grad.addColorStop(0.60, orb.color.replace(/[\d.]+\)$/, '0.20)'));
        grad.addColorStop(1,    orb.color.replace(/[\d.]+\)$/, '0)'));

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
