'use client';

/**
 * page.tsx — root route
 *
 * Assembles the single scrolling page:
 *   1. LoadingScreen — exits before content is visible
 *   2. Hero          — S1 identity section
 *
 * S2 (About + WorkHistory) and S3 (Projects) are added in subsequent sprints.
 */

import { useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Hero } from '@/components/Hero/Hero';

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
      <main
        id="main-content"
        tabIndex={-1}
        aria-hidden={!loaded ? 'true' : undefined}
      >
        <Hero scrambleTrigger={scramble} />
      </main>
    </>
  );
}
