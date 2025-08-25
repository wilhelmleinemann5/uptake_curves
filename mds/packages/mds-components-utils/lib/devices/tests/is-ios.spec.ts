import { describe, it, expect, vi } from 'vitest';
import { isIOS } from '../index';

describe('isIOS', () => {
  it('returns "true" when the user agent is an iPhone', () => {
    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      writable: true,
    });

    // Reset navigator.platform and maxTouchPoints
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'iPhone',
      writable: true,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 1,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(true);
  });

  it('returns "true" when the user agent is an iPad', () => {
    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      writable: true,
    });

    // Reset navigator.platform and maxTouchPoints
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'iPad',
      writable: true,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 1,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(true);
  });

  it('returns "true" when the user agent is an iPod', () => {
    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      writable: true,
    });

    // Reset navigator.platform and maxTouchPoints
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'iPod',
      writable: true,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 1,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(true);
  });

  it('returns "true" when detecting a modern iPad Pro (MacIntel platform with touch)', () => {
    // Mock navigator.userAgent that doesn't include iPad (like in newer iPadOS)
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      writable: true,
    });

    // Set platform to MacIntel (like in newer iPads)
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'MacIntel',
      writable: true,
    });

    // Set maxTouchPoints to indicate touch capability (iPads have 5+ touch points)
    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 5,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(true);
  });

  it('returns "false" for Android devices', () => {
    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36',
      writable: true,
    });

    // Reset navigator.platform and maxTouchPoints
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'Linux armv8l',
      writable: true,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 5,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(false);
  });

  it('returns "false" for desktop Mac (MacIntel without multi-touch)', () => {
    // Mock navigator.userAgent for Mac
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      writable: true,
    });

    // Set platform to MacIntel
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'MacIntel',
      writable: true,
    });

    // Set maxTouchPoints to 0 to indicate no touch capability
    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 0,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(false);
  });

  it('returns "false" for Windows desktop', () => {
    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      writable: true,
    });

    // Reset navigator.platform and maxTouchPoints
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'Win32',
      writable: true,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      configurable: true,
      value: 0,
      writable: true,
    });

    const result = isIOS();
    expect(result).toBe(false);
  });
});
