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
        <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl drop-shadow-lg text-center">
          <ScrambleText text={identity.name} trigger={scrambleTrigger} />
        </h1>
      </div>

      {/* 2 — Tech ticker ABOVE photos (scrolls right) */}
      <div className="relative z-10">
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
        <TechTicker
          icons={techIcons}
          className="py-4 border-y border-white/10"
        />
      </div>

      {/* 5 — 3×2 info grid */}
      <div className="relative z-10 px-4 pt-4 pb-6 max-w-2xl mx-auto w-full">
        <InfoGrid />
      </div>

    </section>
  );
}
