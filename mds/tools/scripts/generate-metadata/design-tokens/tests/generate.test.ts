import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import {
  categorizeToken,
  getCategoryDescription,
  convertTokenValueToCssVar,
  generateDesignTokensMetadata,
} from '../generate.mjs';

// Mock fs functions
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    promises: {
      readdir: vi.fn(),
      stat: vi.fn(),
      access: vi.fn(),
      readFile: vi.fn(),
      writeFile: vi.fn(),
    },
  };
});

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
    'mds-design-tokens': {
      designPrinciples: ['Consistency', 'Flexibility'],
      relatedGuidelines: ['Colors', 'Typography'],
    },
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

describe('design-tokens/generate', () => {
  const testDir = '/tmp/mds-test-design-tokens';
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

  describe('categorizeToken', () => {
    test('should categorize typography tokens correctly', () => {
      const typographyTokens = [
        { name: 'typography.font.size.large', category: 'dimension' },
        { name: 'font.family.primary', category: 'string' },
        { name: 'text.line.height', category: 'dimension' },
        { name: 'headline.weight.bold', category: 'number' },
      ];

      typographyTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Typography');
      });
    });

    test('should categorize color tokens correctly', () => {
      const colorTokens = [
        { name: 'color.primary.500', category: 'color' },
        { name: 'brand.appearance.neutral.default', category: 'color' },
        { name: 'opacity.disabled', category: 'number' },
        { name: 'semantic.color.error', category: 'color' },
      ];

      colorTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Colors');
      });
    });

    test('should categorize border tokens correctly', () => {
      const borderTokens = [
        { name: 'border.width.thin', category: 'dimension' },
        { name: 'radius.small', category: 'dimension' },
        { name: 'border.style.solid', category: 'string' },
      ];

      borderTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Borders');
      });
    });

    test('should categorize layout tokens correctly', () => {
      const layoutTokens = [
        { name: 'breakpoint.mobile', category: 'dimension' },
        { name: 'grid.column.count', category: 'number' },
        { name: 'gap.small', category: 'dimension' },
        { name: 'margin.large', category: 'dimension' },
        { name: 'padding.medium', category: 'dimension' },
      ];

      layoutTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Layout');
      });
    });

    test('should categorize motion tokens correctly', () => {
      const motionTokens = [
        { name: 'transition.fast', category: 'time' },
        { name: 'duration.short', category: 'time' },
        { name: 'timing.ease.in', category: 'string' },
      ];

      motionTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Motion');
      });
    });

    test('should categorize shadow tokens correctly', () => {
      const shadowTokens = [
        { name: 'shadow.small', category: 'shadow' },
        { name: 'elevation.shadow.medium', category: 'shadow' },
      ];

      shadowTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Effects');
      });
    });

    test('should categorize brand tokens correctly', () => {
      const brandTokens = [
        { name: 'brand_primary_logo', category: 'string' },
        { name: 'brand_secondary_value', category: 'string' }, // Changed from color to avoid color category check
      ];

      brandTokens.forEach((token) => {
        // Brand tokens with appearance or typography should go to their respective categories
        if (token.name.includes('appearance') || token.name.includes('typography')) {
          expect(categorizeToken(token)).not.toBe('Brand');
        } else {
          expect(categorizeToken(token)).toBe('Brand');
        }
      });
    });

    test('should default to Other category for unrecognized tokens', () => {
      const otherTokens = [
        { name: 'unknown.token.name', category: 'string' },
        { name: 'misc.value', category: 'number' },
      ];

      otherTokens.forEach((token) => {
        expect(categorizeToken(token)).toBe('Other');
      });
    });
  });

  describe('getCategoryDescription', () => {
    test('should return correct descriptions for all categories', () => {
      const expectedDescriptions = {
        Typography: 'Font families, sizes, weights, and text styling tokens',
        Colors: 'Color palette, theme colors, and appearance tokens',
        Borders: 'Border width, style, and radius tokens',
        Layout: 'Breakpoints, grid, and layout-related tokens',
        Motion: 'Animation duration, timing, and transition tokens',
        Effects: 'Shadow, blur, and visual effect tokens',
        Brand: 'Brand-specific design tokens',
        Other: 'Miscellaneous design tokens',
      };

      Object.entries(expectedDescriptions).forEach(([category, expectedDescription]) => {
        expect(getCategoryDescription(category)).toBe(expectedDescription);
      });
    });

    test('should return default description for unknown category', () => {
      expect(getCategoryDescription('UnknownCategory')).toBe('Design tokens');
    });
  });

  describe('convertTokenValueToCssVar', () => {
    test('should convert token references to CSS variables', () => {
      const testCases = [
        {
          input: '$brand.appearance.neutral.default.text-color',
          expected: 'var(--mds_brand_appearance_neutral_default_text-color)',
        },
        {
          input: '$color.primary.500',
          expected: 'var(--mds_color_primary_500)',
        },
        {
          input: '$typography.font.size.large',
          expected: 'var(--mds_typography_font_size_large)',
        },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTokenValueToCssVar(input)).toBe(expected);
      });
    });

    test('should return original value for non-token references', () => {
      const testCases = ['#FF0000', '16px', 'Arial', '1.5', 'solid', 123, true];

      testCases.forEach((input) => {
        expect(convertTokenValueToCssVar(input)).toBe(input);
      });
    });

    test('should handle edge cases', () => {
      expect(convertTokenValueToCssVar('')).toBe('');
      expect(convertTokenValueToCssVar(null)).toBe(null);
      expect(convertTokenValueToCssVar(undefined)).toBe(undefined);
      expect(convertTokenValueToCssVar('not-a-token')).toBe('not-a-token');
    });
  });

  describe('generateDesignTokensMetadata', () => {
    const mockTokensData = [
      {
        name: 'color-primary-500',
        cssPropertyName: 'mds_color_primary_500',
        description: 'Primary color',
        value: '#1976d2',
        category: 'color',
      },
      {
        name: 'typography-font-size-large',
        cssPropertyName: 'mds_typography_font_size_large',
        description: 'Large font size',
        value: 18,
        category: 'dimension',
      },
      {
        name: 'border-radius-small',
        cssPropertyName: 'mds_border_radius_small',
        description: 'Small border radius',
        value: '4px',
        category: 'dimension',
      },
    ];

    beforeEach(() => {
      // Mock file system operations
      vi.mocked(fs.readdir).mockImplementation(async (path) => {
        if (path.includes('mds-design-tokens')) {
          return ['maersk', 'hamburgsud', 'metadata.json', 'implementation'];
        }
        if (path.includes('maersk')) {
          return ['light', 'dark'];
        }
        return [];
      });

      vi.mocked(fs.stat).mockImplementation(async (path) => ({
        isDirectory: () => !path.includes('metadata.json') && !path.includes('implementation'),
      }));

      vi.mocked(fs.access).mockImplementation(async () => {
        // Simulate successful access to JSON directory
      });

      vi.mocked(fs.readFile).mockImplementation(async (path) => {
        if (path.includes('design-tokens-array.json')) {
          return JSON.stringify(mockTokensData);
        }
        return '{}';
      });

      vi.mocked(fs.writeFile).mockImplementation(async () => {
        // Mock successful write
      });
    });

    test('should generate complete metadata structure', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
        description: 'MDS Design Tokens',
      });

      vi.mocked(fetchUxBestPractices).mockResolvedValue({
        overview: 'Design tokens guidelines',
        usage: 'How to use design tokens',
      });

      vi.mocked(enhanceGuidelines).mockResolvedValue({
        designPrinciples: ['Consistency', 'Flexibility'],
        relatedGuidelines: ['Colors', 'Typography'],
      });

      await generateDesignTokensMetadata(packageDir);

      // Verify metadata file was written
      expect(fs.writeFile).toHaveBeenCalled();

      // Check that the metadata structure is correct
      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);

      expect(metadataContent).toHaveProperty('overview');
      expect(metadataContent).toHaveProperty('usage');
      expect(metadataContent).toHaveProperty('guidelines');
      expect(metadataContent.usage).toHaveProperty('themes');
      expect(metadataContent.usage.themes).toHaveLength(2); // light and dark themes
    });

    test('should organize tokens by categories correctly', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      vi.mocked(fetchUxBestPractices).mockResolvedValue({});
      vi.mocked(enhanceGuidelines).mockResolvedValue({});

      await generateDesignTokensMetadata(packageDir);

      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);
      const theme = metadataContent.usage.themes[0];

      // Should have organized tokens into different categories
      expect(theme.categories).toHaveProperty('Colors');
      expect(theme.categories).toHaveProperty('Typography');
      expect(theme.categories).toHaveProperty('Borders');

      // Check Colors category
      expect(theme.categories.Colors.tokens).toHaveLength(1);
      expect(theme.categories.Colors.tokens[0].name).toBe('mds_color_primary_500');

      // Check Typography category
      expect(theme.categories.Typography.tokens).toHaveLength(1);
      expect(theme.categories.Typography.tokens[0].value).toBe('18px');

      // Check Borders category
      expect(theme.categories.Borders.tokens).toHaveLength(1);
      expect(theme.categories.Borders.tokens[0].value).toBe('4px');
    });

    test('should handle missing JSON directory gracefully', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('Directory not found'));

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      await generateDesignTokensMetadata(packageDir);

      expect(mockConsoleWarn).toHaveBeenCalledWith(expect.stringContaining('Could not process theme'));
    });

    test('should handle malformed JSON gracefully', async () => {
      vi.mocked(fs.readFile).mockImplementation(async (path) => {
        if (path.includes('design-tokens-array.json')) {
          return 'invalid json {';
        }
        return '{}';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      await generateDesignTokensMetadata(packageDir);

      expect(mockConsoleWarn).toHaveBeenCalledWith(expect.stringContaining('Could not process theme'));
    });

    test('should skip non-directory files and excluded directories', async () => {
      vi.mocked(fs.readdir).mockResolvedValue([
        'maersk',
        'metadata.json', // Should be skipped
        'flutter', // Should be skipped
        'implementation', // Should be skipped
        'apmterminalsexperimental', // Should be skipped
      ]);

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      await generateDesignTokensMetadata(packageDir);

      // Should only process 'maersk' brand
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Processing brand: maersk'));
      expect(mockConsoleLog).not.toHaveBeenCalledWith(expect.stringContaining('Processing brand: metadata.json'));
    });

    test('should generate correct import statements for themes', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      vi.mocked(fetchUxBestPractices).mockResolvedValue({});
      vi.mocked(enhanceGuidelines).mockResolvedValue({});

      await generateDesignTokensMetadata(packageDir);

      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);
      const theme = metadataContent.usage.themes[0];

      expect(theme.usage.import).toHaveProperty('html');
      expect(theme.usage.import).toHaveProperty('css');
      expect(theme.usage.import).toHaveProperty('javascript');
      expect(theme.usage.import).toHaveProperty('sass');

      expect(theme.usage.import.html).toContain('link rel="stylesheet"');
      expect(theme.usage.import.css).toContain('@import url');
      expect(theme.usage.import.javascript).toContain('import');
      expect(theme.usage.import.sass).toContain('@import url');
    });

    test('should handle file system errors gracefully', async () => {
      vi.mocked(fs.readdir).mockRejectedValue(new Error('File system error'));

      // The function catches errors and calls process.exit(1), so it doesn't reject
      await generateDesignTokensMetadata(packageDir);

      expect(mockConsoleError).toHaveBeenCalledWith('❌ Error generating design tokens metadata:', expect.any(Error));
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    test('should enhance guidelines with UX best practices', async () => {
      const { getPackageInfo } = await import('../../utils.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');

      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      const mockGuidelines = {
        overview: 'Design tokens overview',
        usage: 'How to use tokens',
      };

      const mockEnhancedGuidelines = {
        designPrinciples: ['Consistency', 'Flexibility'],
        relatedGuidelines: ['Colors', 'Typography'],
      };

      vi.mocked(fetchUxBestPractices).mockResolvedValue(mockGuidelines);
      vi.mocked(enhanceGuidelines).mockResolvedValue(mockEnhancedGuidelines);

      await generateDesignTokensMetadata(packageDir);

      expect(fetchUxBestPractices).toHaveBeenCalledWith('design-language', 'themes');
      expect(enhanceGuidelines).toHaveBeenCalled();

      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);

      expect(metadataContent.guidelines.general).toEqual(mockGuidelines);
      expect(metadataContent.guidelines.designPrinciples).toEqual(mockEnhancedGuidelines.designPrinciples);
      expect(metadataContent.guidelines.relatedGuidelines).toEqual(mockEnhancedGuidelines.relatedGuidelines);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty tokens array', async () => {
      vi.mocked(fs.readdir).mockResolvedValue(['maersk']);
      vi.mocked(fs.stat).mockResolvedValue({ isDirectory: () => true } as any);
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('[]'); // Empty tokens array

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      await generateDesignTokensMetadata(packageDir);

      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);
      const theme = metadataContent.usage.themes[0];

      expect(theme.summary.totalTokens).toBe(0);
      expect(theme.summary.totalCategories).toBe(0);
    });

    test('should handle tokens with numeric values correctly', async () => {
      const numericTokens = [
        {
          name: 'gap-large', // Changed from 'spacing-large' to 'gap-large' to match Layout category
          cssPropertyName: 'mds_gap_large',
          description: 'Large gap',
          value: 24,
          category: 'dimension',
        },
      ];

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(numericTokens));

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-design-tokens',
        version: '1.0.0',
      });

      await generateDesignTokensMetadata(packageDir);

      const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
      const metadataContent = JSON.parse(writeCall[1] as string);
      const theme = metadataContent.usage.themes[0];
      const layoutCategory = theme.categories.Layout;

      expect(layoutCategory.tokens[0].value).toBe('24px');
    });
  });
});
