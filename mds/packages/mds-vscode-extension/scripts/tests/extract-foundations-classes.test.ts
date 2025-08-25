import { describe, it, expect } from 'vitest';
import { extractClassesFromCSS } from '../extract-foundations-classes';

describe('extractClassesFromCSS', () => {
  it('should extract mds classes from CSS content', () => {
    const mockCssContent = `
      .mds-grid { display: grid; }
      .other-class { color: red; }
      .mds-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
      .mds-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    `;

    const result = extractClassesFromCSS(mockCssContent, 'grid');
    expect(result).toEqual(['mds-grid', 'mds-grid-cols-2', 'mds-grid-cols-3']);
  });

  it('should filter gap classes when key is gap', () => {
    const mockCssContent = `
      .mds-gap-1 { gap: 0.25rem; }
      .mds-grid { display: grid; }
      .mds-gap-2 { gap: 0.5rem; }
      .other-gap { gap: 1rem; }
    `;

    const result = extractClassesFromCSS(mockCssContent, 'gap');
    expect(result).toEqual(['mds-gap-1', 'mds-gap-2']);
  });

  it('should return empty array for CSS without mds classes', () => {
    const mockCssContent = `
      .regular-class { color: blue; }
      .another-class { margin: 1rem; }
    `;

    const result = extractClassesFromCSS(mockCssContent, 'typography');
    expect(result).toEqual([]);
  });

  it('should handle empty CSS content', () => {
    const result = extractClassesFromCSS('', 'color');
    expect(result).toEqual([]);
  });

  it('should remove duplicate classes', () => {
    const mockCssContent = `
      .mds-text-lg { font-size: 1.125rem; }
      .mds-text-lg { line-height: 1.75rem; }
      .mds-text-xl { font-size: 1.25rem; }
    `;

    const result = extractClassesFromCSS(mockCssContent, 'typography');
    expect(result).toEqual(['mds-text-lg', 'mds-text-xl']);
  });
});
