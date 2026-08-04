/**
 * Hero unit tests — S1
 *
 * Covers test cases 1–4, 7–12, 13–19 from the confirmed test case list.
 * Playwright covers cases 5–6, 8–9, 20 (page-level E2E).
 *
 * RED: All tests will fail until the Hero components are implemented.
 */

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';
import { ScrambleText } from './ScrambleText';
import { TechTicker } from './TechTicker';
import { PhotoTicker } from './PhotoTicker';
import { identity, techIcons, heroPhotos } from '@/lib/data';

// ---------------------------------------------------------------------------
// A. Happy Path
// ---------------------------------------------------------------------------
describe('S1 — AC1/2/3/4: identity text', () => {
  it('name-is-present — renders Drew\'s full name', () => {
    render(<Hero />);
    expect(screen.getByText(identity.name)).toBeDefined();
  });

  it('job-title-is-present — renders job title', () => {
    render(<Hero />);
    expect(screen.getByText(identity.title)).toBeDefined();
  });

  it('degree-is-present — renders degree text', () => {
    render(<Hero />);
    expect(screen.getByText(identity.degree)).toBeDefined();
  });

  it('experience-level-is-present — renders experience level', () => {
    render(<Hero />);
    expect(screen.getByText(identity.experience)).toBeDefined();
  });
});

describe('S1 — AC8/10: scramble text', () => {
  it('scramble-text-resolves-to-name — renders final name string in DOM', () => {
    render(<ScrambleText text={identity.name} />);
    expect(screen.getByText(identity.name)).toBeDefined();
  });

  it('scramble-text-with-empty-string — renders without crashing on empty input', () => {
    expect(() => render(<ScrambleText text="" />)).not.toThrow();
  });

  it('scramble-text-no-crash-on-special-chars — handles special characters', () => {
    expect(() => render(<ScrambleText text="@#$%" />)).not.toThrow();
  });
});

describe('S1 — AC4/8: tech ticker', () => {
  it('tech-icons-have-aria-labels — every icon has an aria-label', () => {
    render(<TechTicker icons={techIcons} />);
    const icons = document.querySelectorAll('[data-testid="tech-icon"]');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('tech-ticker-renders-all-icons — renders all items from data array', () => {
    render(<TechTicker icons={techIcons} />);
    const icons = document.querySelectorAll('[data-testid="tech-icon"]');
    // ticker duplicates items for seamless loop — expect at least techIcons.length
    expect(icons.length).toBeGreaterThanOrEqual(techIcons.length);
  });

  it('tech-ticker-with-single-item — renders a one-item array without crashing', () => {
    const single = [techIcons[0]];
    expect(() => render(<TechTicker icons={single} />)).not.toThrow();
    expect(document.querySelectorAll('[data-testid="tech-icon"]').length).toBeGreaterThanOrEqual(1);
  });
});

describe('S1 — AC6/7: photo ticker', () => {
  it('photo-strip-renders-three-columns — renders exactly 3 column containers', () => {
    render(<PhotoTicker photos={heroPhotos} />);
    expect(screen.getAllByTestId('photo-column')).toHaveLength(3);
  });

  it('photo-columns-each-have-photos — each column contains at least one image', () => {
    render(<PhotoTicker photos={heroPhotos} />);
    const columns = screen.getAllByTestId('photo-column');
    columns.forEach((col) => {
      const imgs = within(col).getAllByRole('img');
      expect(imgs.length).toBeGreaterThan(0);
    });
  });

  it('photos-have-alt-text — every image has a non-empty alt attribute', () => {
    render(<PhotoTicker photos={heroPhotos} />);
    const imgs = screen.getAllByRole('img');
    imgs.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy();
    });
  });

  it('photo-ticker-no-crash-empty-array — renders without throwing on empty photos', () => {
    expect(() => render(<PhotoTicker photos={[]} />)).not.toThrow();
    expect(screen.getAllByTestId('photo-column')).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// D. Integration Points
// ---------------------------------------------------------------------------
describe('S1 — integration: data sourcing', () => {
  it('hero-reads-name-from-data — name matches identity.name from data.ts', () => {
    render(<Hero />);
    expect(screen.getByText(identity.name)).toBeDefined();
  });

  it('hero-reads-tech-icons-from-data — icon count matches techIcons.length', () => {
    render(<Hero />);
    const icons = document.querySelectorAll('[data-testid="tech-icon"]');
    expect(icons.length).toBeGreaterThanOrEqual(techIcons.length);
  });

  it('hero-reads-photos-from-data — img src attributes match heroPhotos entries', () => {
    render(<Hero />);
    const imgs = screen.getAllByRole('img');
    const srcs = imgs.map((img) => img.getAttribute('src') ?? '');
    heroPhotos.forEach((photo) => {
      expect(srcs.some((src) => src.includes(photo.replace('/photos/', '')))).toBe(true);
    });
  });
});
