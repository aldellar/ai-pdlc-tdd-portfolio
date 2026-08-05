/**
 * Hero — S1
 *
 * Layout (top → bottom):
 *   1. Name heading (ScrambleText)
 *   2. Tech ticker (left-scrolling)
 *   3. 3-column vertical photo strip
 *   4. Tech ticker (left-scrolling)
 *   5. 3×3 info grid (work, education, experience, email, LinkedIn, Instagram)
 */

import { identity, techIcons, heroPhotos } from '@/lib/data';
import { ScrambleText } from './ScrambleText';
import { TechTicker } from './TechTicker';
import { PhotoTicker } from './PhotoTicker';
import { InfoGrid } from './InfoGrid';
import { MagneticBackground } from './MagneticBackground';
import { SumiBackground } from './SumiBackground';

interface HeroProps {
  /** Pass true once the loading screen has exited to start ScrambleText */
  scrambleTrigger?: boolean;
}

export function Hero({ scrambleTrigger = true }: HeroProps) {
  return (
    <section
      data-testid="hero-section"
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-[#060612]"
    >
      {/* Layer 0 — colour orbs */}
      <MagneticBackground />
      {/* Layer 1 — white sumi-e ink particles */}
      <SumiBackground />

      {/* 1 — Name */}
      <div className="relative z-10 flex items-center justify-center pt-20 pb-8 px-6">
        {/* wrapper shrinks to text width so the scrim hugs the letters */}
        <div className="relative inline-block">
          {/* scrim — behind the text, blurred outward, never covers the letters */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              inset: '-0.2em -0.5em',
              zIndex: -1,
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.60) 20%, rgba(0,0,0,0.30) 60%, transparent 100%)',
              filter: 'blur(18px)',
            }}
          />
          <h1 className="relative text-6xl font-bold tracking-tight text-white md:text-8xl drop-shadow-lg text-center">
            <ScrambleText text={identity.name} trigger={scrambleTrigger} />
          </h1>
        </div>
      </div>

      {/* 2 — Tech ticker ABOVE photos (scrolls right) */}
      <div className="relative z-10">
        {/* scrim — feathered top and bottom, no hard edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.35) 60%, transparent 100%)', filter: 'blur(6px)' }}
        />
        <TechTicker
          icons={techIcons}
          className="py-4 border-y border-white/10"
          reverse
        />
      </div>

      {/* 3 — 3-column vertical photo strip */}
      <div className="relative z-10">
        <PhotoTicker
          photos={heroPhotos}
          className="h-[38vh] px-4 py-2"
        />
      </div>

      {/* 4 — Tech ticker BELOW photos */}
      <div className="relative z-10">
        {/* scrim — feathered top and bottom, no hard edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.35) 60%, transparent 100%)', filter: 'blur(6px)' }}
        />
        <TechTicker
          icons={techIcons}
          className="py-4 border-y border-white/10"
        />
      </div>

      {/* 5 — 3×2 info grid — width matched to the name heading */}
      <div className="relative z-10 px-6 pt-6 pb-8 max-w-4xl mx-auto w-full">
        <InfoGrid />
      </div>

    </section>
  );
}
