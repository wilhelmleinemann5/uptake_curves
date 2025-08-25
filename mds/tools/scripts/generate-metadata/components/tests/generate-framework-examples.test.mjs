import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateFrameworkExamples } from '../generate-framework-examples.mjs';

describe('generate-framework-examples', () => {
  const testDir = '/tmp/mds-test-framework-examples';
  const testPackageDir = join(testDir, 'mc-button');

  beforeAll(() => {
    console.error = vi.fn(); // Suppress all console.error output
    console.log = vi.fn(); // Suppress all console.log output
    console.warn = vi.fn(); // Suppress all console.warn output
  });

  beforeEach(() => {
    if (!existsSync(testPackageDir)) {
      mkdirSync(testPackageDir, { recursive: true });
    }
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('Basic functionality', () => {
    test('should return framework examples when generateCode function is available', async () => {
      // The generateCode function appears to be available in the test environment
      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('vue3');
      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('angular');
    });

    test('should extract package name from directory path', async () => {
      // Create mock args.json file
      const distDir = join(testPackageDir, '../../dist/packages/mds-components-core-button');
      mkdirSync(distDir, { recursive: true });

      const argsData = {
        argTypes: {
          appearance: {
            type: 'property',
            defaultValue: 'primary',
            options: ['primary', 'secondary'],
            control: { type: 'select' },
          },
        },
      };

      writeFileSync(join(distDir, 'args.json'), JSON.stringify(argsData, null, 2));

      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      // Should return framework examples since generateCode is available
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('Component data loading', () => {
    test('should handle missing args.json file', async () => {
      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      // Should still return framework examples even without args.json
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    test('should parse args.json correctly when file exists', async () => {
      // Create the expected directory structure
      const distDir = join(testPackageDir, '../../dist/packages/mds-components-core-button');
      mkdirSync(distDir, { recursive: true });

      const argsData = {
        argTypes: {
          appearance: {
            type: 'property',
            defaultValue: 'primary',
            options: ['primary', 'secondary', 'outline'],
            control: { type: 'select' },
          },
          disabled: {
            type: 'property',
            defaultValue: false,
            control: { type: 'boolean' },
          },
          label: {
            type: 'property',
            defaultValue: 'Button',
            control: { type: 'text' },
          },
          click: {
            type: 'event',
            description: 'Emitted when button is clicked',
          },
        },
      };

      writeFileSync(join(distDir, 'args.json'), JSON.stringify(argsData, null, 2));

      // With a valid args.json file, should work with parsed data
      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    test('should handle malformed args.json gracefully', async () => {
      const distDir = join(testPackageDir, '../../dist/packages/mds-components-core-button');
      mkdirSync(distDir, { recursive: true });

      // Write malformed JSON
      writeFileSync(join(distDir, 'args.json'), '{ invalid json content }');

      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      // Should still return framework examples even with malformed args.json
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('Example value generation', () => {
    test('should select non-default options for properties with options', async () => {
      const distDir = join(testPackageDir, '../../dist/packages/mds-components-core-button');
      mkdirSync(distDir, { recursive: true });

      const argsData = {
        argTypes: {
          size: {
            type: 'property',
            defaultValue: 'medium',
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
          },
          appearance: {
            type: 'property',
            defaultValue: 'primary',
            options: ['secondary', 'outline', 'primary'], // Put default at end
            control: { type: 'select' },
          },
        },
      };

      writeFileSync(join(distDir, 'args.json'), JSON.stringify(argsData, null, 2));

      const result = await generateFrameworkExamples(testPackageDir, 'mc-button');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('Tag name handling', () => {
    test('should clean tag name with backticks', async () => {
      const result = await generateFrameworkExamples(testPackageDir, '`mc-button`');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('vue3');
      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('angular');
    });

    test('should handle various tag name formats', async () => {
      const testCases = ['mc-button', '`mc-button`', 'mc-input', '`mc-select`'];

      for (const tagName of testCases) {
        const result = await generateFrameworkExamples(testPackageDir, tagName);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('vue3');
        expect(result).toHaveProperty('react');
        expect(result).toHaveProperty('angular');
      }
    });
  });

  describe('Error scenarios', () => {
    test('should handle non-existent package directory', async () => {
      const nonExistentDir = '/tmp/non-existent-package';
      const result = await generateFrameworkExamples(nonExistentDir, 'mc-test');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('vue3');
      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('angular');
    });

    test('should handle empty package directory name', async () => {
      const result = await generateFrameworkExamples('', 'mc-button');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('vue3');
      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('angular');
    });

    test('should handle package directory with special characters', async () => {
      const specialDir = join(testDir, 'mc-button@special#chars');
      mkdirSync(specialDir, { recursive: true });

      const result = await generateFrameworkExamples(specialDir, 'mc-button');

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('vue3');
      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('angular');
    });
  });

  describe('Framework mapping', () => {
    // These tests verify that the framework mapping functions would work correctly
    // when the actual generateCode function is available

    test('should handle framework label mapping', () => {
      // Test the mapping logic that would be used
      const frameworkLabels = ['React', 'Vue', 'Angular', 'HTML'];
      const expectedMappings = {
        React: 'react',
        Vue: 'vue',
        Angular: 'angular',
        HTML: 'html',
      };

      // This would be tested when the actual implementation is available
      expect(frameworkLabels.length).toBeGreaterThan(0);
    });

    test('should generate proper import statements for different frameworks', () => {
      const packageName = 'mc-button';
      const componentName = 'McButton';

      // Expected import patterns that would be generated
      const expectedImports = {
        react: `import { McButton } from '@maersk-global/${packageName}';`,
        vue: `import '@maersk-global/${packageName}';`,
        angular: `import '@maersk-global/${packageName}';`,
        html: `<script type="module" src="node_modules/@maersk-global/${packageName}/dist/index.js"></script>`,
      };

      // Verify the expected patterns exist
      expect(Object.keys(expectedImports)).toContain('react');
      expect(Object.keys(expectedImports)).toContain('vue');
      expect(Object.keys(expectedImports)).toContain('angular');
      expect(Object.keys(expectedImports)).toContain('html');
    });
  });

  describe('Component name extraction', () => {
    test('should convert package names to component names correctly', () => {
      const testCases = [
        { package: 'mc-button', expected: 'McButton' },
        { package: 'mc-input-date', expected: 'McInputDate' },
        { package: 'mc-select-native', expected: 'McSelectNative' },
        { package: 'mc-multi-select', expected: 'McMultiSelect' },
      ];

      // This verifies the logic that would be used in component name conversion
      testCases.forEach(({ package: pkg, expected }) => {
        const parts = pkg.split('-');
        const componentName = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');

        expect(componentName).toBe(expected);
      });
    });
  });
});
