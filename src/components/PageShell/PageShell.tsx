'use client';

/**
 * PageShell — client component that owns the loading/scramble state.
 *
 * Keeping this separate from page.tsx lets page.tsx remain a Server Component,
 * which is required so HeroServer (and its fs-based getPhotos call) can be
 * imported without bundling Node built-ins into the client.
 *
 * The scrambleTrigger is forwarded to Hero via the onScramble callback pattern:
 * page.tsx renders HeroServer inside PageShell as children, and PageShell
 * exposes a ref-based trigger through a context or callback.
 *
 * Simpler approach: keep scrambleTrigger state here and render Hero directly,
 * but import it as the plain Hero (client-safe) with photos injected via the
 * children/slot pattern — page.tsx calls getPhotos() and passes photos down.
 */

import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Hero } from '@/components/Hero/Hero';
import { WorkGallery } from '@/components/WorkGallery/WorkGallery';
import { PageBackground } from '@/components/PageBackground/PageBackground';
import { Projects } from '@/components/Projects/Projects';

interface PageShellProps {
  photos: string[];
}

export function PageShell({ photos }: PageShellProps) {
  const [loaded,   setLoaded]   = useState(false);
  // Fires the moment the panels begin separating — scramble starts in sync
  const [scramble, setScramble] = useState(false);

  return (
    <>
      {!loaded && (
        <LoadingScreen
          onSeparate={() => setScramble(true)}
          onExitComplete={() => setLoaded(true)}
        />
      )}
      <PageBackground />
      <main
        id="main-content"
        tabIndex={-1}
        aria-hidden={!loaded ? 'true' : undefined}
      >
        <Hero scrambleTrigger={scramble} photos={photos} />
        <WorkGallery />
        <Projects />
      </main>
    </>
  );
}
