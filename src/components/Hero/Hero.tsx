/**
 * Hero — S1
 *
 * REFACTOR: Full Tailwind layout. Identity info overlaid on the photo strip.
 * Tech tickers above and below. ScrambleText on name.
 */

import { identity, techIcons, heroPhotos } from '@/lib/data';
import { ScrambleText } from './ScrambleText';
import { TechTicker } from './TechTicker';
import { PhotoTicker } from './PhotoTicker';

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* AC4 — Tech ticker ABOVE photo strip */}
      <TechTicker
        icons={techIcons}
        className="py-4 border-b border-white/10"
      />

      {/* AC6 — 3-column vertical photo strip */}
      <div className="relative">
        <PhotoTicker
          photos={heroPhotos}
          className="h-[70vh] px-4"
        />

        {/* Identity overlay — AC1/2/3 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 px-6 text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <ScrambleText text={identity.name} />
          </h1>
          <p
            data-testid="job-title"
            className="text-xl font-medium text-white/80 md:text-2xl"
          >
            {identity.title}
          </p>
          <p
            data-testid="degree"
            className="text-sm text-white/60 md:text-base"
          >
            {identity.degree}
          </p>
          <p
            data-testid="experience"
            className="text-sm text-white/60 md:text-base"
          >
            {identity.experience}
          </p>
        </div>
      </div>

      {/* AC5 — Tech ticker BELOW photo strip */}
      <TechTicker
        icons={techIcons}
        className="py-4 border-t border-white/10"
      />
    </section>
  );
}
