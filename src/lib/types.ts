/**
 * src/lib/types.ts
 *
 * Shared TypeScript types used across components and data.
 */

export interface TechIcon {
  /** Human-readable label used as aria-label on the icon */
  label: string;
  /** Path to the SVG/PNG icon relative to /public */
  src: string;
}

export interface WorkEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  /** Short summary sentence shown in the InfoGrid */
  description: string;
  /** Bullet points shown in the full WorkHistory section */
  bullets: string[];
  logoSrc: string;
  url: string;
  location: string;
}

export interface Project {
  name: string;
  description: string;
  imageSrc: string;
  /** null / undefined for non-tech projects */
  tech?: string[];
  url: string;
}
