import fs from 'fs';
import path from 'path';

/**
 * Reads public/photos at build / request time and returns sorted public paths.
 * Works only in a Server Component or server-side context (Node runtime).
 */
export function getPhotos(): string[] {
  const dir = path.join(process.cwd(), 'public', 'photos');
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
    .sort()
    .map((f) => `/photos/${f}`);
}
