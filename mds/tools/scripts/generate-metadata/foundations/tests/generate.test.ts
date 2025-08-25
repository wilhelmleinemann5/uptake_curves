import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import {
  generateFoundationsMetadata,
  processCSSFile,
  extractCSSClasses,
  extractInlineComment,
  extractClassName,
  parseClassComment,
  getFileDescription,
} from '../generate.mjs';

// Mock fs functions
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  readdirSync: vi.fn(),
  existsSync: vi.fn(),
}));

// Mock utils and UX docs
vi.mock('../../utils.mjs', () => ({
  getPackageInfo: vi.fn(),
}));

vi.mock('../../get-ux-docs.mjs', () => ({
  fetchUxBestPractices: vi.fn(),
  enhanceGuidelines: vi.fn(),
}));

vi.mock('../ux-general-mapping.mjs', () => ({
  uxGeneralGuidelinesMapping: {
    _color: [
      {
        docCategory: 'general',
        docType: 'design-language',
        docName: 'colour-roles',
        relevance: 'high',
      },
      {
        docCategory: 'designPrinciples',
        docType: 'design-language',
        docName: 'index',
        relevance: 'high',
      },
    ],
    _typography: [
      {
        docCategory: 'general',
        docType: 'design-language',
        docName: 'typography',
        relevance: 'high',
      },
    ],
  },
}));

// Mock console methods to reduce test noise
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

// Mock process.exit to prevent test runner from exiting
const mockExit = vi.spyOn(process, 'exit').mockImplementation((code?: number | string) => {
  return undefined as never;
});

