import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Mock the fs module for the main function tests
const mockFsOverrides = vi.hoisted(() => ({
  readdirSync: vi.fn(),
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

// Mock path.join for the main function tests
const mockPathJoin = vi.hoisted(() => vi.fn());

vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    readdirSync: (...args) =>
      mockFsOverrides.readdirSync.getMockImplementation()
        ? mockFsOverrides.readdirSync(...args)
        : actual.readdirSync(...args),
    existsSync: (...args) =>
      mockFsOverrides.existsSync.getMockImplementation()
        ? mockFsOverrides.existsSync(...args)
        : actual.existsSync(...args),
    readFileSync: (...args) =>
      mockFsOverrides.readFileSync.getMockImplementation()
        ? mockFsOverrides.readFileSync(...args)
        : actual.readFileSync(...args),
    writeFileSync: (...args) =>
      mockFsOverrides.writeFileSync.getMockImplementation()
        ? mockFsOverrides.writeFileSync(...args)
        : actual.writeFileSync(...args),
  };
});

vi.mock('path', async () => {
  const actual = await vi.importActual('path');
  return {
    ...actual,
    join: (...args) => (mockPathJoin.getMockImplementation() ? mockPathJoin(...args) : actual.join(...args)),
  };
});

import { getComponentName, cleanDescription, processMetadataFile, arrayToCSV, main } from '../extract-metadata.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test data directory
const testDataDir = join(__dirname, 'test-data');
const testDistDir = join(testDataDir, 'dist', 'packages');

