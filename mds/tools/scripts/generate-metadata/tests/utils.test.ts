import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock filesystem operations
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));

// Mock path operations  
vi.mock('path', () => ({
  join: vi.fn(),
}));

describe('utils', () => {
  let mockConsoleWarn: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPackageInfo', () => {
    test('should return complete package information when package.json is valid', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
        description: 'A customizable button component',
        homepage: 'https://designsystem.maersk.com/components/button',
        repository: {
          type: 'git',
          url: 'https://github.com/Maersk-Global/mds.git',
        },
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json');

      expect(result).toEqual({
        packageName: '@maersk-global/mc-button',
        packageVersion: '2.1.0',
        description: 'A customizable button component',
        homepage: 'https://designsystem.maersk.com/components/button',
        repository: {
          type: 'git',
          url: 'https://github.com/Maersk-Global/mds.git',
        },
      });

      expect(readFileSync).toHaveBeenCalledWith('/mock/path/package.json', 'utf8');
    });

    test('should merge enhanced data with package data', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
      };

      const enhancedData = {
        description: 'Enhanced description from metadata',
        customField: 'custom value',
        additionalInfo: { key: 'value' },
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json', enhancedData);

      expect(result).toEqual({
        packageName: '@maersk-global/mc-button',
        packageVersion: '2.1.0',
        description: 'Enhanced description from metadata',
        homepage: 'https://designsystem.maersk.com',
        repository: null,
        customField: 'custom value',
        additionalInfo: { key: 'value' },
      });
    });

    test('should use default values when package.json fields are missing', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        // Missing version, description, homepage, repository
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json');

      expect(result).toEqual({
        packageName: '@maersk-global/mc-button',
        packageVersion: '0.0.0',
        description: 'Package description not available',
        homepage: 'https://designsystem.maersk.com',
        repository: null,
      });
    });

    test('should use enhanced description when package description is missing', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
        // Missing description
      };

      const enhancedData = {
        description: 'Enhanced description from metadata',
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json', enhancedData);

      expect(result).toEqual({
        packageName: '@maersk-global/mc-button',
        packageVersion: '2.1.0',
        description: 'Enhanced description from metadata',
        homepage: 'https://designsystem.maersk.com',
        repository: null,
      });
    });

    test('should handle completely empty package.json', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {};

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json');

      expect(result).toEqual({
        packageName: 'unknown-package',
        packageVersion: '0.0.0',
        description: 'Package description not available',
        homepage: 'https://designsystem.maersk.com',
        repository: null,
      });
    });

    test('should handle file read errors gracefully', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      const result = getPackageInfo('/non/existent/package.json');

      expect(result).toEqual({
        name: 'unknown-package',
        version: '0.0.0',
        description: 'Package description not available',
        homepage: null,
        repository: null,
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Could not read package.json at /non/existent/package.json, using defaults'
      );
    });

    test('should handle malformed JSON gracefully', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      vi.mocked(readFileSync).mockReturnValue('{ invalid json');

      const result = getPackageInfo('/mock/path/package.json');

      expect(result).toEqual({
        name: 'unknown-package',
        version: '0.0.0',
        description: 'Package description not available',
        homepage: null,
        repository: null,
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Could not read package.json at /mock/path/package.json, using defaults'
      );
    });

    test('should handle permission errors gracefully', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      vi.mocked(readFileSync).mockImplementation(() => {
        const error = new Error('EACCES: permission denied');
        (error as any).code = 'EACCES';
        throw error;
      });

      const result = getPackageInfo('/restricted/package.json');

      expect(result).toEqual({
        name: 'unknown-package',
        version: '0.0.0',
        description: 'Package description not available',
        homepage: null,
        repository: null,
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Could not read package.json at /restricted/package.json, using defaults'
      );
    });

    test('should preserve enhanced data when file read fails', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const enhancedData = {
        description: 'Enhanced description',
        customProperty: 'custom value',
      };

      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = getPackageInfo('/non/existent/package.json', enhancedData);

      expect(result).toEqual({
        name: 'unknown-package',
        version: '0.0.0',
        description: 'Package description not available',
        homepage: null,
        repository: null,
      });

      // Enhanced data should not be preserved when error occurs
      expect(result).not.toHaveProperty('customProperty');
    });

    test('should handle null and undefined enhanced data', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      // Test with null - accessing null.description will throw error, so falls back to error case
      const resultNull = getPackageInfo('/mock/path/package.json', null);
      expect(resultNull).toEqual({
        name: 'unknown-package',
        version: '0.0.0',
        description: 'Package description not available',
        homepage: null,
        repository: null,
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Could not read package.json at /mock/path/package.json, using defaults'
      );

      // Clear the mock for the next test
      mockConsoleWarn.mockClear();

      // Test with undefined (defaults to {})
      const resultUndefined = getPackageInfo('/mock/path/package.json', undefined);
      expect(resultUndefined.packageName).toBe('@maersk-global/mc-button');

      // Test with empty object
      const resultEmpty = getPackageInfo('/mock/path/package.json', {});
      expect(resultEmpty.packageName).toBe('@maersk-global/mc-button');
    });

    test('should handle complex repository objects', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
        repository: {
          type: 'git',
          url: 'git+https://github.com/Maersk-Global/mds.git',
          directory: 'packages/mc-button',
        },
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json');

      expect(result.repository).toEqual({
        type: 'git',
        url: 'git+https://github.com/Maersk-Global/mds.git',
        directory: 'packages/mc-button',
      });
    });

    test('should handle string repository format', async () => {
      const { getPackageInfo } = await import('../utils.mjs');
      
      const mockPackageData = {
        name: '@maersk-global/mc-button',
        version: '2.1.0',
        repository: 'https://github.com/Maersk-Global/mds.git',
      };

      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPackageData));

      const result = getPackageInfo('/mock/path/package.json');

      expect(result.repository).toBe('https://github.com/Maersk-Global/mds.git');
    });
  });
});
