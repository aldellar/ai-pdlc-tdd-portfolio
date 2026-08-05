'use client';

/**
 * MagneticCursor
 *
 * Two-layer custom cursor:
 *  • Inner dot — small solid white ball, tight spring on the real cursor
 *  • Highlight box — white-bordered rectangle that expands to cover the full
 *                    bounding box of the nearest clickable element when within
 *                    SNAP_RADIUS px; otherwise a small circle trailing the cursor
 *
 * Graceful degradation:
 *  - Touch / coarse-pointer devices: native cursor left untouched
 *  - prefers-reduced-motion: native cursor left untouched
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DOT_SPRING  = { damping: 32, stiffness: 400, mass: 0.4 };
const RING_SPRING = { damping: 26, stiffness: 200, mass: 0.6 };
const SNAP_SPRING = { damping: 22, stiffness: 320, mass: 0.5 };

const SNAP_RADIUS = 80;
const CLICKABLE   = 'a, button, [role="button"], label, input, select, textarea';

interface SnapTarget {
  x: number;
  y: number;
  w: number;
  h: number;
}

function getSnapTarget(mx: number, my: number): SnapTarget | null {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(CLICKABLE)
  ).filter((el) => {
    if (el.offsetParent === null) return false;
    const s = window.getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  });

  let best: HTMLElement | null = null;
  let bestDist = SNAP_RADIUS;

  for (const el of candidates) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dist = Math.hypot(cx - mx, cy - my);
    if (dist < bestDist) { bestDist = dist; best = el; }
  }

  if (!best) return null;
  const r = best.getBoundingClientRect();
  // 6px padding so the box is slightly larger than the element
  const PAD = 6;
  return {
    x: r.left   - PAD,
    y: r.top    - PAD,
    w: r.width  + PAD * 2,
    h: r.height + PAD * 2,
  };
}

export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [snap,    setSnap]    = useState<SnapTarget | null>(null);

  // Inner dot — raw cursor position, tight spring
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);

  // Box position & size — spring to snap target or cursor
  const boxX = useSpring(useMotionValue(-200), RING_SPRING);
  const boxY = useSpring(useMotionValue(-200), RING_SPRING);
  const boxW = useSpring(useMotionValue(32),   RING_SPRING);
  const boxH = useSpring(useMotionValue(32),   RING_SPRING);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('custom-cursor');

    function onMove(e: MouseEvent) {
      const mx = e.clientX;
      const my = e.clientY;
      rawX.set(mx);
      rawY.set(my);
      setVisible(true);

      const target = getSnapTarget(mx, my);

      if (target) {
        boxX.set(target.x);
        boxY.set(target.y);
        boxW.set(target.w);
        boxH.set(target.h);
        setSnap(target);
      } else {
        // Idle: small 32×32 box centred on cursor
        boxX.set(mx - 16);
        boxY.set(my - 16);
        boxW.set(32);
        boxH.set(32);
        setSnap(null);
      }
    }

    function onLeave() { setVisible(false); }
    function onEnter() { setVisible(true); }
    function onDown()  { setPressed(true); }
    function onUp()    { setPressed(false); }

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Highlight box — covers the full element when snapped, small square when idle */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: visible ? (snap ? 1 : 0.5) : 0, scale: pressed ? 0.95 : 1 }}
        transition={{ opacity: { duration: 0.15 }, scale: { type: 'spring', ...SNAP_SPRING } }}
        style={{
          position: 'fixed',
          top:  0,
          left: 0,
          x:    boxX,
          y:    boxY,
          width:  boxW,
          height: boxH,
          borderRadius: snap ? 6 : 16,
          border: '1.5px solid rgba(255,255,255,0.9)',
          backgroundColor: snap ? 'rgba(255,255,255,0.07)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Inner dot — solid white ball on the real cursor */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.5 : 1 }}
        transition={{ opacity: { duration: 0.1 }, scale: { type: 'spring', ...DOT_SPRING } }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width:  8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
}
