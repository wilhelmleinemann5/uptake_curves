import { describe, it, expect, vi } from 'vitest';
import { isCdn } from '../is-cdn';

describe('is-cdn', () => {
  it('returns "true" when the script is loading from the Maersk CDN latest folder', () => {
    // Mock document.querySelector
    document.querySelector = vi.fn().mockReturnValue({
      src: 'https://assets.maerskline.com/mds/latest/components-core/index.bundle.esm.min.js',
    });

    const result = isCdn();
    expect(result).toBe(true);
  });

  it('returns "true" when the script is loading from the Maersk CDN versioned folder', () => {
    // Mock document.querySelector
    document.querySelector = vi.fn().mockReturnValue({
      src: 'https://assets.maerskline.com/mds/2.85.0/components-core/index.bundle.esm.min.js',
    });

    const result = isCdn();
    expect(result).toBe(true);
  });

  it('returns "false" when the script is loading from the local server', () => {
    // Mock document.querySelector
    document.querySelector = vi.fn().mockReturnValue(null);

    const result = isCdn();
    expect(result).toBe(false);
  });

  it('returns "false" when the script is not loading from the Maersk CDN', () => {
    // Mock document.querySelector
    document.querySelector = vi.fn().mockReturnValue({
      src: 'https://example.com/script.js',
    });

    const result = isCdn();
    expect(result).toBe(false);
  });

  it('returns "false" when the script is loading from a different domain with a similar path', () => {
    // Mock document.querySelector
    document.querySelector = vi.fn().mockReturnValue({
      src: 'https://assets.example.com/mds/latest/components-core/index.bundle.esm.min.js',
    });

    const result = isCdn();
    expect(result).toBe(false);
  });
});