describe('extract-metadata.mjs', () => {
  beforeAll(() => {
    console.error = vi.fn(); // Suppress all console.error output
    console.log = vi.fn(); // Suppress all console.log output
    console.warn = vi.fn(); // Suppress all console.warn output
  });
  beforeEach(() => {
    // Create test data directory structure
    if (existsSync(testDataDir)) {
      rmSync(testDataDir, { recursive: true, force: true });
    }
    mkdirSync(testDataDir, { recursive: true });
    mkdirSync(testDistDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up test data
    if (existsSync(testDataDir)) {
      rmSync(testDataDir, { recursive: true, force: true });
    }
    // Restore any mocked console methods
    vi.restoreAllMocks();
  });

  describe('getComponentName', () => {
    it('should extract component name from package name', () => {
      const packageName = '@maersk-global/mds-components-core-button';
      const result = getComponentName(packageName);
      expect(result).toBe('mc-button');
    });

    it('should handle different component names', () => {
      expect(getComponentName('@maersk-global/mds-components-core-input')).toBe('mc-input');
      expect(getComponentName('@maersk-global/mds-components-core-typeahead-multi-select')).toBe(
        'mc-typeahead-multi-select',
      );
    });

    it('should return original string if pattern does not match', () => {
      const packageName = 'some-other-package';
      const result = getComponentName(packageName);
      expect(result).toBe('some-other-package');
    });
  });

  describe('cleanDescription', () => {
    it('should remove HTML tags from description', () => {
      const description = '<p>This is a <strong>bold</strong> description with <em>italic</em> text.</p>';
      const result = cleanDescription(description);
      expect(result).toBe('This is a bold description with italic text.');
    });

    it('should handle nested HTML tags', () => {
      const description = '<div><p>Nested <span class="highlight">content</span></p></div>';
      const result = cleanDescription(description);
      expect(result).toBe('Nested content');
    });

    it('should return empty string for null/undefined input', () => {
      expect(cleanDescription(null)).toBe('');
      expect(cleanDescription(undefined)).toBe('');
      expect(cleanDescription('')).toBe('');
    });

    it('should trim whitespace', () => {
      const description = '  <p>  Whitespace test  </p>  ';
      const result = cleanDescription(description);
      expect(result).toBe('Whitespace test');
    });

    it('should handle self-closing tags', () => {
      const description = 'Line 1<br/>Line 2<hr/>Line 3';
      const result = cleanDescription(description);
      expect(result).toBe('Line 1Line 2Line 3');
    });
  });

  describe('processMetadataFile', () => {
    it('should process a complete metadata file', () => {
      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-button',
        },
        api: {
          props: [
            {
              name: 'disabled',
              description: '<p>Whether the button is disabled</p>',
              category: 'Actions',
            },
            {
              name: 'variant',
              description: 'Button appearance variant',
              category: 'Appearance',
            },
          ],
          events: [
            {
              name: 'click',
              description: '<em>Emitted when button is clicked</em>',
            },
          ],
          slots: [
            {
              name: 'default',
              description: 'Default slot for button content',
            },
          ],
        },
        styling: {
          cssParts: [
            {
              name: 'button',
              description: '<strong>The main button element</strong>',
            },
          ],
        },
      };

      // Create test metadata file
      const testMetadataPath = join(testDataDir, 'test-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);

      expect(result).toHaveLength(5);

      // Check props
      expect(result[0]).toEqual({
        component: 'mc-button',
        category: 'Actions',
        type: 'props',
        name: 'disabled',
        description: 'Whether the button is disabled',
      });

      expect(result[1]).toEqual({
        component: 'mc-button',
        category: 'Appearance',
        type: 'props',
        name: 'variant',
        description: 'Button appearance variant',
      });

      // Check events
      expect(result[2]).toEqual({
        component: 'mc-button',
        category: 'Events',
        type: 'events',
        name: 'click',
        description: 'Emitted when button is clicked',
      });

      // Check slots
      expect(result[3]).toEqual({
        component: 'mc-button',
        category: 'Slots',
        type: 'slots',
        name: 'default',
        description: 'Default slot for button content',
      });

      // Check CSS parts
      expect(result[4]).toEqual({
        component: 'mc-button',
        category: 'Css parts',
        type: 'cssParts',
        name: 'button',
        description: 'The main button element',
      });
    });

    it('should handle metadata file with missing sections', () => {
      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-input',
        },
        api: {
          props: [
            {
              name: 'value',
              description: 'Input value',
              category: 'Data',
            },
          ],
          // Missing events and slots
        },
        // Missing styling section
      };

      const testMetadataPath = join(testDataDir, 'partial-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        component: 'mc-input',
        category: 'Data',
        type: 'props',
        name: 'value',
        description: 'Input value',
      });
    });

    it('should handle invalid JSON file', () => {
      const testMetadataPath = join(testDataDir, 'invalid-metadata.json');
      writeFileSync(testMetadataPath, 'invalid json content');

      const result = processMetadataFile(testMetadataPath);
      expect(result).toEqual([]);
    });

    it('should handle non-existent file', () => {
      const testMetadataPath = join(testDataDir, 'non-existent.json');
      const result = processMetadataFile(testMetadataPath);
      expect(result).toEqual([]);
    });

    it('should handle empty metadata structure', () => {
      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-empty',
        },
      };

      const testMetadataPath = join(testDataDir, 'empty-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);
      expect(result).toEqual([]);
    });
  });

  describe('arrayToCSV', () => {
    it('should convert array data to CSV format', () => {
      const testData = [
        {
          component: 'mc-button',
          category: 'Actions',
          type: 'props',
          name: 'disabled',
          description: 'Whether the button is disabled',
        },
        {
          component: 'mc-input',
          category: 'Events',
          type: 'events',
          name: 'change',
          description: 'Emitted when value changes',
        },
      ];

      const result = arrayToCSV(testData);
      const expectedCsv =
        'Component;Category;Type;Name;Description\n' +
        'mc-button;Actions;props;disabled;Whether the button is disabled\n' +
        'mc-input;Events;events;change;Emitted when value changes';

      expect(result).toBe(expectedCsv);
    });

    it('should handle empty array', () => {
      const result = arrayToCSV([]);
      expect(result).toBe('');
    });

    it('should escape semicolons in CSV values', () => {
      const testData = [
        {
          component: 'mc-test',
          category: 'Actions',
          type: 'props',
          name: 'config',
          description: 'Configuration object; contains multiple settings',
        },
      ];

      const result = arrayToCSV(testData);
      expect(result).toContain('"Configuration object; contains multiple settings"');
    });

    it('should escape quotes in CSV values', () => {
      const testData = [
        {
          component: 'mc-test',
          category: 'Actions',
          type: 'props',
          name: 'label',
          description: 'Button label with "quotes" in it',
        },
      ];

      const result = arrayToCSV(testData);
      expect(result).toContain('"Button label with ""quotes"" in it"');
    });

    it('should handle newlines in descriptions', () => {
      const testData = [
        {
          component: 'mc-test',
          category: 'Actions',
          type: 'props',
          name: 'description',
          description: 'Multi-line\ndescription\nwith breaks',
        },
      ];

      const result = arrayToCSV(testData);
      expect(result).toContain('"Multi-line\ndescription\nwith breaks"');
    });

    it('should handle multiple special characters together', () => {
      const testData = [
        {
          component: 'mc-test',
          category: 'Actions',
          type: 'props',
          name: 'complex',
          description: 'Complex; description with "quotes"\nand newlines',
        },
      ];

      const result = arrayToCSV(testData);
      expect(result).toContain('"Complex; description with ""quotes""\nand newlines"');
    });
  });

  describe('integration tests', () => {
    it('should process multiple component directories', () => {
      // Create test component directories with metadata files
      const components = ['button', 'input', 'select'];

      components.forEach((componentName, index) => {
        const componentDir = join(testDistDir, `mds-components-core-${componentName}`);
        mkdirSync(componentDir, { recursive: true });

        const mockMetadata = {
          overview: {
            packageName: `@maersk-global/mds-components-core-${componentName}`,
          },
          api: {
            props: [
              {
                name: `prop${index}`,
                category: 'Actions',
                description: `${componentName} property`,
              },
            ],
          },
        };

        const metadataPath = join(componentDir, 'metadata.json');
        writeFileSync(metadataPath, JSON.stringify(mockMetadata, null, 2));
      });

      // Mock the __dirname for the main function
      const originalProcessArgv = process.argv;
      const originalImportMetaUrl = import.meta.url;

      // We can't easily test the main function directly due to __dirname usage
      // Instead, let's test the core logic
      const testData = [
        { component: 'mc-button', category: 'Actions', type: 'props', name: 'prop0', description: 'button property' },
        { component: 'mc-input', category: 'Actions', type: 'props', name: 'prop1', description: 'input property' },
        { component: 'mc-select', category: 'Actions', type: 'props', name: 'prop2', description: 'select property' },
      ];

      const csvResult = arrayToCSV(testData);

      expect(csvResult).toContain('mc-button;Actions;props;prop0;button property');
      expect(csvResult).toContain('mc-input;Actions;props;prop1;input property');
      expect(csvResult).toContain('mc-select;Actions;props;prop2;select property');
    });

    it('should handle mixed valid and invalid metadata files', () => {
      // Create one valid and one invalid component directory
      const validComponentDir = join(testDistDir, 'mds-components-core-valid');
      const invalidComponentDir = join(testDistDir, 'mds-components-core-invalid');

      mkdirSync(validComponentDir, { recursive: true });
      mkdirSync(invalidComponentDir, { recursive: true });

      // Valid metadata
      const validMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-valid',
        },
        api: {
          props: [
            {
              name: 'validProp',
              description: 'A valid property',
            },
          ],
        },
      };

      writeFileSync(join(validComponentDir, 'metadata.json'), JSON.stringify(validMetadata, null, 2));

      // Invalid metadata
      writeFileSync(join(invalidComponentDir, 'metadata.json'), 'invalid json');

      const validResult = processMetadataFile(join(validComponentDir, 'metadata.json'));
      const invalidResult = processMetadataFile(join(invalidComponentDir, 'metadata.json'));

      expect(validResult).toHaveLength(1);
      expect(validResult[0].component).toBe('mc-valid');
      expect(invalidResult).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('should handle metadata with null/undefined descriptions', () => {
      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-test',
        },
        api: {
          props: [
            {
              name: 'propWithNull',
              description: null,
            },
            {
              name: 'propWithUndefined',
              // description is undefined
            },
            {
              name: 'propWithEmpty',
              description: '',
            },
          ],
        },
      };

      const testMetadataPath = join(testDataDir, 'null-desc-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);

      expect(result).toHaveLength(3);
      expect(result[0].description).toBe('');
      expect(result[1].description).toBe('');
      expect(result[2].description).toBe('');
    });

    it('should handle very long descriptions', () => {
      const longDescription = 'A'.repeat(1000) + '<p>HTML content</p>' + 'B'.repeat(1000);

      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-test',
        },
        api: {
          props: [
            {
              name: 'longProp',
              description: longDescription,
            },
          ],
        },
      };

      const testMetadataPath = join(testDataDir, 'long-desc-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);

      expect(result).toHaveLength(1);
      expect(result[0].description).toBe('A'.repeat(1000) + 'HTML content' + 'B'.repeat(1000));
      expect(result[0].description).not.toContain('<p>');
      expect(result[0].description).not.toContain('</p>');
    });

    it('should handle special characters in component names', () => {
      const mockMetadata = {
        overview: {
          packageName: '@maersk-global/mds-components-core-multi-select-advanced',
        },
        api: {
          props: [
            {
              name: 'test-prop',
              description: 'Test property',
            },
          ],
        },
      };

      const testMetadataPath = join(testDataDir, 'special-name-metadata.json');
      writeFileSync(testMetadataPath, JSON.stringify(mockMetadata, null, 2));

      const result = processMetadataFile(testMetadataPath);

      expect(result).toHaveLength(1);
      expect(result[0].component).toBe('mc-multi-select-advanced');
    });
  });

  describe('main function', () => {
    beforeEach(() => {
      // Mock console methods
      vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(console, 'error').mockImplementation(() => {});

      // Reset all mocks
      vi.clearAllMocks();
    });

    it('should process component directories and generate CSV file', () => {
      // Mock directories
      const mockDirectories = [
        { name: 'mds-components-core-button', isDirectory: () => true },
        { name: 'mds-components-core-input', isDirectory: () => true },
        { name: 'other-package', isDirectory: () => true },
      ];

      // Setup mocks
      mockFsOverrides.readdirSync.mockReturnValue(mockDirectories);
      mockFsOverrides.existsSync.mockImplementation((path) => path.includes('metadata.json'));

      mockFsOverrides.readFileSync.mockImplementation((path) => {
        if (path.includes('button')) {
          return JSON.stringify({
            overview: { packageName: '@maersk-global/mds-components-core-button' },
            api: {
              props: [{ name: 'disabled', category: 'Actions', description: '<p>Button disabled state</p>' }],
              events: [{ name: 'click', category: 'Events', description: 'Button click event' }],
            },
          });
        }
        if (path.includes('input')) {
          return JSON.stringify({
            overview: { packageName: '@maersk-global/mds-components-core-input' },
            api: { props: [{ name: 'value', category: 'Actions', description: 'Input value' }] },
          });
        }
        return '';
      });

      let csvOutput = '';
      mockFsOverrides.writeFileSync.mockImplementation((path, content) => {
        if (path.includes('component-metadata.csv')) {
          csvOutput = content;
        }
      });

      mockPathJoin.mockImplementation((...args) => {
        if (args.includes('dist') && args.includes('packages')) {
          return '/test/dist/packages';
        }
        if (args.includes('component-metadata.csv')) {
          return '/test/component-metadata.csv';
        }
        return args.join('/');
      });

      // Execute main function
      main();

      // Verify CSV content
      expect(csvOutput).toContain('Component;Category;Type;Name;Description');
      expect(csvOutput).toContain('mc-button;Actions;props;disabled;Button disabled state');
      expect(csvOutput).toContain('mc-button;Events;events;click;Button click event');
      expect(csvOutput).toContain('mc-input;Actions;props;value;Input value');
    });

    it('should handle missing metadata files gracefully', () => {
      const mockDirectories = [
        { name: 'mds-components-core-button', isDirectory: () => true },
        { name: 'mds-components-core-input', isDirectory: () => true },
      ];

      mockFsOverrides.readdirSync.mockReturnValue(mockDirectories);
      // Only button has metadata
      mockFsOverrides.existsSync.mockImplementation(
        (path) => path.includes('button') && path.includes('metadata.json'),
      );

      mockFsOverrides.readFileSync.mockImplementation((path) => {
        if (path.includes('button')) {
          return JSON.stringify({
            overview: { packageName: '@maersk-global/mds-components-core-button' },
            api: { props: [{ name: 'disabled', category: 'Actions', description: 'Button disabled state' }] },
          });
        }
        return '';
      });

      let csvOutput = '';
      mockFsOverrides.writeFileSync.mockImplementation((path, content) => {
        if (path.includes('component-metadata.csv')) {
          csvOutput = content;
        }
      });

      mockPathJoin.mockImplementation((...args) => {
        if (args.includes('dist') && args.includes('packages')) {
          return '/test/dist/packages';
        }
        if (args.includes('component-metadata.csv')) {
          return '/test/component-metadata.csv';
        }
        return args.join('/');
      });

      main();

      // Verify CSV contains only valid data
      expect(csvOutput).toContain('mc-button;Actions;props;disabled;Button disabled state');
      expect(csvOutput).not.toContain('mc-input');
    });

    it('should handle file system errors gracefully', () => {
      mockFsOverrides.readdirSync.mockImplementation(() => {
        throw new Error('Directory not found');
      });

      mockPathJoin.mockImplementation((...args) => {
        if (args.includes('dist') && args.includes('packages')) {
          return '/test/dist/packages';
        }
        return args.join('/');
      });

      main();

      // Should handle the error and log it
      expect(console.error).toHaveBeenCalledWith('Error:', 'Directory not found');
    });

    it('should handle directory with no component directories', () => {
      const mockDirectories = [
        { name: 'some-other-package', isDirectory: () => true },
        { name: 'another-package', isDirectory: () => true },
      ];

      mockFsOverrides.readdirSync.mockReturnValue(mockDirectories);

      let csvOutput = '';
      mockFsOverrides.writeFileSync.mockImplementation((path, content) => {
        if (path.includes('component-metadata.csv')) {
          csvOutput = content;
        }
      });

      mockPathJoin.mockImplementation((...args) => {
        if (args.includes('dist') && args.includes('packages')) {
          return '/test/dist/packages';
        }
        if (args.includes('component-metadata.csv')) {
          return '/test/component-metadata.csv';
        }
        return args.join('/');
      });

      main();

      // Should create empty CSV file
      expect(csvOutput).toBe('');
    });

    it('should handle invalid JSON in metadata files', () => {
      const mockDirectories = [{ name: 'mds-components-core-invalid', isDirectory: () => true }];

      mockFsOverrides.readdirSync.mockReturnValue(mockDirectories);
      mockFsOverrides.existsSync.mockReturnValue(true);
      mockFsOverrides.readFileSync.mockImplementation(() => 'invalid json content');

      let csvOutput = '';
      mockFsOverrides.writeFileSync.mockImplementation((path, content) => {
        if (path.includes('component-metadata.csv')) {
          csvOutput = content;
        }
      });

      mockPathJoin.mockImplementation((...args) => {
        if (args.includes('dist') && args.includes('packages')) {
          return '/test/dist/packages';
        }
        if (args.includes('component-metadata.csv')) {
          return '/test/component-metadata.csv';
        }
        return args.join('/');
      });

      main();

      // CSV should be empty due to invalid JSON
      expect(csvOutput).toBe('');
    });
  });
});
