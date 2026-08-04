/**
 * S0 — AC9
 * Verifies that TypeScript strict mode is enabled in tsconfig.json.
 * `strict: true` is required per ADR-001 and is non-negotiable.
 *
 * RED: This test will fail until:
 *   1. The project is scaffolded and `tsconfig.json` exists at the repo root
 *   2. `strict: true` is set inside `compilerOptions`
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

describe('S0 — AC9: TypeScript strict mode', () => {
  it('tsconfig.json exists at the project root', () => {
    const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
    expect(() => readFileSync(tsconfigPath, 'utf-8')).not.toThrow();
  });

  it('tsconfig.json has strict: true in compilerOptions', () => {
    const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
    const raw = readFileSync(tsconfigPath, 'utf-8');

    // tsconfig.json allows comments (JSONC) — strip single-line // comments
    // before parsing so JSON.parse does not throw.
    const stripped = raw.replace(/\/\/.*$/gm, '');
    const tsconfig = JSON.parse(stripped);

    expect(tsconfig.compilerOptions).toBeDefined();
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });
});
