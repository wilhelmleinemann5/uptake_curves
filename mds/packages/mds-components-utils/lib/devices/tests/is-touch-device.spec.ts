import { describe, it, expect } from 'vitest';
import { isTouchDevice } from '../index';

describe('isTouchDevice', () => {
  it('returns "true" when ontouchstart is in window', () => {
    // Store original window object properties
    const originalWindow = { ...window };

    // Mock ontouchstart in window
    Object.defineProperty(window, 'ontouchstart', {
      configurable: true,
      value: () => {
        // Empty function - just used for detection
      },
      writable: true,
    });

    // Reset maxTouchPoints for this test
    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 0,
      writable: true,
    });

    const result = isTouchDevice();
    expect(result).toBe(true);

    // Restore original window
    if ('ontouchstart' in originalWindow) {
      window.ontouchstart = originalWindow.ontouchstart;
    } else {
      delete window.ontouchstart;
    }
  });

  it('returns "true" when maxTouchPoints is greater than 0', () => {
    // Store original window object properties
    const originalWindow = { ...window };

    // Remove ontouchstart if exists
    if ('ontouchstart' in window) {
      delete window.ontouchstart;
    }

    // Mock navigator.maxTouchPoints
    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 5,
      writable: true,
    });

    const result = isTouchDevice();
    expect(result).toBe(true);

    // Restore original properties if needed
    if ('ontouchstart' in originalWindow) {
      window.ontouchstart = originalWindow.ontouchstart;
    }
  });

  it('returns "false" when neither ontouchstart nor maxTouchPoints are present', () => {
    // Store original window object properties
    const originalWindow = { ...window };

    // Remove ontouchstart if exists
    if ('ontouchstart' in window) {
      delete window.ontouchstart;
    }

    // Mock navigator.maxTouchPoints
    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 0,
      writable: true,
    });

    const result = isTouchDevice();
    expect(result).toBe(false);

    // Restore original properties if needed
    if ('ontouchstart' in originalWindow) {
      window.ontouchstart = originalWindow.ontouchstart;
    }
  });
});
