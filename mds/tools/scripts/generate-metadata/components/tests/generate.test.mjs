import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// Mock process.exit to prevent test runner from exiting
const mockExit = vi.spyOn(process, 'exit').mockImplementation((code) => {
  // For testing purposes, just return instead of throwing an error
  return undefined;
});

// Mock console.log and console.error to avoid noise during tests
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

// Mock all the imported modules
vi.mock('../argTypes-extractor.mjs', () => ({
  extractArgTypes: vi.fn(),
}));

vi.mock('../generate-basic-examples.mjs', () => ({
  generateBasicExamples: vi.fn(),
  generateMinimalExamples: vi.fn(),
}));

vi.mock('../generate-advanced-examples.mjs', () => ({
  generateAdvancedExamples: vi.fn(),
}));

vi.mock('../generate-framework-examples.mjs', () => ({
  generateFrameworkExamples: vi.fn(),
}));

vi.mock('../../get-ux-docs.mjs', () => ({
  fetchUxBestPractices: vi.fn(),
  enhanceGuidelines: vi.fn(),
}));

vi.mock('../../utils.mjs', () => ({
  getPackageInfo: vi.fn(),
}));

vi.mock('../ux-general-mapping.mjs', () => ({
  uxGeneralGuidelinesMapping: {
    'mc-button': {
      category: 'Actions',
      purpose: 'Trigger actions and navigation',
      whenToUse: ['To trigger an action', 'For navigation'],
      whenNotToUse: ['For non-interactive content'],
    },
    button: {
      category: 'Actions',
      purpose: 'Trigger actions and navigation',
      whenToUse: ['To trigger an action', 'For navigation'],
      whenNotToUse: ['For non-interactive content'],
    },
  },
}));

