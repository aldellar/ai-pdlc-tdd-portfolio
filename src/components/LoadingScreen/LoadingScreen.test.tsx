/**
 * LoadingScreen tests — S4
 *
 * Tests map directly to acceptance criteria AC1, AC3, AC4, AC5, AC6, AC7.
 * AC2 (animation smoothness) is untestable — covered by design review only.
 *
 * RED phase: Tests for AC3–AC7 will fail until LoadingScreen.tsx implements
 * the exit logic, focus management, and reduced-motion behaviour.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LoadingScreen } from './LoadingScreen';

// ---------------------------------------------------------------------------
// AC1 — Loading overlay is present on initial render
// ---------------------------------------------------------------------------
describe('S4 — AC1: initial render', () => {
  it('renders the loading screen overlay on mount', () => {
    render(<LoadingScreen />);
    expect(screen.getByTestId('loading-screen')).toBeDefined();
  });

  it('has role="status" so screen readers announce it', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('has an accessible label', () => {
    render(<LoadingScreen />);
    expect(screen.getByLabelText('Loading')).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// AC3 — Loading screen exits and main content becomes accessible
// ---------------------------------------------------------------------------
describe('S4 — AC3: exit behaviour', () => {
  it('calls onExitComplete after the exit sequence finishes', async () => {
    const onExitComplete = vi.fn();
    render(<LoadingScreen onExitComplete={onExitComplete} />);

    // Trigger exit — real implementation drives this via animation completion.
    // In tests we simulate by calling the exit mechanism directly.
    // The component must call onExitComplete once the exit is done.
    await waitFor(() => {
      expect(onExitComplete).toHaveBeenCalledTimes(1);
    }, { timeout: 3500 });
  });

  it('removes or hides the loading screen element after exit completes', async () => {
    const { queryByTestId } = render(<LoadingScreen onExitComplete={() => {}} />);

    await waitFor(() => {
      const el = queryByTestId('loading-screen');
      // Either removed from DOM or hidden via aria-hidden / display:none
      const isGone =
        el === null ||
        el.getAttribute('aria-hidden') === 'true' ||
        (el as HTMLElement).style.display === 'none';
      expect(isGone).toBe(true);
    }, { timeout: 3500 });
  });
});

// ---------------------------------------------------------------------------
// AC4 — Keyboard focus moves to main content after exit
// ---------------------------------------------------------------------------
describe('S4 — AC4: focus management after exit', () => {
  it('does not leave focus trapped inside the loading screen after exit', async () => {
    // Render loading screen alongside a main content landmark
    render(
      <>
        <LoadingScreen onExitComplete={() => {}} />
        <main data-testid="main-content" tabIndex={-1}>
          <h1>Portfolio</h1>
        </main>
      </>
    );

    await waitFor(() => {
      const loadingScreen = document.querySelector('[data-testid="loading-screen"]');
      // After exit, focus must not be inside the loading screen
      const focusIsInsideLoader =
        loadingScreen !== null && loadingScreen.contains(document.activeElement);
      expect(focusIsInsideLoader).toBe(false);
    }, { timeout: 3500 });
  });
});

// ---------------------------------------------------------------------------
// AC5 — Does not re-appear after initial exit
// ---------------------------------------------------------------------------
describe('S4 — AC5: no re-appearance', () => {
  it('does not re-mount the loading screen after it has exited', async () => {
    const onExitComplete = vi.fn();
    const { queryByTestId, rerender } = render(
      <LoadingScreen onExitComplete={onExitComplete} />
    );

    // Wait for exit
    await waitFor(() => expect(onExitComplete).toHaveBeenCalled(), { timeout: 3500 });

    // Re-render (simulates scroll / in-page navigation triggering a re-render)
    rerender(<LoadingScreen onExitComplete={onExitComplete} />);

    // The loading screen should not be visible/present again
    const el = queryByTestId('loading-screen');
    const isVisible =
      el !== null &&
      el.getAttribute('aria-hidden') !== 'true' &&
      (el as HTMLElement).style.display !== 'none';
    expect(isVisible).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// AC6 — prefers-reduced-motion: exits cleanly without animation
// ---------------------------------------------------------------------------
describe('S4 — AC6: prefers-reduced-motion', () => {
  beforeEach(() => {
    // Mock window.matchMedia to simulate prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('still calls onExitComplete when reduced motion is enabled', async () => {
    const onExitComplete = vi.fn();
    render(<LoadingScreen onExitComplete={onExitComplete} />);

    await waitFor(() => {
      expect(onExitComplete).toHaveBeenCalledTimes(1);
    }, { timeout: 3500 });
  });

  it('exits faster or immediately when reduced motion is enabled', async () => {
    const onExitComplete = vi.fn();
    const start = Date.now();

    render(<LoadingScreen onExitComplete={onExitComplete} />);

    await waitFor(() => expect(onExitComplete).toHaveBeenCalled(), { timeout: 3500 });

    const elapsed = Date.now() - start;
    // With reduced motion the exit should be near-instant (under 500ms)
    expect(elapsed).toBeLessThan(500);
  });
});

// ---------------------------------------------------------------------------
// AC7 — Exit completes within 3 seconds
// ---------------------------------------------------------------------------
describe('S4 — AC7: exit timing', () => {
  it('calls onExitComplete within 3000ms of mount', async () => {
    const onExitComplete = vi.fn();
    const start = Date.now();

    render(<LoadingScreen onExitComplete={onExitComplete} />);

    await waitFor(() => expect(onExitComplete).toHaveBeenCalled(), { timeout: 3100 });

    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(3000);
  });
});
