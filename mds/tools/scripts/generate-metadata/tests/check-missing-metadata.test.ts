import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Mock filesystem operations
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  statSync: vi.fn(),
}));

// Mock path operations
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}));

// Mock process.exit
const mockProcessExit = vi.fn().mockImplementation((code) => {
  throw new Error(`process.exit called with ${code}`);
});

Object.defineProperty(process, 'exit', {
  value: mockProcessExit,
  writable: true,
});

describe('check-missing-metadata', () => {
  let mockConsoleLog: any;
  let mockConsoleError: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('checkMissingMetadata', () => {
    test('should return 0 when all packages have metadata files', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      // Mock packages directory exists
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        // All metadata files exist
        if (path.includes('metadata.json')) return true;
        return false;
      });

      // Mock packages in directory
      vi.mocked(readdirSync).mockReturnValue(['mc-button', 'mc-input', 'mds-foundations', 'mds-design-tokens', 'mds-config']);
      
      // Mock statSync to return directory stats
      vi.mocked(statSync).mockReturnValue({
        isDirectory: () => true,
      } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith('🎉 All packages have metadata.json files!');
    });

    test('should exit with code 1 when packages directory does not exist', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      // Mock packages directory doesn't exist
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return false;
        return false;
      });

      // Re-setup the process.exit mock to ensure it's active
      const exitMock = vi.fn().mockImplementation((code) => {
        throw new Error(`process.exit called with ${code}`);
      });
      
      // Override process.exit for this test
      const originalExit = process.exit;
      process.exit = exitMock as any;
      
      try {
        expect(() => checkMissingMetadata()).toThrow('process.exit called with 1');
        expect(mockConsoleError).toHaveBeenCalledWith('❌ Packages directory not found:', './packages');
        expect(exitMock).toHaveBeenCalledWith(1);
      } finally {
        // Restore process.exit
        process.exit = originalExit;
      }
    });

    test('should count missing metadata files for component packages', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        // mc-button missing metadata, mc-input has metadata
        if (path === 'dist/packages/mds-components-core-button/metadata.json') return false;
        if (path === 'dist/packages/mds-components-core-input/metadata.json') return true;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mc-button', 'mc-input']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mc-button');
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mc-input');
    });

    test('should handle mds-foundations special case with CSS metadata files', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-foundations/metadata.json') return false;
        if (path === 'dist/packages/mds-foundations/css') return true;
        return false;
      });

      vi.mocked(readdirSync).mockImplementation((path) => {
        if (path === './packages') return ['mds-foundations'];
        if (path === 'dist/packages/mds-foundations/css') {
          return ['_typography.css', '_colors.css', '_typography.metadata.json', '_colors.metadata.json'];
        }
        return [];
      });
      
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mds-foundations (2 CSS metadata files)');
    });

    test('should detect missing CSS metadata files in mds-foundations', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-foundations/metadata.json') return false;
        if (path === 'dist/packages/mds-foundations/css') return true;
        return false;
      });

      vi.mocked(readdirSync).mockImplementation((path) => {
        if (path === './packages') return ['mds-foundations'];
        if (path === 'dist/packages/mds-foundations/css') {
          // CSS files exist but missing metadata for typography
          return ['_typography.css', '_colors.css', '_colors.metadata.json'];
        }
        return [];
      });
      
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-foundations - missing metadata for: _typography.css');
    });

    test('should handle mds-design-tokens special case with brand metadata files', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-design-tokens/metadata.json') return false;
        if (path === 'dist/packages/mds-design-tokens') return true;
        // All brand metadata files exist
        if (path.includes('maersk/metadata.json')) return true;
        if (path.includes('apmterminals/metadata.json')) return true;
        if (path.includes('alianca/metadata.json')) return true;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mds-design-tokens']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mds-design-tokens (3 brand metadata files)');
    });

    test('should detect missing brand metadata files in mds-design-tokens', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-design-tokens/metadata.json') return false;
        if (path === 'dist/packages/mds-design-tokens') return true;
        // Missing maersk and alianca brand metadata
        if (path.includes('maersk/metadata.json')) return false;
        if (path.includes('apmterminals/metadata.json')) return true;
        if (path.includes('alianca/metadata.json')) return false;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mds-design-tokens']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-design-tokens - missing metadata for brands: maersk, alianca');
    });

    test('should handle mds-config package with standard metadata file', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-config/metadata.json') return true;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mds-config']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mds-config');
    });

    test('should filter out non-directory items from packages folder', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-components-core-button/metadata.json') return true;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mc-button', 'README.md', 'package.json']);
      
      // Mock statSync to return different types
      vi.mocked(statSync).mockImplementation((path) => {
        if (path === './packages/mc-button') {
          return { isDirectory: () => true } as any;
        }
        // README.md and package.json are files, not directories
        return { isDirectory: () => false } as any;
      });

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      // Should only process mc-button, not the files
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Checking 1 packages'));
    });

    test('should provide helpful summary when metadata files are missing', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        // All packages missing metadata
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mc-button', 'mc-input', 'mds-config']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(3);
      expect(mockConsoleLog).toHaveBeenCalledWith('📋 Summary: 3 package(s) missing metadata.json:');
      expect(mockConsoleLog).toHaveBeenCalledWith('   • mc-button');
      expect(mockConsoleLog).toHaveBeenCalledWith('   • mc-input');
      expect(mockConsoleLog).toHaveBeenCalledWith('   • mds-config');
      expect(mockConsoleLog).toHaveBeenCalledWith('\n💡 To generate metadata for a package, run:');
      expect(mockConsoleLog).toHaveBeenCalledWith('   npx nx run <package-name>:build');
    });

    test('should handle mixed package types correctly', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        // Component packages have metadata
        if (path.includes('mds-components-core-')) return true;
        // Foundation packages missing metadata
        if (path.includes('mds-foundations') || path.includes('mds-config')) return false;
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mc-button', 'mc-input', 'mds-foundations', 'mds-config', 'other-package']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(2); // mds-foundations and mds-config missing
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mc-button');
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mc-input');
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-foundations');
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-config');
      // other-package should be ignored (doesn't match prefixes)
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Checking 4 packages'));
    });

    test('should handle mds-foundations with missing CSS directory', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-foundations/metadata.json') return false;
        if (path === 'dist/packages/mds-foundations/css') return false; // CSS dir missing
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mds-foundations']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-foundations');
    });

    test('should handle mds-design-tokens with missing package directory', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-design-tokens/metadata.json') return false;
        if (path === 'dist/packages/mds-design-tokens') return false; // Package dir missing
        return false;
      });

      vi.mocked(readdirSync).mockReturnValue(['mds-design-tokens']);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('❌ Missing: mds-design-tokens');
    });

    test('should correctly log package counts', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readdirSync).mockReturnValue([
        'mc-button', 'mc-input', 'mc-card', // 3 component packages
        'mds-foundations', 'mds-design-tokens', 'mds-config', // 3 foundation packages
        'other-package', 'another-package' // Should be ignored
      ]);
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      checkMissingMetadata();

      expect(mockConsoleLog).toHaveBeenCalledWith('🔍 Checking 6 packages for metadata.json files...');
      expect(mockConsoleLog).toHaveBeenCalledWith('   📦 Foundation packages: 3');
      expect(mockConsoleLog).toHaveBeenCalledWith('   🧩 Component packages: 3\n');
    });

    test('should ignore minified CSS files in mds-foundations', async () => {
      const { checkMissingMetadata } = await import('../check-missing-metadata.mjs');
      
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === './packages') return true;
        if (path === 'dist/packages/mds-foundations/metadata.json') return false;
        if (path === 'dist/packages/mds-foundations/css') return true;
        return false;
      });

      vi.mocked(readdirSync).mockImplementation((path) => {
        if (path === './packages') return ['mds-foundations'];
        if (path === 'dist/packages/mds-foundations/css') {
          return [
            '_typography.css', 
            '_colors.css',
            '_typography.min.css', // Should be ignored
            '_colors.min.css', // Should be ignored
            'typography.css', // Should be ignored (no _ prefix)
            '_typography.metadata.json',
            '_colors.metadata.json'
          ];
        }
        return [];
      });
      
      vi.mocked(statSync).mockReturnValue({ isDirectory: () => true } as any);

      const result = checkMissingMetadata();

      expect(result).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Found:   mds-foundations (2 CSS metadata files)');
    });
  });
});
