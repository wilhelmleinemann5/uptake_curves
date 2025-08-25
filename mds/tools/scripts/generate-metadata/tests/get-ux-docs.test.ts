import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Mock file system operations
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  readdirSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  rmSync: vi.fn(),
}));

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('get-ux-docs', () => {
  let mockConsoleLog: any;
  let mockConsoleWarn: any;
  let mockConsoleError: any;

  beforeEach(() => {
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('fetchUxBestPractices', () => {
    test('should fetch and parse cached UX best practices', async () => {
      const { fetchUxBestPractices, parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const mockData = {
        data: `---
title: Test Guidelines
description: Test description
tags:
  - accessibility
  - usability
---

## Best Practices

- Always use semantic HTML
- Ensure proper contrast ratios
- Test with keyboard navigation`
      };

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockData));

      const result = await fetchUxBestPractices('guidelines', 'test-component');

      expect(existsSync).toHaveBeenCalledWith(
        expect.stringContaining('guidelines-test-component.json')
      );
      expect(readFileSync).toHaveBeenCalledWith(
        expect.stringContaining('guidelines-test-component.json'),
        'utf-8'
      );
      expect(result).toEqual({
        categories: ['accessibility', 'usability'],
        title: 'Test Guidelines',
        description: 'Test description',
        rules: {
          'general': [
            'Always use semantic HTML',
            'Ensure proper contrast ratios',
            'Test with keyboard navigation'
          ]
        }
      });
      expect(mockConsoleLog).toHaveBeenCalledWith('Using cached data for guidelines-test-component');
    });

    test('should handle missing cache file', async () => {
      const { fetchUxBestPractices } = await import('../get-ux-docs.mjs');
      
      vi.mocked(existsSync).mockReturnValue(false);

      const result = await fetchUxBestPractices('guidelines', 'missing-component');

      expect(result).toBeUndefined();
      expect(existsSync).toHaveBeenCalledWith(
        expect.stringContaining('guidelines-missing-component.json')
      );
    });

    test('should handle missing data in cache file', async () => {
      const { fetchUxBestPractices } = await import('../get-ux-docs.mjs');
      
      const mockData = { otherField: 'value' }; // No 'data' field

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockData));

      const result = await fetchUxBestPractices('guidelines', 'no-data-component');

      expect(result).toEqual({});
      expect(mockConsoleWarn).toHaveBeenCalledWith('No data found in cache for guidelines-no-data-component');
    });

    test('should handle file read errors', async () => {
      const { fetchUxBestPractices } = await import('../get-ux-docs.mjs');
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File read error');
      });

      const result = await fetchUxBestPractices('guidelines', 'error-component');

      expect(result).toEqual({});
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to fetch component UX best practices for guidelines-error-component')
      );
    });

    test('should handle JSON parse errors', async () => {
      const { fetchUxBestPractices } = await import('../get-ux-docs.mjs');
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue('invalid json');

      const result = await fetchUxBestPractices('guidelines', 'invalid-json-component');

      expect(result).toEqual({});
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to fetch component UX best practices for guidelines-invalid-json-component')
      );
    });
  });

  describe('parseGuidelinesFromContent', () => {
    test('should parse complete MDX content with front matter and sections', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const content = `---
title: Button Guidelines
description: >
  Comprehensive guidelines for using buttons in the design system
tags:
  - interaction
  - forms
  - navigation
---

## When to Use

- Use for primary actions in forms
- Use for navigation between pages
- Use for triggering dialogs

## When Not to Use

- Don't use for destructive actions without confirmation
- Don't use multiple primary buttons in the same view

## Accessibility Guidelines

1. Always include proper ARIA labels
2. Ensure keyboard navigation works
3. Maintain proper focus indicators`;

      const result = parseGuidelinesFromContent(content);

      expect(result).toEqual({
        categories: ['interaction', 'forms', 'navigation'],
        title: 'Button Guidelines',
        description: 'Comprehensive guidelines for using buttons in the design system',
        rules: {
          'when-to-use': [
            'Use for primary actions in forms',
            'Use for navigation between pages',
            'Use for triggering dialogs'
          ],
          'when-not-to-use': [
            "Don't use for destructive actions without confirmation",
            "Don't use multiple primary buttons in the same view"
          ]
        }
      });
    });

    test('should handle content without front matter', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const content = `## Best Practices

- Keep button text concise
- Use consistent styling
- Test with assistive technology`;

      const result = parseGuidelinesFromContent(content);

      expect(result).toEqual({
        categories: [],
        title: '',
        description: '',
        rules: {
          'general': [
            'Keep button text concise',
            'Use consistent styling',
            'Test with assistive technology'
          ]
        }
      });
    });

    test('should handle content with paragraphs instead of lists', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const content = `## Overview

This is a paragraph about the component.

This is another paragraph with more details.

## Usage

Buttons should be used sparingly and with purpose.

Always consider the user's context when placing buttons.`;

      const result = parseGuidelinesFromContent(content);

      expect(result).toEqual({
        categories: [],
        title: '',
        description: '',
        rules: {
          'overview': [
            'This is a paragraph about the component.',
            'This is another paragraph with more details.'
          ]
        }
      });
    });

    test('should fallback to general list items when no sections found', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const content = `- First general guideline
- Second general guideline
- Third general guideline`;

      const result = parseGuidelinesFromContent(content);

      expect(result).toEqual({
        categories: [],
        title: '',
        description: '',
        rules: {
          'general': [
            'First general guideline',
            'Second general guideline',
            'Third general guideline'
          ]
        }
      });
    });

    test('should handle malformed front matter gracefully', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      const content = `---
title: Test
malformed yaml content
---

## Section

- Content here`;

      const result = parseGuidelinesFromContent(content);

      expect(result.categories).toEqual([]);
      expect(result.title).toBe('Test');
      expect(result.rules).toEqual({
        'general': ['Content here']
      });
    });

    test('should handle empty or null content', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      expect(parseGuidelinesFromContent('')).toEqual({
        categories: [],
        title: '',
        description: '',
        rules: {}
      });

      expect(parseGuidelinesFromContent(null as any)).toEqual({
        categories: [],
        title: '',
        description: '',
        rules: []
      });
    });

    test('should handle parsing errors gracefully', async () => {
      const { parseGuidelinesFromContent } = await import('../get-ux-docs.mjs');
      
      // Mock a parsing error by providing content that will cause regex issues
      const problematicContent = `---
title: Test
description: 
tags:
  - test
---

## Section with special chars /()&

- Normal content
- More content`;

      const result = parseGuidelinesFromContent(problematicContent);

      // Should still parse successfully but handle special characters in section names
      expect(result.title).toBe('Test');
      expect(result.rules).toEqual({
        'general': [
          'Normal content',
          'More content'
        ]
      });
    });
  });

  describe('extractListItems', () => {
    test('should extract bullet point items', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `- First item
- Second item with **bold** text
- Third item with *italic* text
- Fourth item with \`code\` text
- Fifth item with [link](http://example.com)`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'First item',
        'Second item with bold text',
        'Third item with italic text',
        'Fourth item with code text',
        'Fifth item with link'
      ]);
    });

    test('should extract numbered list items', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `1. First numbered item
2. Second numbered item
3. Third numbered item`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'First numbered item',
        'Second numbered item',
        'Third numbered item'
      ]);
    });

    test('should extract mixed list types', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `- Bullet item
1. Numbered item
+ Plus bullet item
* Asterisk bullet item
2. Another numbered item`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'Bullet item',
        'Plus bullet item',
        'Asterisk bullet item',
        'Numbered item',
        'Another numbered item'
      ]);
    });

    test('should handle nested/indented list items', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `- Top level item
  - Nested item
    - Deep nested item
- Another top level item`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'Top level item',
        'Nested item',
        'Deep nested item',
        'Another top level item'
      ]);
    });

    test('should filter out code imports and HTML', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `- Valid item
- import React from 'react'
- <div>HTML content</div>
- # Heading item
- Another valid item`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'Valid item',
        'Another valid item'
      ]);
    });

    test('should handle empty content', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      expect(extractListItems('')).toEqual([]);
      expect(extractListItems('No list items here')).toEqual([]);
    });

    test('should clean up complex markdown formatting', async () => {
      const { extractListItems } = await import('../get-ux-docs.mjs');
      
      const content = `- Item with **bold** and *italic* and \`code\`
- Item with [complex link](https://example.com/path?param=value) text
- Item with **nested *formatting* inside**`;

      const result = extractListItems(content);

      expect(result).toEqual([
        'Item with bold and italic and code',
        'Item with complex link text',
        'Item with nested formatting inside'
      ]);
    });
  });

  describe('enhanceGuidelines', () => {
    test('should enhance guidelines with design principles and related guidelines', async () => {
      // Instead of trying to mock within the same module, let's test the actual behavior
      // by mocking the file system calls that fetchUxBestPractices depends on
      
      const mockCache1 = {
        data: `---
title: Accessibility Guidelines
description: Guidelines for accessibility
---

## Rules

- Use semantic HTML
- Provide alt text`
      };

      const mockCache2 = {
        data: `---
title: Color Guidelines
description: Guidelines for color usage
---

## Guidelines

- Maintain contrast ratios
- Use consistent palette`
      };

      vi.mocked(existsSync)
        .mockReturnValueOnce(true) // First call for accessibility
        .mockReturnValueOnce(true); // Second call for color

      vi.mocked(readFileSync)
        .mockReturnValueOnce(JSON.stringify(mockCache1))
        .mockReturnValueOnce(JSON.stringify(mockCache2));

      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');

      const guidelineConfig = [
        {
          docType: 'guidelines',
          docName: 'accessibility',
          docCategory: 'designPrinciples',
          relevance: 'high',
          applicableSections: ['forms', 'navigation']
        },
        {
          docType: 'guidelines',
          docName: 'color',
          docCategory: 'relatedGuidelines',
          relevance: 'medium',
          applicableSections: ['theming']
        }
      ];

      const result = await enhanceGuidelines(guidelineConfig);

      expect(result.designPrinciples).toHaveLength(1);
      expect(result.relatedGuidelines).toHaveLength(1);
      
      expect(result.designPrinciples[0]).toEqual({
        relevance: 'high',
        applicableSections: ['forms', 'navigation'],
        categories: [],
        title: 'Accessibility Guidelines',
        description: 'Guidelines for accessibility',
        rules: {
          'general': ['Use semantic HTML', 'Provide alt text']
        }
      });

      expect(result.relatedGuidelines[0]).toEqual({
        relevance: 'medium',
        applicableSections: ['theming'],
        categories: [],
        title: 'Color Guidelines',
        description: 'Guidelines for color usage',
        rules: {
          'general': ['Maintain contrast ratios', 'Use consistent palette']
        }
      });

      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Added guidelines accessibility to designPrinciples');
      expect(mockConsoleLog).toHaveBeenCalledWith('✅ Added guidelines color to relatedGuidelines');
    });

    test('should handle missing data gracefully', async () => {
      vi.mocked(existsSync).mockReturnValue(false);

      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');

      const guidelineConfig = [
        {
          docType: 'guidelines',
          docName: 'missing',
          docCategory: 'designPrinciples'
        }
      ];

      const result = await enhanceGuidelines(guidelineConfig);

      expect(result).toEqual({
        designPrinciples: [],
        relatedGuidelines: []
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith('⚠️  Could not find cached data for guidelines missing');
    });

    test('should handle unknown docCategory', async () => {
      const mockCache = {
        data: `---
title: Test Guidelines
---

## Rules

- Test rule`
      };

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockCache));

      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');

      const guidelineConfig = [
        {
          docType: 'guidelines',
          docName: 'test',
          docCategory: 'unknownCategory'
        }
      ];

      const result = await enhanceGuidelines(guidelineConfig);

      expect(result).toEqual({
        designPrinciples: [],
        relatedGuidelines: []
      });

      expect(mockConsoleWarn).toHaveBeenCalledWith('⚠️  Unknown docCategory unknownCategory for guidelines test');
    });

    test('should handle fetch errors', async () => {
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File read error');
      });

      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');

      const guidelineConfig = [
        {
          docType: 'guidelines',
          docName: 'error',
          docCategory: 'designPrinciples'
        }
      ];

      const result = await enhanceGuidelines(guidelineConfig);

      // When fetchUxBestPractices encounters an error, it returns {},
      // which is truthy, so it gets processed and added to the array
      expect(result.designPrinciples).toHaveLength(1);
      expect(result.designPrinciples[0]).toEqual({
        relevance: 'medium',
        applicableSections: []
      });
      expect(result.relatedGuidelines).toEqual([]);

      // The error should be logged by fetchUxBestPractices, not enhanceGuidelines
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to fetch component UX best practices for guidelines-error')
      );
    });

    test('should provide default values for missing properties', async () => {
      const mockCache = {
        data: `---
title: Test Guidelines
---

## Rules

- Test rule`
      };

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockCache));

      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');

      const guidelineConfig = [
        {
          docType: 'guidelines',
          docName: 'minimal',
          docCategory: 'designPrinciples'
          // No relevance or applicableSections provided
        }
      ];

      const result = await enhanceGuidelines(guidelineConfig);

      expect(result.designPrinciples[0]).toMatchObject({
        relevance: 'medium',
        applicableSections: [],
        title: 'Test Guidelines'
      });
    });

    test('should handle empty guideline config', async () => {
      const { enhanceGuidelines } = await import('../get-ux-docs.mjs');
      
      const result = await enhanceGuidelines([]);

      expect(result).toEqual({
        designPrinciples: [],
        relatedGuidelines: []
      });
    });
  });
});