describe('generate', () => {
  const testDir = '/tmp/mds-test-generate';
  const testPackageDir = join(testDir, 'mc-button');
  const testSrcDir = join(testPackageDir, 'src');
  const testLibDir = join(testSrcDir, 'lib');

  beforeEach(() => {
    if (!existsSync(testLibDir)) {
      mkdirSync(testLibDir, { recursive: true });
    }
    vi.clearAllMocks();
    // Reset the mock implementations
    mockExit.mockImplementation((code) => {
      return undefined;
    });
    mockConsoleLog.mockImplementation(() => {});
    mockConsoleError.mockImplementation(() => {});
    mockConsoleWarn.mockImplementation(() => {});
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  describe('JSDoc parsing', () => {
    test('should parse component metadata from description text', async () => {
      // Import the module to test the parsing functions
      const { parseJSDocDescription } = await import('../generate.mjs');

      const descriptionContent = `
Category: Actions
Purpose: Trigger actions and navigation
When to use: To trigger an action, For navigation between pages
When not to use: For non-interactive content, As a substitute for links
`;

      const result = parseJSDocDescription(descriptionContent);

      expect(result.category).toBe('Actions');
      expect(result.purpose).toBe('Trigger actions and navigation');
      expect(result.whenToUse).toEqual(['To trigger an action', 'For navigation between pages']);
      expect(result.whenNotToUse).toEqual(['For non-interactive content', 'As a substitute for links']);
    });

    test('should handle missing description sections gracefully', async () => {
      const { parseJSDocDescription } = await import('../generate.mjs');

      const minimalDescription = `
Category: Navigation
Purpose: Provide tabbed navigation
`;

      const result = parseJSDocDescription(minimalDescription);

      expect(result.category).toBe('Navigation');
      expect(result.purpose).toBe('Provide tabbed navigation');
      expect(result.whenToUse).toBeUndefined();
      expect(result.whenNotToUse).toBeUndefined();
    });

    test('should handle malformed description gracefully', async () => {
      const { parseJSDocDescription } = await import('../generate.mjs');

      const malformedDescription = `
This is not a proper description format
Missing category and purpose
`;

      const result = parseJSDocDescription(malformedDescription);

      expect(result.category).toBeUndefined();
      expect(result.purpose).toBeUndefined();
      expect(result.whenToUse).toBeUndefined();
      expect(result.whenNotToUse).toBeUndefined();
    });
  });

  describe('Description parsing', () => {
    test('should parse category, purpose, whenToUse, and whenNotToUse from description', async () => {
      const { parseJSDocDescription } = await import('../generate.mjs');

      const description = `
Category: Form Controls
Purpose: Allow users to input text data
When to use: For single-line text input, For collecting user information
When not to use: For multi-line text, For selecting from predefined options
`;

      const result = parseJSDocDescription(description);

      expect(result.category).toBe('Form Controls');
      expect(result.purpose).toBe('Allow users to input text data');
      expect(result.whenToUse).toEqual(['For single-line text input', 'For collecting user information']);
      expect(result.whenNotToUse).toEqual(['For multi-line text', 'For selecting from predefined options']);
    });

    test('should handle missing description sections', async () => {
      const { parseJSDocDescription } = await import('../generate.mjs');

      const partialDescription = `
Category: Navigation
Purpose: Provide tabbed navigation
`;

      const result = parseJSDocDescription(partialDescription);

      expect(result.category).toBe('Navigation');
      expect(result.purpose).toBe('Provide tabbed navigation');
      expect(result.whenToUse).toBeUndefined();
      expect(result.whenNotToUse).toBeUndefined();
    });

    test('should handle empty or null description', async () => {
      const { parseJSDocDescription } = await import('../generate.mjs');

      expect(parseJSDocDescription('')).toEqual({});
      expect(parseJSDocDescription(null)).toEqual({});
      expect(parseJSDocDescription(undefined)).toEqual({});
    });
  });

  describe('Utility functions', () => {
    test('should parse default values correctly', async () => {
      const { parseDefaultValue } = await import('../generate.mjs');

      expect(parseDefaultValue("'hello'")).toBe('hello');
      expect(parseDefaultValue("'test-value'")).toBe('test-value');
      expect(parseDefaultValue('hello')).toBe('hello');
      expect(parseDefaultValue(123)).toBe(123);
      expect(parseDefaultValue(true)).toBe(true);
      expect(parseDefaultValue(null)).toBeUndefined();
      expect(parseDefaultValue(undefined)).toBeUndefined();
    });

    test('should get theme support configuration', async () => {
      const { getThemeSupport } = await import('../generate.mjs');

      const themes = getThemeSupport();

      expect(themes).toHaveLength(6);
      expect(themes[0]).toEqual({
        themeName: 'Maersk Light',
        usage: {
          import: "import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';",
        },
      });
      expect(themes[1]).toEqual({
        themeName: 'Maersk Dark',
        usage: {
          import: "import '@maersk-global/mds-design-tokens/maersk/dark/css/design-tokens-px.css';",
        },
      });
    });

    test('should enhance slots with additional metadata', async () => {
      const { enhanceSlots } = await import('../generate.mjs');

      const slots = [
        { name: '', description: 'Default slot' },
        { name: 'header', description: 'Header slot' },
      ];

      const enhanced = enhanceSlots(slots);

      expect(enhanced[0]).toEqual({
        name: '',
        description: 'Default slot',
        isDefault: true,
        isNamed: false,
      });
      expect(enhanced[1]).toEqual({
        name: 'header',
        description: 'Header slot',
        isDefault: false,
        isNamed: true,
      });
    });

    test('should calculate summary data correctly', async () => {
      const { calculateSummaryData } = await import('../generate.mjs');

      const component = {
        members: [
          { kind: 'method', privacy: 'public', name: 'method1' },
          { kind: 'method', privacy: 'private', name: 'method2' },
          { kind: 'field', privacy: 'public', name: 'prop1', reflects: true },
          { kind: 'field', privacy: 'public', name: 'prop2', deprecated: true },
        ],
        slots: [{ name: 'default' }, { name: 'header' }],
        cssParts: [{ name: 'button' }],
      };

      const props = [{ name: 'prop1' }, { name: 'prop2' }];

      const events = [{ name: 'click' }, { name: 'focus' }];

      const summary = calculateSummaryData(component, props, events);

      expect(summary).toEqual({
        publicProperties: 2,
        publicMethods: 1,
        events: 2,
        slots: 2,
        cssParts: 1,
        hasAttributes: false,
        hasReflectedProperties: true,
        hasDeprecatedProperties: true,
        hasSlots: true,
        hasEvents: true,
        hasCssParts: true,
      });
    });
  });

  describe('File operations', () => {
    test('should handle missing custom elements manifest gracefully', async () => {
      // Mock the dependencies
      const { extractArgTypes } = await import('../argTypes-extractor.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      vi.mocked(extractArgTypes).mockResolvedValue({});
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-test',
        version: '1.0.0',
      });

      // Import and test the generate function
      const { generateComponentMetadata } = await import('../generate.mjs');

      // Use a non-existent path to test graceful handling
      const result = await generateComponentMetadata('/non/existent/path', 'mc-test');

      // Should handle missing files gracefully and return undefined
      expect(result).toBeUndefined();
    });

    test('should clean up temporary files', async () => {
      const { cleanupTemporaryFiles } = await import('../generate.mjs');

      // Create a temporary file
      const tempFile = join(testDir, 'temp-args.json');
      writeFileSync(tempFile, '{}');

      expect(existsSync(tempFile)).toBe(true);

      cleanupTemporaryFiles(tempFile);

      expect(existsSync(tempFile)).toBe(false);
    });

    test('should handle cleanup of non-existent files gracefully', async () => {
      const { cleanupTemporaryFiles } = await import('../generate.mjs');

      // Should not throw when trying to clean up non-existent file
      expect(() => cleanupTemporaryFiles('/non/existent/file.json')).not.toThrow();
    });
  });

  describe('UX guidelines integration', () => {
    test('should access UX guidelines from mapping', async () => {
      const { uxGeneralGuidelinesMapping } = await import('../ux-general-mapping.mjs');

      expect(uxGeneralGuidelinesMapping).toBeDefined();
      expect(uxGeneralGuidelinesMapping['mc-button']).toEqual({
        category: 'Actions',
        purpose: 'Trigger actions and navigation',
        whenToUse: ['To trigger an action', 'For navigation'],
        whenNotToUse: ['For non-interactive content'],
      });
    });
  });

  describe('createEnhancedMetadataStructure', () => {
    test('should create comprehensive metadata structure', async () => {
      const { createEnhancedMetadataStructure } = await import('../generate.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      // Mock dependencies
      vi.mocked(fetchUxBestPractices).mockResolvedValue({
        categories: ['Actions'],
        title: 'Button Guidelines',
        description: 'Button usage guidelines',
        rules: { primary: 'Use for primary actions' },
        designPrinciples: [],
        relatedGuidelines: [],
      });
      vi.mocked(enhanceGuidelines).mockResolvedValue({
        designPrinciples: ['Clear action indication'],
        relatedGuidelines: ['Form Guidelines'],
      });
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-button',
        version: '1.0.0',
        packageName: '@maersk-global/mc-button',
        category: 'Actions',
        purpose: 'Trigger user actions',
        whenToUse: ['For primary actions', 'For form submission'],
        whenNotToUse: [],
      });

      const mockComponent = {
        tagName: 'mc-button',
        customElement: 'mc-button',
        description: `Button component for triggering actions

Category: Actions
Purpose: Trigger user actions
When to use: For primary actions, For form submission`,
        members: [
          { kind: 'field', privacy: 'public', name: 'variant', type: { text: 'string' } },
          { kind: 'method', privacy: 'public', name: 'click' },
        ],
        events: [{ name: 'click', description: 'Fired when button is clicked', type: { text: 'MouseEvent' } }],
        slots: [{ name: '', description: 'Default slot for button content' }],
        cssParts: [{ name: 'button', description: 'The button element' }],
      };

      const mockArgsData = {
        variant: {
          type: 'property',
          defaultValue: 'primary',
          description: 'Button variant',
          required: false,
          category: 'Appearance',
        },
      };

      const result = await createEnhancedMetadataStructure(
        mockComponent,
        mockArgsData,
        '<mc-button>Basic</mc-button>',
        '<mc-button></mc-button>',
        { advanced: '<mc-button advanced>Advanced</mc-button>' },
        { react: { language: 'tsx', template: '<Button />' } },
        testPackageDir,
      );

      expect(result).toHaveProperty('overview');
      expect(result).toHaveProperty('usage');
      expect(result).toHaveProperty('api');
      expect(result).toHaveProperty('styling');
      expect(result).toHaveProperty('guidelines');

      expect(result.overview.category).toBe('Actions');
      expect(result.overview.purpose).toBe('Trigger user actions');
      expect(result.overview.whenToUse).toEqual(['For primary actions', 'For form submission']);

      expect(result.usage.examples.basic).toBe('<mc-button>Basic</mc-button>');
      expect(result.usage.examples.minimal).toBe('<mc-button></mc-button>');
      expect(result.usage.examples.advanced).toEqual({ advanced: '<mc-button advanced>Advanced</mc-button>' });

      expect(result.api.props).toHaveLength(1);
      expect(result.api.props[0].name).toBe('variant');
      expect(result.api.events).toHaveLength(1);
      expect(result.api.events[0].name).toBe('click');

      expect(result.guidelines.categories).toEqual(['Actions']);
      expect(result.guidelines.designPrinciples).toEqual(['Clear action indication']);
    });

    test('should handle missing data gracefully', async () => {
      const { createEnhancedMetadataStructure } = await import('../generate.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      // Mock dependencies to return minimal data
      vi.mocked(fetchUxBestPractices).mockResolvedValue({});
      vi.mocked(enhanceGuidelines).mockResolvedValue({});
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-test',
        version: '1.0.0',
        packageName: '@maersk-global/mc-test',
        category: 'Category not set',
        purpose: 'No purpose defined',
        whenToUse: [],
        whenNotToUse: [],
      });

      const minimalComponent = {
        tagName: 'mc-test',
        customElement: 'mc-test',
        description: 'Test component without proper categories',
        members: [],
        events: [],
        slots: [],
        cssParts: [],
      };

      const result = await createEnhancedMetadataStructure(
        minimalComponent,
        null,
        null,
        null,
        {},
        null,
        testPackageDir,
      );

      expect(result.overview.category).toBe('Category not set');
      expect(result.overview.purpose).toBe('No purpose defined');
      expect(result.overview.whenToUse).toEqual([]);
      expect(result.usage.examples).toEqual({});
      expect(result.api.props).toEqual([]);
      expect(result.api.events).toEqual([]);
    });

    test('should handle UX guidelines fetch errors', async () => {
      const { createEnhancedMetadataStructure } = await import('../generate.mjs');
      const { fetchUxBestPractices, enhanceGuidelines } = await import('../../get-ux-docs.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      // Mock dependencies to throw errors
      vi.mocked(fetchUxBestPractices).mockRejectedValue(new Error('Network error'));
      vi.mocked(enhanceGuidelines).mockRejectedValue(new Error('Enhancement error'));
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-test',
        version: '1.0.0',
        packageName: '@maersk-global/mc-test',
        category: 'Category not set',
        purpose: 'No purpose defined',
        whenToUse: [],
        whenNotToUse: [],
      });

      const mockComponent = {
        tagName: 'mc-test',
        customElement: 'mc-test',
        description: 'Test component',
        members: [],
        events: [],
        slots: [],
        cssParts: [],
      };

      const result = await createEnhancedMetadataStructure(mockComponent, null, null, null, {}, null, testPackageDir);

      expect(result.guidelines.title).toBe('test');
      expect(result.guidelines.description).toBe('No guidelines available');
      expect(result.guidelines.categories).toEqual([]);
    });
  });

  describe('combinePropertiesFromSources', () => {
    test('should combine properties from CEM and args.json', async () => {
      const { combinePropertiesFromSources } = await import('../generate.mjs');

      const mockComponent = {
        members: [
          {
            kind: 'field',
            privacy: 'public',
            name: 'variant',
            type: { text: 'string' },
          },
          {
            kind: 'field',
            privacy: 'public',
            name: 'disabled',
            type: { text: 'boolean' },
          },
          {
            kind: 'field',
            privacy: 'private',
            name: 'internalProp',
            type: { text: 'string' },
          },
        ],
      };

      const mockArgsData = {
        variant: {
          defaultValue: 'primary',
          description: 'Button variant style',
          type: { required: true },
          table: { category: 'Appearance' },
          options: ['primary', 'secondary', 'tertiary'],
        },
        disabled: {
          defaultValue: false,
          description: 'Disable the button',
          type: { required: false },
          table: { category: 'State' },
        },
      };

      const result = combinePropertiesFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(2); // Only public properties with argTypes
      expect(result[0]).toEqual({
        name: 'variant',
        type: 'string',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Button variant style',
        required: true,
        category: 'Appearance',
      });
      expect(result[1]).toEqual({
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Disable the button',
        required: false,
        category: 'State',
        options: [],
      });
    });

    test('should handle missing args data', async () => {
      const { combinePropertiesFromSources } = await import('../generate.mjs');

      const mockComponent = {
        members: [
          {
            kind: 'field',
            privacy: 'public',
            name: 'variant',
            type: { text: 'string' },
          },
        ],
      };

      const result = combinePropertiesFromSources(mockComponent, null);

      expect(result).toEqual([]);
    });

    test('should handle missing component members', async () => {
      const { combinePropertiesFromSources } = await import('../generate.mjs');

      const mockComponent = {};
      const mockArgsData = {
        variant: {
          type: 'property',
          defaultValue: 'primary',
          description: 'Button variant',
        },
      };

      const result = combinePropertiesFromSources(mockComponent, mockArgsData);

      expect(result).toEqual([
        {
          category: 'Other',
          defaultValue: 'primary',
          description: 'Button variant',
          name: 'variant',
          options: [],
          required: false,
          type: 'unknown',
        },
      ]);
    });

    test('should filter non-property types from args', async () => {
      const { combinePropertiesFromSources } = await import('../generate.mjs');

      const mockComponent = {
        members: [
          {
            kind: 'field',
            privacy: 'public',
            name: 'variant',
            type: { text: 'string' },
          },
          {
            kind: 'field',
            privacy: 'public',
            name: 'onClick',
            type: { text: 'function' },
          },
        ],
      };

      const mockArgsData = {
        variant: {
          type: 'property',
          defaultValue: 'primary',
          description: 'Button variant',
          category: 'Appearance',
        },
        click: {
          type: 'event', // This should be filtered out
          description: 'Click handler',
        },
      };

      const result = combinePropertiesFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('variant');
    });
  });

  describe('extractEventsFromSources', () => {
    test('should extract events from CEM and args.json', async () => {
      const { extractEventsFromSources } = await import('../generate.mjs');

      const mockComponent = {
        events: [
          {
            name: 'click',
            description: 'Fired when button is clicked',
            type: { text: 'MouseEvent' },
          },
          {
            name: '`custom-event`',
            description: 'Custom event with backticks',
            type: { text: 'CustomEvent' },
          },
        ],
      };

      const mockArgsData = {
        argTypes: {
          focus: {
            type: 'event',
            description: 'Focus event from args',
            eventType: 'FocusEvent',
          },
          blur: {
            type: 'event',
            description: 'Blur event from args',
            eventType: 'FocusEvent',
          },
          variant: {
            type: 'property', // This should be filtered out
            description: 'Not an event',
          },
        },
      };

      const result = extractEventsFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(4);

      // CEM events should be preserved
      const clickEvent = result.find((e) => e.name === 'click');
      expect(clickEvent).toEqual({
        name: 'click',
        description: 'Fired when button is clicked',
        type: 'MouseEvent',
      });

      // Backticks should be cleaned
      const customEvent = result.find((e) => e.name === 'custom-event');
      expect(customEvent).toEqual({
        name: 'custom-event',
        description: 'Custom event with backticks',
        type: 'CustomEvent',
      });

      // Args events should be added
      const focusEvent = result.find((e) => e.name === 'focus');
      expect(focusEvent).toEqual({
        name: 'focus',
        description: 'Focus event from args',
        type: 'FocusEvent',
      });
    });

    test('should prefer CEM descriptions over args descriptions', async () => {
      const { extractEventsFromSources } = await import('../generate.mjs');

      const mockComponent = {
        events: [
          {
            name: 'click',
            description: 'Better CEM description',
            type: { text: 'MouseEvent' },
          },
        ],
      };

      const mockArgsData = {
        argTypes: {
          click: {
            type: 'event',
            description: 'Args description',
            eventType: 'Event',
          },
        },
      };

      const result = extractEventsFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: 'click',
        description: 'Better CEM description',
        type: 'MouseEvent',
      });
    });

    test('should handle missing events gracefully', async () => {
      const { extractEventsFromSources } = await import('../generate.mjs');

      const mockComponent = {};
      const mockArgsData = null;

      const result = extractEventsFromSources(mockComponent, mockArgsData);

      expect(result).toEqual([]);
    });

    test('should handle events with missing descriptions', async () => {
      const { extractEventsFromSources } = await import('../generate.mjs');

      const mockComponent = {
        events: [
          {
            name: 'click',
            // No description
            type: { text: 'MouseEvent' },
          },
        ],
      };

      const mockArgsData = {
        argTypes: {
          focus: {
            type: 'event',
            // No description
            eventType: 'FocusEvent',
          },
        },
      };

      const result = extractEventsFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(2);
      expect(result[0].description).toBe('Description missing');
      expect(result[1].description).toBe('Description missing');
    });

    test('should handle malformed event data', async () => {
      const { extractEventsFromSources } = await import('../generate.mjs');

      const mockComponent = {
        events: [
          {
            name: 'click',
            description: 'Click event',
            // Missing type
          },
        ],
      };

      const mockArgsData = {
        argTypes: {
          focus: {
            type: 'event',
            description: 'Focus event',
            // Missing eventType
          },
        },
      };

      const result = extractEventsFromSources(mockComponent, mockArgsData);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('CustomEvent'); // Default fallback
      expect(result[1].type).toBe('CustomEvent'); // Default fallback
    });
  });

  describe('extractArgTypes integration', () => {
    test('should call extractArgTypes with correct parameters', async () => {
      const { extractArgTypes } = await import('../argTypes-extractor.mjs');
      const { generateBasicExamples, generateMinimalExamples } = await import('../generate-basic-examples.mjs');
      const { generateAdvancedExamples } = await import('../generate-advanced-examples.mjs');
      const { generateFrameworkExamples } = await import('../generate-framework-examples.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      // Reset the mock to capture the actual call
      vi.mocked(extractArgTypes).mockClear();
      vi.mocked(extractArgTypes).mockResolvedValue({
        variant: {
          type: 'property',
          defaultValue: 'primary',
          description: 'Button variant',
        },
      });

      // Mock other functions
      vi.mocked(generateBasicExamples).mockResolvedValue('<mc-test>Basic</mc-test>');
      vi.mocked(generateMinimalExamples).mockResolvedValue('<mc-test></mc-test>');
      vi.mocked(generateAdvancedExamples).mockResolvedValue({});
      vi.mocked(generateFrameworkExamples).mockResolvedValue(null);
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-test',
        version: '1.0.0',
        packageName: '@maersk-global/mc-test',
      });

      // Import the function that calls extractArgTypes
      const { generateComponentMetadata } = await import('../generate.mjs');

      // Create a mock CEM file with correct path structure
      // Function expects packageDir like /path/to/mds/packages/mc-test
      // and creates rootPath by removing last 2 parts: /path/to/mds
      // then builds cemPath as /path/to/mds/dist/packages/mds-components-core-test/custom-elements.json
      const mockPackageDir = join(testDir, 'packages', 'mc-test');
      const cemData = {
        modules: [
          {
            path: 'src/lib/index.ts',
            declarations: [
              {
                kind: 'class',
                tagName: 'mc-test',
                description: 'Test component',
                members: [],
                events: [],
                slots: [],
                cssParts: [],
              },
            ],
          },
        ],
      };

      const cemPath = join(testDir, 'dist', 'packages', 'mds-components-core-test', 'custom-elements.json');
      mkdirSync(dirname(cemPath), { recursive: true });
      writeFileSync(cemPath, JSON.stringify(cemData));

      await generateComponentMetadata(mockPackageDir, 'mc-test');

      expect(vi.mocked(extractArgTypes)).toHaveBeenCalledWith(mockPackageDir, 'mc-test');
    });

    test('should handle extractArgTypes errors gracefully', async () => {
      const { extractArgTypes } = await import('../argTypes-extractor.mjs');
      const { generateBasicExamples, generateMinimalExamples } = await import('../generate-basic-examples.mjs');
      const { generateAdvancedExamples } = await import('../generate-advanced-examples.mjs');
      const { generateFrameworkExamples } = await import('../generate-framework-examples.mjs');
      const { getPackageInfo } = await import('../../utils.mjs');

      // Setup the reject mock with a simpler approach
      vi.mocked(extractArgTypes).mockImplementation(async () => {
        throw new Error('ArgTypes extraction failed');
      });

      // Mock other functions
      vi.mocked(generateBasicExamples).mockResolvedValue('<mc-test>Basic</mc-test>');
      vi.mocked(generateMinimalExamples).mockResolvedValue('<mc-test></mc-test>');
      vi.mocked(generateAdvancedExamples).mockResolvedValue({});
      vi.mocked(generateFrameworkExamples).mockResolvedValue(null);
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mc-test',
        version: '1.0.0',
        packageName: '@maersk-global/mc-test',
      });

      const { generateComponentMetadata } = await import('../generate.mjs');

      // Create a mock CEM file with correct path structure
      const mockPackageDir = join(testDir, 'packages', 'mc-test');
      const cemData = {
        modules: [
          {
            path: 'src/lib/index.ts',
            declarations: [
              {
                kind: 'class',
                tagName: 'mc-test',
                description: 'Test component',
                members: [],
                events: [],
                slots: [],
                cssParts: [],
              },
            ],
          },
        ],
      };

      const cemPath = join(testDir, 'dist', 'packages', 'mds-components-core-test', 'custom-elements.json');
      mkdirSync(dirname(cemPath), { recursive: true });
      writeFileSync(cemPath, JSON.stringify(cemData));

      // The function should handle errors internally and not throw
      let result;
      let threwError = false;
      try {
        result = await generateComponentMetadata(mockPackageDir, 'mc-test');
      } catch (error) {
        threwError = true;
      }

      // Should not throw - errors should be handled internally
      expect(threwError).toBe(false);

      // The function should return undefined when an error occurs
      expect(result).toBeUndefined();

      // Should log the error
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error enhancing manifest for mc-test:'),
        expect.any(Error),
      );
    });
  });
});
