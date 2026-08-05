'use client';

/**
 * SumiBackground
 *
 * White sumi-e ink effect rendered on a canvas layer above the colour orbs.
 * 
 * Design:
 *  - ~120 particles drift slowly on independent sine paths (autonomous ink flow)
 *  - Particles within CONNECTION_DIST of each other draw a thin white line
 *    (opacity proportional to closeness — fades at distance, dense when near)
 *  - Each particle is pulled magnetically toward the cursor when within
 *    MOUSE_RADIUS px, giving the look of ink being drawn by a brush
 *  - Particles have slight velocity and a "wander" force so they never stop
 *  - Reduced motion: particles frozen, no mouse interaction
 */

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT  = 120;
const CONNECTION_DIST = 140;   // px — max distance to draw a connecting line
const MOUSE_RADIUS    = 200;   // px — magnetic pull radius
const MOUSE_STRENGTH  = 0.018; // how hard the cursor attracts particles
const WANDER_STRENGTH = 0.012; // autonomous wander force
const MAX_SPEED       = 1.2;   // px/frame cap
const PARTICLE_ALPHA  = 0.55;  // base opacity of each dot

interface Particle {
  x:  number;
  y:  number;
  vx: number;
  vy: number;
  // unique sine-path seeds
  phase:  number;
  freqX:  number;
  freqY:  number;
  amp:    number;
  // base wander target (normalised 0–1)
  baseX:  number;
  baseY:  number;
}

function make(W: number, H: number): Particle {
  return {
    x:     Math.random() * W,
    y:     Math.random() * H,
    vx:    (Math.random() - 0.5) * 0.4,
    vy:    (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
    freqX: 0.3 + Math.random() * 0.5,
    freqY: 0.2 + Math.random() * 0.4,
    amp:   30  + Math.random() * 60,
    baseX: Math.random(),
    baseY: Math.random(),
  };
}

export function SumiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999, active: false });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      // Regenerate if first time, redistribute if resized
      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => make(W, H));
      } else {
        // Keep particles, just clamp to new bounds
        particles.forEach(p => {
          p.x = Math.min(p.x, W);
          p.y = Math.min(p.y, H);
          p.baseX = p.x / W;
          p.baseY = p.y / H;
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function onMove(e: MouseEvent) {
      if (reduced) return;
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }
    function onLeave() { mouseRef.current.active = false; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    let t = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      if (!reduced) t += 0.008;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && !reduced;

      // --- update particles ---
      for (const p of particles) {
        if (reduced) continue;

        // Autonomous wander: sine drift around base position
        const wanderX = Math.sin(t * p.freqX + p.phase) * p.amp;
        const wanderY = Math.cos(t * p.freqY + p.phase + 1.3) * p.amp;
        const targetX = p.baseX * W + wanderX;
        const targetY = p.baseY * H + wanderY;

        // Soft spring toward wander target
        p.vx += (targetX - p.x) * WANDER_STRENGTH * 0.05;
        p.vy += (targetY - p.y) * WANDER_STRENGTH * 0.05;

        // Mouse magnetic pull
        if (mouseActive) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
            p.vx += (dx / dist) * force * dist;
            p.vy += (dy / dist) * force * dist;
          }
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft wraparound
        if (p.x < -20)   { p.x = W + 20; p.baseX = p.x / W; }
        if (p.x > W + 20) { p.x = -20;   p.baseX = p.x / W; }
        if (p.y < -20)   { p.y = H + 20; p.baseY = p.y / H; }
        if (p.y > H + 20) { p.y = -20;   p.baseY = p.y / H; }
      }

      // --- draw connections ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx   = b.x - a.x;
          const dy   = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > CONNECTION_DIST) continue;

          // Stronger lines near the mouse
          let boost = 1;
          if (mouseActive) {
            const nearA = Math.hypot(mx - a.x, my - a.y);
            const nearB = Math.hypot(mx - b.x, my - b.y);
            const closest = Math.min(nearA, nearB);
            if (closest < MOUSE_RADIUS) {
              boost = 1 + (1 - closest / MOUSE_RADIUS) * 2.5;
            }
          }

          const alpha = (1 - dist / CONNECTION_DIST) * 0.18 * boost;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          // Vary line width slightly — thicker near mouse like brushed ink
          ctx.lineWidth = 0.6 + (boost - 1) * 0.4;
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(alpha, 0.55)})`;
          ctx.stroke();
        }
      }

      // --- draw dots ---
      for (const p of particles) {
        // Pulse size slightly near mouse
        let radius = 1.5;
        if (mouseActive) {
          const d = Math.hypot(mx - p.x, my - p.y);
          if (d < MOUSE_RADIUS) radius += (1 - d / MOUSE_RADIUS) * 2.5;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${PARTICLE_ALPHA})`;
        ctx.fill();
      }

      // --- erase centre column so particles only show on the side margins ---
      // Centre column = middle 52% of viewport width (narrower than before)
      const colW  = W * 0.52;
      const colX  = (W - colW) / 2;
      const fadeW = W * 0.06; // feather width each side

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      // left feather
      const leftGrad = ctx.createLinearGradient(colX, 0, colX + fadeW, 0);
      leftGrad.addColorStop(0, 'rgba(0,0,0,0)');
      leftGrad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = leftGrad;
      ctx.fillRect(colX, 0, fadeW, H);

      // solid centre erase
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(colX + fadeW, 0, colW - fadeW * 2, H);

      // right feather
      const rightGrad = ctx.createLinearGradient(colX + colW - fadeW, 0, colX + colW, 0);
      rightGrad.addColorStop(0, 'rgba(0,0,0,1)');
      rightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rightGrad;
      ctx.fillRect(colX + colW - fadeW, 0, fadeW, H);

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