describe('foundations/generate', () => {
  const testDir = '/tmp/mds-test-foundations';
  const packageDir = testDir;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
    mockExit.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('extractClassName', () => {
    test('should extract class name from simple CSS selector', () => {
      expect(extractClassName('.button {')).toBe('button');
      expect(extractClassName('.primary-color {')).toBe('primary-color');
      expect(extractClassName('.mds-text-lg {')).toBe('mds-text-lg');
    });

    test('should extract class name from complex CSS selectors', () => {
      expect(extractClassName('.button:hover {')).toBe('button');
      expect(extractClassName('.card .header {')).toBe('card');
      expect(extractClassName('.nav-item::before {')).toBe('nav-item');
    });

    test('should handle selectors with numbers and special characters', () => {
      expect(extractClassName('.text-2xl {')).toBe('text-2xl');
      expect(extractClassName('.mt-4 {')).toBe('mt-4');
      expect(extractClassName('.bg-blue_500 {')).toBe('bg-blue_500');
    });

    test('should return null for invalid selectors', () => {
      expect(extractClassName('button {')).toBeNull();
      expect(extractClassName('#id-selector {')).toBeNull();
      expect(extractClassName('/* comment */')).toBeNull();
      expect(extractClassName('')).toBeNull();
    });
  });

  describe('extractInlineComment', () => {
    test('should extract single-line comment', () => {
      const lines = ['.button {', '  /* @name: Primary Button */', '  color: blue;', '}'];

      const result = extractInlineComment(lines, 1);
      expect(result).toEqual({ content: '@name: Primary Button' });
    });

    test('should extract multi-line comment', () => {
      const lines = [
        '.button {',
        '  /*',
        '   * @name: Primary Button',
        '   * @category: Buttons',
        '   */',
        '  color: blue;',
        '}',
      ];

      const result = extractInlineComment(lines, 1);
      expect(result?.content).toContain('@name: Primary Button');
      expect(result?.content).toContain('@category: Buttons');
    });

    test('should return null when no comment found', () => {
      const lines = ['.button {', '  color: blue;', '  padding: 8px;', '}'];

      const result = extractInlineComment(lines, 1);
      expect(result).toBeNull();
    });

    test('should stop at closing brace', () => {
      const lines = ['.button {', '  /* @name: Primary Button */', '}', '/* This should not be included */'];

      const result = extractInlineComment(lines, 1);
      expect(result).toEqual({ content: '@name: Primary Button' });
    });
  });

  describe('parseClassComment', () => {
    test('should parse comment with all fields', () => {
      const commentContent = `@name: Primary Button
@category: Buttons
@usage:
Use for primary actions in forms and dialogs
@example:
<button class="btn-primary">Click me</button>`;

      const result = parseClassComment(commentContent, 'btn-primary');
      expect(result).toEqual({
        name: 'Primary Button',
        category: 'Buttons',
        usage: 'Use for primary actions in forms and dialogs',
        example: '<button class="btn-primary">Click me</button>',
      });
    });

    test('should use fallback name when @name is missing', () => {
      const commentContent = `@category: Typography
@usage:
Large heading text`;

      const result = parseClassComment(commentContent, 'text-xl');
      expect(result).toEqual({
        name: 'text-xl',
        category: 'Typography',
        usage: 'Large heading text',
        example: null,
      });
    });

    test('should handle multi-line example', () => {
      const commentContent = `
        @name: Card Component
        @example:
        <div class="card">
          <h2>Title</h2>
          <p>Content</p>
        </div>
      `;

      const result = parseClassComment(commentContent, 'card');
      expect(result?.example).toContain('<div class="card">');
      expect(result?.example).toContain('<h2>Title</h2>');
      expect(result?.example).toContain('<p>Content</p>');
    });

    test('should return null for short content', () => {
      expect(parseClassComment('', 'test')).toBeNull();
      expect(parseClassComment('short', 'test')).toBeNull();
      expect(parseClassComment('/* */', 'test')).toBeNull();
    });

    test('should use default category when missing', () => {
      const commentContent = `
        @name: Test Class
        @usage: Test usage
      `;

      const result = parseClassComment(commentContent, 'test');
      expect(result?.category).toBe('No categry available');
    });
  });

  describe('getFileDescription', () => {
    test('should extract description from CSS file', () => {
      const cssContent = `
        /*
         * @description: This file contains color utility classes
         * for theming and brand consistency.
         */
        .color-primary { color: blue; }
      `;

      vi.mocked(readFileSync).mockReturnValue(cssContent);

      const result = getFileDescription('/path/to/color.css');
      expect(result).toBe('This file contains color utility classes for theming and brand consistency.');
    });

    test('should handle multi-line description', () => {
      const cssContent = `
        /*
         * @description: This file provides layout utilities
         * including grid, flexbox, and spacing classes
         * for responsive design.
         */
        .grid { display: grid; }
      `;

      vi.mocked(readFileSync).mockReturnValue(cssContent);

      const result = getFileDescription('/path/to/layout.css');
      expect(result).toBe(
        'This file provides layout utilities including grid, flexbox, and spacing classes for responsive design.',
      );
    });

    test('should return default when no description found', () => {
      const cssContent = `
        .button { color: blue; }
        .card { padding: 16px; }
      `;

      vi.mocked(readFileSync).mockReturnValue(cssContent);

      const result = getFileDescription('/path/to/file.css');
      expect(result).toBe('No description available');
    });

    test('should handle file read errors gracefully', () => {
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = getFileDescription('/path/to/missing.css');
      expect(result).toBe('No description available');
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Warning: Could not read file for description'),
        'File not found',
      );
    });
  });

  describe('extractCSSClasses', () => {
    test('should extract classes with comments', () => {
      const cssContent = `
        .button {
          /*
           @name: Primary Button
           @category: Buttons
           @usage:
           Use for primary actions
           */
          color: blue;
        }

        .text-lg {
          /*
           @name: Large Text
           @category: Typography
           @example:
           <p class="text-lg">Large text</p>
           */
          font-size: 18px;
        }
      `;

      const result = extractCSSClasses(cssContent);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        name: 'Primary Button',
        category: 'Buttons',
        usage: 'Use for primary actions',
        example: null,
      });

      expect(result[1]).toEqual({
        name: 'Large Text',
        category: 'Typography',
        usage: null,
        example: '<p class="text-lg">Large text</p>',
      });
    });

    test('should skip classes without comments', () => {
      const cssContent = `
        .button {
          color: blue;
        }

        .text-lg {
          /* @name: Large Text */
          font-size: 18px;
        }
      `;

      const result = extractCSSClasses(cssContent);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Large Text');
    });

    test('should handle empty CSS content', () => {
      const result = extractCSSClasses('');
      expect(result).toEqual([]);
    });

    test('should use class name when @name is not provided', () => {
      const cssContent = `
        .btn-primary {
          /* @category: Buttons
           * @usage: Primary button style
           */
          color: blue;
        }
      `;

      const result = extractCSSClasses(cssContent);
      expect(result[0].name).toBe('btn-primary');
    });
  });

  describe('processCSSFile', () => {
    const mockFilePath = '/path/to/test.css';

    beforeEach(() => {
      vi.mocked(readFileSync).mockReturnValue(`
        /*
         * @description: Test CSS file for buttons
         */
        .btn {
          /*
           @name: Base Button
           @category: Buttons
           */
          padding: 8px;
        }

        .btn-primary {
          /*
           @name: Primary Button
           @category: Buttons
           @usage:
           Use for primary actions
           */
          color: blue;
        }
      `);
    });

    test('should process CSS file correctly', async () => {
      const result = await processCSSFile(mockFilePath);

      expect(result.description).toBe('Test CSS file for buttons');
      expect(result.classes).toHaveLength(2);
      expect(result.summary.totalClasses).toBe(2);
      expect(result.summary.categories).toContain('Buttons');
    });

    test('should calculate summary correctly', async () => {
      const result = await processCSSFile(mockFilePath);

      expect(result.summary.totalClasses).toBe(2);
      expect(result.summary.categories).toEqual(['Buttons']);
    });

    test('should handle files with no classes', async () => {
      vi.mocked(readFileSync).mockReturnValue(`
        /* Basic CSS without documented classes */
        body { margin: 0; }
      `);

      const result = await processCSSFile(mockFilePath);

      expect(result.classes).toHaveLength(0);
      expect(result.summary.totalClasses).toBe(0);
      expect(result.summary.categories).toEqual([]);
    });
  });

  describe('generateFoundationsMetadata', () => {
    const mockCSSDir = join('/', packageDir, 'dist', 'packages', 'mds-foundations', 'css');

    beforeEach(() => {
      // Mock file system operations
      vi.mocked(existsSync).mockImplementation((path) => {
        return path.includes('css') || path.includes('package.json');
      });

      vi.mocked(readdirSync).mockReturnValue([
        '_color.css',
        '_typography.css',
        'foundations.css', // Should be excluded
        'foundations.min.css', // Should be excluded
        'other.min.css', // Should be excluded
      ]);

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('package.json')) {
          return JSON.stringify({
            name: '@maersk-global/mds-foundations',
            version: '1.0.0',
            description: 'MDS Foundations',
          });
        }

        if (path.includes('_color.css')) {
          return `
            /*
             * @description: Color utility classes
             */
            .text-primary {
              /* @name: Primary Text Color
               * @category: Colors
               */
              color: blue;
            }
          `;
        }

        if (path.includes('_typography.css')) {
          return `
            /*
             * @description: Typography utility classes
             */
            .text-lg {
              /* @name: Large Text
               * @category: Typography
               */
              font-size: 18px;
            }
          `;
        }

        return '';
      });

      vi.mocked(writeFileSync).mockImplementation(() => {
        // Mock successful write
      });
    });

    test('should generate metadata for all CSS files', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-foundations',
        version: '1.0.0',
        description: 'MDS Foundations',
      });

      vi.mocked(fetchUxBestPractices).mockResolvedValue({
        overview: 'Color guidelines',
        usage: 'How to use colors',
      });

      vi.mocked(enhanceGuidelines).mockResolvedValue({
        designPrinciples: ['Consistency'],
        relatedGuidelines: ['Accessibility'],
      });

      await generateFoundationsMetadata(packageDir);

      // Should write metadata for 2 files (_color.css and _typography.css)
      expect(writeFileSync).toHaveBeenCalledTimes(2);

      // Check the content of written metadata
      const writeCall = vi.mocked(writeFileSync).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);

      expect(metadataContent).toHaveProperty('overview');
      expect(metadataContent).toHaveProperty('usage');
      expect(metadataContent).toHaveProperty('api');
      expect(metadataContent).toHaveProperty('guidelines');

      expect(metadataContent.overview.name).toBe('@maersk-global/mds-foundations');
      expect(metadataContent.api.classes).toHaveLength(1);
      expect(metadataContent.usage.installation).toBe('npm install @maersk-global/mds-foundations');
    });

    test('should filter out excluded files', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-foundations',
        version: '1.0.0',
      });

      await generateFoundationsMetadata(packageDir);

      // Should only process 2 files (exclude foundations.css, .min.css files)
      expect(writeFileSync).toHaveBeenCalledTimes(2);

      const filePaths = vi.mocked(writeFileSync).mock.calls.map((call) => call[0] as string);
      expect(filePaths.some((path) => path.includes('_color.metadata.json'))).toBe(true);
      expect(filePaths.some((path) => path.includes('_typography.metadata.json'))).toBe(true);
      expect(filePaths.some((path) => path.includes('foundations.metadata.json'))).toBe(false);
    });

    test('should handle CSS directory not found', async () => {
      vi.mocked(existsSync).mockReturnValue(false);

      await expect(generateFoundationsMetadata(packageDir)).rejects.toThrow('CSS directory not found');
    });

    test('should enhance guidelines when mapping exists', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-foundations',
        version: '1.0.0',
      });

      const mockGuidelines = {
        overview: 'Color guidelines',
        usage: 'How to use colors',
      };

      const mockEnhancedGuidelines = {
        designPrinciples: ['Consistency'],
        relatedGuidelines: ['Accessibility'],
      };

      vi.mocked(fetchUxBestPractices).mockResolvedValue(mockGuidelines);
      vi.mocked(enhanceGuidelines).mockResolvedValue(mockEnhancedGuidelines);

      await generateFoundationsMetadata(packageDir);

      expect(fetchUxBestPractices).toHaveBeenCalledWith('design-language', 'colour-roles');
      expect(enhanceGuidelines).toHaveBeenCalled();

      const writeCall = vi
        .mocked(writeFileSync)
        .mock.calls.find((call) => (call[0] as string).includes('_color.metadata.json'));
      const metadataContent = JSON.parse(writeCall![1] as string);

      expect(metadataContent.guidelines.general).toEqual(mockGuidelines);
      expect(metadataContent.guidelines.designPrinciples).toEqual(['Consistency']);
      expect(metadataContent.guidelines.relatedGuidelines).toEqual(['Accessibility']);
    });

    test('should handle UX docs fetch failures gracefully', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-foundations',
        version: '1.0.0',
      });

      vi.mocked(fetchUxBestPractices).mockResolvedValue(null);

      await generateFoundationsMetadata(packageDir);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No theme-specific guidelines found'));
    });

    test('should handle errors and throw them', async () => {
      vi.mocked(existsSync).mockImplementation(() => {
        throw new Error('File system error');
      });

      await expect(generateFoundationsMetadata(packageDir)).rejects.toThrow('File system error');

      expect(mockConsoleError).toHaveBeenCalledWith('❌ Error generating MDS Foundations metadata:', expect.any(Error));
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle CSS with complex selectors', () => {
      const cssContent = `
        .btn:hover,
        .btn:focus {
          /* @name: Button Hover State */
          background: red;
        }

        @media (max-width: 768px) {
          .responsive {
            /* @name: Responsive Class */
            display: block;
          }
        }
      `;

      const result = extractCSSClasses(cssContent);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Button Hover State');
      expect(result[1].name).toBe('Responsive Class');
    });

    test('should handle malformed comments gracefully', () => {
      const commentContent = `@name
@category: incomplete
@usage`;

      const result = parseClassComment(commentContent, 'test');
      expect(result?.name).toBe('test'); // Falls back to className
      expect(result?.category).toBe('incomplete');
      expect(result?.usage).toBe(null);
    });

    test('should handle empty CSS file', async () => {
      vi.mocked(readFileSync).mockReturnValue('');

      const result = await processCSSFile('/path/to/empty.css');
      expect(result.classes).toHaveLength(0);
      expect(result.summary.totalClasses).toBe(0);
      expect(result.summary.categories).toEqual([]);
      expect(result.description).toBe('No description available');
    });
  });
});
