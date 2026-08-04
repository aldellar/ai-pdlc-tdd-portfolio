/**
 * Hero — S1
 *
 * REFACTOR: Full Tailwind layout with MagneticBackground canvas,
 * Apple AI-style multicolour gradient orbs, vertical loading line.
 * Identity info overlaid on the photo strip.
 * Tech tickers above and below.
 */

import { identity, techIcons, heroPhotos } from '@/lib/data';
import { ScrambleText } from './ScrambleText';
import { TechTicker } from './TechTicker';
import { PhotoTicker } from './PhotoTicker';
import { MagneticBackground } from './MagneticBackground';

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#060612]"
    >
      {/* Magnetic gradient orb background — sits behind everything */}
      <MagneticBackground />

      {/* AC4 — Tech ticker ABOVE photo strip */}
      <div className="relative z-10">
        <TechTicker
          icons={techIcons}
          className="py-4 border-b border-white/10"
        />
      </div>

      {/* AC6 — 3-column vertical photo strip */}
      <div className="relative z-10">
        <PhotoTicker
          photos={heroPhotos}
          className="h-[70vh] px-4"
        />

        {/* Identity overlay — AC1/2/3 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,6,18,0.6) 40%, rgba(6,6,18,0.7) 100%)' }}
        >
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl drop-shadow-lg">
            <ScrambleText text={identity.name} />
          </h1>
          <p
            data-testid="job-title"
            className="text-xl font-medium text-white/90 md:text-2xl drop-shadow"
          >
            {identity.title}
          </p>
          <p
            data-testid="degree"
            className="text-sm text-white/70 md:text-base"
          >
            {identity.degree}
          </p>
          <p
            data-testid="experience"
            className="text-sm text-white/70 md:text-base"
          >
            {identity.experience}
          </p>
        </div>
      </div>

      {/* AC5 — Tech ticker BELOW photo strip */}
      <div className="relative z-10">
        <TechTicker
          icons={techIcons}
          className="py-4 border-t border-white/10"
        />
      </div>
    </section>
  );
}
