'use client';

/**
 * PageBackground
 *
 * Single fixed full-screen canvas that lives behind the entire page.
 * Replaces the per-section MagneticBackground and GalleryBackground canvases.
 *
 * Behaviour:
 *  - 8 orbs drift autonomously on independent sine paths (same as MagneticBackground)
 *  - Each orb's hue slowly rotates over time (same as GalleryBackground)
 *  - Responds to cursor movement with a magnetic pull (from MagneticBackground)
 *  - Fixed positioning means it never moves — sections scroll over it transparently
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Orb {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  speed: number;
  driftPhase: number;
  driftAmp: number;
  driftSpeed: number;
  hue: number;
  hueSpeed: number;
  saturation: number;
  lightness: number;
}

const ORBS: Orb[] = [
  { baseX: 0.05, baseY: 0.30, x: 0.05, y: 0.30, tx: 0.05, ty: 0.30, size: 0.72, speed: 0.018, driftPhase: 0.0, driftAmp: 0.09, driftSpeed: 0.50, hue:   0, hueSpeed: 0.12, saturation: 90, lightness: 55 },
  { baseX: 0.28, baseY: 0.15, x: 0.28, y: 0.15, tx: 0.28, ty: 0.15, size: 0.70, speed: 0.022, driftPhase: 1.2, driftAmp: 0.09, driftSpeed: 0.45, hue:  45, hueSpeed: 0.10, saturation: 95, lightness: 55 },
  { baseX: 0.70, baseY: 0.15, x: 0.70, y: 0.15, tx: 0.70, ty: 0.15, size: 0.72, speed: 0.020, driftPhase: 2.4, driftAmp: 0.09, driftSpeed: 0.55, hue: 120, hueSpeed: 0.11, saturation: 80, lightness: 50 },
  { baseX: 0.95, baseY: 0.50, x: 0.95, y: 0.50, tx: 0.95, ty: 0.50, size: 0.70, speed: 0.016, driftPhase: 0.8, driftAmp: 0.08, driftSpeed: 0.40, hue: 200, hueSpeed: 0.13, saturation: 85, lightness: 55 },
  { baseX: 0.65, baseY: 0.85, x: 0.65, y: 0.85, tx: 0.65, ty: 0.85, size: 0.72, speed: 0.014, driftPhase: 3.1, driftAmp: 0.08, driftSpeed: 0.48, hue: 260, hueSpeed: 0.10, saturation: 85, lightness: 55 },
  { baseX: 0.28, baseY: 0.85, x: 0.28, y: 0.85, tx: 0.28, ty: 0.85, size: 0.70, speed: 0.018, driftPhase: 1.7, driftAmp: 0.09, driftSpeed: 0.52, hue: 310, hueSpeed: 0.12, saturation: 90, lightness: 55 },
  { baseX: 0.08, baseY: 0.70, x: 0.08, y: 0.70, tx: 0.08, ty: 0.70, size: 0.68, speed: 0.020, driftPhase: 2.9, driftAmp: 0.08, driftSpeed: 0.42, hue: 170, hueSpeed: 0.09, saturation: 80, lightness: 50 },
  { baseX: 0.50, baseY: 0.50, x: 0.50, y: 0.50, tx: 0.50, ty: 0.50, size: 0.65, speed: 0.022, driftPhase: 0.4, driftAmp: 0.07, driftSpeed: 0.35, hue:  80, hueSpeed: 0.11, saturation: 85, lightness: 52 },
];

const MOUSE_RADIUS   = 320;
const MOUSE_STRENGTH = 0.015;

export function PageBackground() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);
  const orbsRef        = useRef<Orb[]>(ORBS.map(o => ({ ...o })));
  const mouseRef       = useRef({ x: -9999, y: -9999, active: false });
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

    function onMove(e: MouseEvent) {
      if (prefersReduced) return;
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }
    function onLeave() { mouseRef.current.active = false; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    let t = 0;

    // Total scrollable height — used to normalise scroll position to 0–1
    function getScrollRatio() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W   = canvas.width;
      const H   = canvas.height;
      const dim = Math.max(W, H);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#060612';
      ctx.fillRect(0, 0, W, H);

      t += prefersReduced ? 0.0003 : 0.0022;

      // Scroll-driven hue shift — 0 at top, +180° at bottom of page
      const scrollHueShift = getScrollRatio() * 180;

      const mx          = mouseRef.current.x;
      const my          = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && !prefersReduced;

      orbsRef.current.forEach((orb) => {
        // Autonomous sine drift
        const driftX = Math.sin(t * orb.driftSpeed + orb.driftPhase) * orb.driftAmp;
        const driftY = Math.cos(t * orb.driftSpeed * 0.73 + orb.driftPhase + 1.1) * orb.driftAmp;
        orb.tx = orb.baseX + driftX;
        orb.ty = orb.baseY + driftY;

        // Magnetic pull toward cursor
        if (mouseActive) {
          const cx = orb.tx * W;
          const cy = orb.ty * H;
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
            orb.tx += (dx / dist) * force * dist / W;
            orb.ty += (dy / dist) * force * dist / H;
          }
        }

        // Lerp toward target
        orb.x += (orb.tx - orb.x) * orb.speed;
        orb.y += (orb.ty - orb.y) * orb.speed;

        // Time-based hue rotation + scroll-driven shift
        const currentHue = (orb.hue + t * orb.hueSpeed * 60 + scrollHueShift) % 360;

        const px = orb.x * W;
        const py = orb.y * H;
        const r  = orb.size * dim;

        const base = `hsla(${currentHue}, ${orb.saturation}%, ${orb.lightness}%,`;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
        grad.addColorStop(0,    `${base}0.88)`);
        grad.addColorStop(0.30, `${base}0.58)`);
        grad.addColorStop(0.60, `${base}0.20)`);
        grad.addColorStop(1,    `${base}0)`);

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
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
