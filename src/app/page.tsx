'use client';

/**
 * page.tsx — root route
 *
 * Assembles the single scrolling page:
 *   1. LoadingScreen — exits before content is visible
 *   2. Hero          — S1 identity section
 *   3. WorkHistory   — S2 experience section (scroll-pinning)
 *
 * S3 (Projects) is added in a subsequent sprint.
 */

import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Hero } from '@/components/Hero/Hero';
import { WorkGallery } from '@/components/WorkGallery/WorkGallery';
import { PageBackground } from '@/components/PageBackground/PageBackground';

export default function Home() {
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
        <Hero scrambleTrigger={scramble} />
        <WorkGallery />
      </main>
    </>
  );
}
