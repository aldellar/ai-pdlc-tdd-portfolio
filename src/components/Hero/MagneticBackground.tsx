'use client';

/**
 * MagneticBackground
 *
 * Full-screen canvas of large soft gradient orbs that drift toward the
 * cursor. The Apple AI colour palette: deep purple, vivid pink/magenta,
 * electric blue, cyan/teal — all semi-transparent so the photo strip
 * underneath remains visible.
 *
 * Implementation:
 *  - Each orb has a natural position and a target position (cursor).
 *  - On mousemove the target shifts; each orb lerps toward it at its own
 *    speed, creating a staggered magnetic pull.
 *  - On no mouse activity (touch / reduced motion) the orbs drift slowly
 *    using a sine-wave path so the background is never static.
 *  - Respects prefers-reduced-motion — disables cursor tracking and slows
 *    drift to a near-stop.
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Orb {
  x: number;        // current x (0–1 of viewport)
  y: number;        // current y (0–1 of viewport)
  tx: number;       // target x
  ty: number;       // target y
  baseX: number;    // resting x
  baseY: number;    // resting y
  size: number;     // radius as fraction of viewport min-dimension
  speed: number;    // lerp factor toward cursor (0–1)
  drift: number;    // phase offset for idle sine drift
  color: string;    // CSS rgba colour
}

const ORBS: Orb[] = [
  { x: 0.2,  y: 0.3,  tx: 0.2,  ty: 0.3,  baseX: 0.2,  baseY: 0.3,  size: 0.55, speed: 0.028, drift: 0,    color: 'rgba(139, 92, 246, 0.55)'  }, // purple
  { x: 0.75, y: 0.2,  tx: 0.75, ty: 0.2,  baseX: 0.75, baseY: 0.2,  size: 0.5,  speed: 0.018, drift: 1.2,  color: 'rgba(236, 72, 153, 0.50)'  }, // pink
  { x: 0.5,  y: 0.65, tx: 0.5,  ty: 0.65, baseX: 0.5,  baseY: 0.65, size: 0.6,  speed: 0.012, drift: 2.5,  color: 'rgba(59, 130, 246, 0.50)'  }, // blue
  { x: 0.85, y: 0.7,  tx: 0.85, ty: 0.7,  baseX: 0.85, baseY: 0.7,  size: 0.42, speed: 0.022, drift: 0.7,  color: 'rgba(20, 184, 166, 0.45)'  }, // teal
  { x: 0.1,  y: 0.75, tx: 0.1,  ty: 0.75, baseX: 0.1,  baseY: 0.75, size: 0.38, speed: 0.032, drift: 1.9,  color: 'rgba(167, 139, 250, 0.40)' }, // lavender
];

export function MagneticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5, active: false });
  const rafRef    = useRef<number>(0);
  const orbsRef   = useRef<Orb[]>(ORBS.map(o => ({ ...o })));
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size canvas to viewport
    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse — normalised 0–1
    function onMouseMove(e: MouseEvent) {
      if (prefersReduced) return;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        active: true,
      };
    }
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      const dim = Math.min(W, H);

      // Clear with near-black (not pure black — lets gradient show richer)
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#060612';
      ctx.fillRect(0, 0, W, H);

      t += prefersReduced ? 0.001 : 0.004;

      const orbs = orbsRef.current;

      orbs.forEach((orb) => {
        // Idle sine drift when no mouse or reduced motion
        const driftX = Math.sin(t + orb.drift) * 0.06;
        const driftY = Math.cos(t * 0.7 + orb.drift) * 0.05;

        if (mouseRef.current.active && !prefersReduced) {
          // Magnetic pull: target moves toward cursor weighted by speed
          orb.tx = orb.baseX + (mouseRef.current.x - orb.baseX) * 0.45 + driftX;
          orb.ty = orb.baseY + (mouseRef.current.y - orb.baseY) * 0.35 + driftY;
        } else {
          orb.tx = orb.baseX + driftX;
          orb.ty = orb.baseY + driftY;
        }

        // Lerp current toward target
        orb.x += (orb.tx - orb.x) * orb.speed;
        orb.y += (orb.ty - orb.y) * orb.speed;

        // Draw radial gradient orb
        const cx = orb.x * W;
        const cy = orb.y * H;
        const r  = orb.size * dim;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    orb.color);
        grad.addColorStop(0.5,  orb.color.replace(/[\d.]+\)$/, '0.25)'));
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
      window.removeEventListener('mousemove', onMouseMove);
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
