/**
 * page.tsx — root route (Server Component)
 *
 * Calls getPhotos() here (Node fs, server-only) and passes the list down to
 * PageShell as a plain string[] prop. PageShell is a Client Component that
 * owns the loading/scramble state and renders the full page.
 */

import { getPhotos } from '@/lib/getPhotos';
import { PageShell } from '@/components/PageShell/PageShell';

export default function Home() {
  const photos = getPhotos();
  return <PageShell photos={photos} />;
}
