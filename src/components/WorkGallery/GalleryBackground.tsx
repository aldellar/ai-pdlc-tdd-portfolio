'use client';

/**
 * GalleryBackground
 *
 * Same drifting-orb aesthetic as MagneticBackground but with one key
 * difference: each orb's hue slowly rotates over time, producing smooth
 * colour transitions as the user scrolls through the gallery.
 *
 * No cursor interaction — purely autonomous drift + hue cycle.
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Orb {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  driftPhase: number;
  driftAmp: number;
  driftSpeed: number;
  /** Starting hue (0–360) */
  hue: number;
  /** How fast the hue rotates — degrees per second equivalent */
  hueSpeed: number;
  saturation: number;
  lightness: number;
}

const ORBS: Orb[] = [
  { baseX: 0.10, baseY: 0.25, x: 0.10, y: 0.25, size: 0.75, driftPhase: 0.0, driftAmp: 0.10, driftSpeed: 0.50, hue:   0, hueSpeed: 0.18, saturation: 90, lightness: 55 },
  { baseX: 0.35, baseY: 0.10, x: 0.35, y: 0.10, size: 0.70, driftPhase: 1.2, driftAmp: 0.09, driftSpeed: 0.45, hue:  45, hueSpeed: 0.14, saturation: 95, lightness: 55 },
  { baseX: 0.70, baseY: 0.15, x: 0.70, y: 0.15, size: 0.72, driftPhase: 2.4, driftAmp: 0.10, driftSpeed: 0.55, hue: 120, hueSpeed: 0.16, saturation: 80, lightness: 50 },
  { baseX: 0.90, baseY: 0.50, x: 0.90, y: 0.50, size: 0.70, driftPhase: 0.8, driftAmp: 0.08, driftSpeed: 0.40, hue: 200, hueSpeed: 0.20, saturation: 85, lightness: 55 },
  { baseX: 0.65, baseY: 0.85, x: 0.65, y: 0.85, size: 0.72, driftPhase: 3.1, driftAmp: 0.09, driftSpeed: 0.48, hue: 260, hueSpeed: 0.15, saturation: 85, lightness: 55 },
  { baseX: 0.30, baseY: 0.85, x: 0.30, y: 0.85, size: 0.70, driftPhase: 1.7, driftAmp: 0.10, driftSpeed: 0.52, hue: 310, hueSpeed: 0.17, saturation: 90, lightness: 55 },
  { baseX: 0.08, baseY: 0.70, x: 0.08, y: 0.70, size: 0.68, driftPhase: 2.9, driftAmp: 0.08, driftSpeed: 0.42, hue: 170, hueSpeed: 0.13, saturation: 80, lightness: 50 },
  { baseX: 0.50, baseY: 0.50, x: 0.50, y: 0.50, size: 0.65, driftPhase: 0.4, driftAmp: 0.07, driftSpeed: 0.35, hue:  80, hueSpeed: 0.19, saturation: 85, lightness: 52 },
];

export function GalleryBackground() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);
  const orbsRef        = useRef<Orb[]>(ORBS.map(o => ({ ...o })));
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
      const dim = Math.max(W, H);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#060612';
      ctx.fillRect(0, 0, W, H);

      t += prefersReduced ? 0.0003 : 0.0025;

      orbsRef.current.forEach((orb) => {
        // Drift position
        const driftX = Math.sin(t * orb.driftSpeed + orb.driftPhase) * orb.driftAmp;
        const driftY = Math.cos(t * orb.driftSpeed * 0.73 + orb.driftPhase + 1.1) * orb.driftAmp;
        orb.x = orb.baseX + driftX;
        orb.y = orb.baseY + driftY;

        // Slowly rotate hue
        const currentHue = (orb.hue + t * orb.hueSpeed * 60) % 360;

        const cx = orb.x * W;
        const cy = orb.y * H;
        const r  = orb.size * dim;

        const base  = `hsla(${currentHue}, ${orb.saturation}%, ${orb.lightness}%,`;
        const grad  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    `${base}0.85)`);
        grad.addColorStop(0.30, `${base}0.55)`);
        grad.addColorStop(0.60, `${base}0.18)`);
        grad.addColorStop(1,    `${base}0)`);

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
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
