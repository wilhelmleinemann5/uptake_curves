import { describe, it, expect, vi } from 'vitest';
import { supportsDynamicImport } from '../index';

describe('supportsDynamicImport', () => {
  it('returns "true" when dynamic import is supported', () => {
    // Mock Function constructor to simulate support for dynamic import
    const originalFunction = global.Function;
    global.Function = vi.fn().mockImplementation((...args) => {
      // The function was called with 'import("")' as an argument
      if (args[0] === 'import("")') {
        return () => {
          // Empty function - mock for a successful dynamic import evaluation
        }; // Return a dummy function
      }
      // For all other cases, pass through to the original Function constructor
      return originalFunction(...args);
    });

    const result = supportsDynamicImport();
    expect(result).toBe(true);

    // Restore original Function
    global.Function = originalFunction;
  });

  it('returns "false" when dynamic import is not supported', () => {
    // Mock Function constructor to simulate lack of support for dynamic import
    const originalFunction = global.Function;
    global.Function = vi.fn().mockImplementation((...args) => {
      // The function was called with 'import("")' as an argument
      if (args[0] === 'import("")') {
        throw new SyntaxError('Dynamic import is not supported');
      }
      // For all other cases, pass through to the original Function constructor
      return originalFunction(...args);
    });

    const result = supportsDynamicImport();
    expect(result).toBe(false);

    // Restore original Function
    global.Function = originalFunction;
  });
});
