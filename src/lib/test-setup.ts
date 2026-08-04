import '@testing-library/jest-dom';

// jsdom does not implement window.matchMedia. Provide a default stub so any
// component that calls matchMedia works in tests. Individual test suites can
// override this with vi.fn() to simulate specific media query states.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
