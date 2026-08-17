'use client';

/**
 * WorkGallery — S3 terminal horizontal scroll gallery.
 *
 * Scroll mechanics (Motion.dev "Lines of London" pattern):
 *   • Outer container: height = N * 100vh — gives scroll room
 *   • Inner wrapper:   position sticky, top 0, height 100vh — pins the viewport
 *   • Flex row of N panels, each 100vw wide
 *   • useScroll tracks progress through the outer container
 *   • useTransform maps [0, 1] → translateX(0) to translateX(-(N-1)*100vw)
 *   • Progress bar scaleX mirrors the same scroll progress
 *
 * Each TerminalPanel receives `isActive` — true when it is the panel currently
 * centred in the viewport, derived from scroll progress thresholds.
 */

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { workHistory } from '@/lib/data';
import { TerminalPanel } from './TerminalPanel';

const N = workHistory.length; // 4

export function WorkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the panel strip left as user scrolls
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(N - 1) * 100}vw`]
  );

  // Progress bar scale
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Track which panel index is active (centred).
  // -1 means nothing is active yet — prevents panel 0 from auto-typing before
  // the gallery has scrolled into view.
  const [activeIndex, setActiveIndex] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Each panel occupies an equal 1/N share of progress
    const idx = Math.min(Math.round(latest * (N - 1)), N - 1);
    setActiveIndex(idx);
  });

  // Handle the case where the page loads with the gallery already in view
  // (e.g. anchor navigation). useMotionValueEvent only fires on changes,
  // so we read the initial value once on mount.
  useEffect(() => {
    const initial = scrollYProgress.get();
    if (initial > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(Math.min(Math.round(initial * (N - 1)), N - 1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="work-gallery"
      aria-label="Work experience gallery"
      data-testid="work-gallery-section"
      className="relative"
    >
      {/* Section label */}
      <div className="px-8 md:px-16 pb-16 pt-32">
        {/* inline-block wrapper shrinks to text width so the scrim hugs the lines */}
        <div className="relative inline-block" style={{ isolation: 'isolate' }}>
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: '-0.5em', bottom: '-0.8em',
              left: '-1.2em', right: '-1.2em',
              zIndex: 0,
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.60) 20%, rgba(0,0,0,0.30) 60%, transparent 100%)',
              filter: 'blur(18px)',
            }}
          />
          <p className="relative z-10 text-white/40 text-xs uppercase tracking-[0.25em] mb-3">02 — Experience</p>
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
        </div>
      </div>

      {/* Scroll container — N * 100vh tall */}
      <div
        ref={containerRef}
        style={{ height: `${N * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport pin — no overflow-hidden so top fade isn't clipped */}
        <div className="sticky top-0 h-screen">

          {/* Horizontal panel strip */}
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {workHistory.map((entry, i) => (
              <TerminalPanel
                key={entry.company}
                entry={entry}
                index={i}
                isActive={activeIndex === i}
              />
            ))}
          </motion.div>

          {/* Panel indicator dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
            {workHistory.map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  scale:   activeIndex === i ? 1.4 : 1,
                  opacity: activeIndex === i ? 1   : 0.3,
                }}
                transition={{ duration: 0.2 }}
                className="block w-1.5 h-1.5 rounded-full bg-white"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar — fixed at the bottom, scaleX driven by scroll */}
      <motion.div
        data-testid="gallery-progress-bar"
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed bottom-0 left-0 right-0 h-[3px] bg-[#3b82d4] z-50 pointer-events-none"
      />
    </section>
  );
}
