import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateAdvancedExamples } from '../generate-advanced-examples.mjs';

describe('generate-advanced-examples', () => {
  const testDir = '/tmp/mds-test-advanced-examples';
  const testPackageDir = join(testDir, 'test-package');
  const testStoriesDir = join(testPackageDir, 'stories');
  const testExamplesDir = join(testStoriesDir, 'examples');

  beforeAll(() => {
    console.error = vi.fn(); // Suppress all console.error output
    console.log = vi.fn(); // Suppress all console.log output
    console.warn = vi.fn(); // Suppress all console.warn output
  });

  beforeEach(() => {
    // Create test directory structure if it doesn't exist
    if (!existsSync(testExamplesDir)) {
      mkdirSync(testExamplesDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('Basic functionality', () => {
    test('should return empty object when examples directory does not exist', async () => {
      const nonExistentPackageDir = join(testDir, 'non-existent-package');
      const result = await generateAdvancedExamples(nonExistentPackageDir, 'mc-test');

      expect(result).toEqual({});
    });

    test('should return empty object when examples directory is empty', async () => {
      const result = await generateAdvancedExamples(testPackageDir, 'mc-test');

      expect(result).toEqual({});
    });

    test('should extract examples from valid example folders', async () => {
      // Create a valid example folder structure
      const exampleFolder = join(testExamplesDir, 'primary-button');
      mkdirSync(exampleFolder, { recursive: true });

      // Create default.stories.ts file
      const storiesContent = `
import type { StoryObj } from '@storybook/web-components';

export const PrimaryButton: StoryObj = {
  render: () => html\`<mc-button appearance="primary">Click me</mc-button>\`,
};
`;
      writeFileSync(join(exampleFolder, 'default.stories.ts'), storiesContent);

      // Create code-preview.ts file
      const codePreviewContent = `
export const preview = [
  {
    tab: 'HTML',
    template: \`<mc-button appearance="primary">Click me</mc-button>\`,
    language: 'html'
  }
];
`;
      writeFileSync(join(exampleFolder, 'code-preview.ts'), codePreviewContent);

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('PrimaryButton');
      expect(result.PrimaryButton).toBe('<mc-button appearance="primary">Click me</mc-button>');
    });

    test('should handle multiple example folders', async () => {
      // Create first example
      const folder1 = join(testExamplesDir, 'primary-button');
      mkdirSync(folder1, { recursive: true });

      const stories1 = `export const PrimaryExample: StoryObj = {};`;
      writeFileSync(join(folder1, 'default.stories.ts'), stories1);

      const preview1 = `export const preview = [{ template: \`<mc-button>Primary</mc-button>\` }];`;
      writeFileSync(join(folder1, 'code-preview.ts'), preview1);

      // Create second example
      const folder2 = join(testExamplesDir, 'secondary-button');
      mkdirSync(folder2, { recursive: true });

      const stories2 = `export const SecondaryExample: StoryObj = {};`;
      writeFileSync(join(folder2, 'default.stories.ts'), stories2);

      const preview2 = `export const preview = [{ template: \`<mc-button appearance="secondary">Secondary</mc-button>\` }];`;
      writeFileSync(join(folder2, 'code-preview.ts'), preview2);

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('PrimaryExample');
      expect(result).toHaveProperty('SecondaryExample');
      expect(result.PrimaryExample).toBe('<mc-button>Primary</mc-button>');
      expect(result.SecondaryExample).toBe('<mc-button appearance="secondary">Secondary</mc-button>');
    });
  });

  describe('File parsing', () => {
    test('should handle nested example folders', async () => {
      // Create nested folder structure
      const nestedFolder = join(testExamplesDir, 'category', 'subcategory', 'nested-example');
      mkdirSync(nestedFolder, { recursive: true });

      const storiesContent = `export const NestedExample: StoryObj = {};`;
      writeFileSync(join(nestedFolder, 'default.stories.ts'), storiesContent);

      const codePreviewContent = `export const preview = [{ template: \`<mc-button>Nested</mc-button>\` }];`;
      writeFileSync(join(nestedFolder, 'code-preview.ts'), codePreviewContent);

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('NestedExample');
      expect(result.NestedExample).toBe('<mc-button>Nested</mc-button>');
    });

    test('should skip folders missing required files', async () => {
      // Create folder with only stories file
      const incompleteFolder1 = join(testExamplesDir, 'incomplete1');
      mkdirSync(incompleteFolder1, { recursive: true });
      writeFileSync(join(incompleteFolder1, 'default.stories.ts'), 'export const Test: StoryObj = {};');

      // Create folder with only code-preview file
      const incompleteFolder2 = join(testExamplesDir, 'incomplete2');
      mkdirSync(incompleteFolder2, { recursive: true });
      writeFileSync(join(incompleteFolder2, 'code-preview.ts'), 'export const preview = [];');

      // Create complete folder
      const completeFolder = join(testExamplesDir, 'complete');
      mkdirSync(completeFolder, { recursive: true });
      writeFileSync(join(completeFolder, 'default.stories.ts'), 'export const Complete: StoryObj = {};');
      writeFileSync(
        join(completeFolder, 'code-preview.ts'),
        'export const preview = [{ template: `<mc-button>Complete</mc-button>` }];',
      );

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).not.toHaveProperty('Test');
      expect(result).not.toHaveProperty('incomplete1');
      expect(result).not.toHaveProperty('incomplete2');
      expect(result).toHaveProperty('Complete');
    });

    test('should handle malformed stories files gracefully', async () => {
      const exampleFolder = join(testExamplesDir, 'malformed');
      mkdirSync(exampleFolder, { recursive: true });

      // Create malformed stories file
      writeFileSync(join(exampleFolder, 'default.stories.ts'), 'invalid javascript content {{{');
      writeFileSync(
        join(exampleFolder, 'code-preview.ts'),
        'export const preview = [{ template: `<mc-button>Test</mc-button>` }];',
      );

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toEqual({});
    });

    test('should handle malformed code-preview files gracefully', async () => {
      const exampleFolder = join(testExamplesDir, 'malformed-preview');
      mkdirSync(exampleFolder, { recursive: true });

      writeFileSync(join(exampleFolder, 'default.stories.ts'), 'export const TestExample: StoryObj = {};');
      // Create malformed code-preview file
      writeFileSync(join(exampleFolder, 'code-preview.ts'), 'invalid javascript content {{{');

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toEqual({});
    });
  });

  describe('Template extraction', () => {
    test('should extract multiline templates correctly', async () => {
      const exampleFolder = join(testExamplesDir, 'multiline');
      mkdirSync(exampleFolder, { recursive: true });

      writeFileSync(join(exampleFolder, 'default.stories.ts'), 'export const MultilineExample: StoryObj = {};');

      const multilineTemplate = `<mc-button
  appearance="primary"
  size="large"
>
  Click me
</mc-button>`;

      const codePreviewContent = `
export const preview = [
  {
    tab: 'HTML',
    template: \`${multilineTemplate}\`,
    language: 'html'
  }
];`;
      writeFileSync(join(exampleFolder, 'code-preview.ts'), codePreviewContent);

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('MultilineExample');
      expect(result.MultilineExample).toBe(multilineTemplate);
    });

    test('should handle templates with special characters', async () => {
      const exampleFolder = join(testExamplesDir, 'special-chars');
      mkdirSync(exampleFolder, { recursive: true });

      writeFileSync(join(exampleFolder, 'default.stories.ts'), 'export const SpecialCharsExample: StoryObj = {};');

      const specialTemplate = '<mc-input placeholder="Enter your name & email..."></mc-input>';
      const codePreviewContent = `export const preview = [{ template: \`${specialTemplate}\` }];`;
      writeFileSync(join(exampleFolder, 'code-preview.ts'), codePreviewContent);

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('SpecialCharsExample');
      expect(result.SpecialCharsExample).toBe(specialTemplate);
    });
  });

  describe('Error handling', () => {
    test('should handle permission errors gracefully', async () => {
      // This test might not work on all systems, but it tests the error handling path
      const result = await generateAdvancedExamples('/invalid/path/that/does/not/exist', 'mc-test');

      expect(result).toEqual({});
    });

    test('should continue processing other examples when one fails', async () => {
      // Create a valid example
      const validFolder = join(testExamplesDir, 'valid');
      mkdirSync(validFolder, { recursive: true });
      writeFileSync(join(validFolder, 'default.stories.ts'), 'export const ValidExample: StoryObj = {};');
      writeFileSync(
        join(validFolder, 'code-preview.ts'),
        'export const preview = [{ template: `<mc-button>Valid</mc-button>` }];',
      );

      // Create an invalid example (missing export const pattern)
      const invalidFolder = join(testExamplesDir, 'invalid');
      mkdirSync(invalidFolder, { recursive: true });
      writeFileSync(join(invalidFolder, 'default.stories.ts'), 'const InvalidExample = {};'); // Missing export
      writeFileSync(
        join(invalidFolder, 'code-preview.ts'),
        'export const preview = [{ template: `<mc-button>Invalid</mc-button>` }];',
      );

      const result = await generateAdvancedExamples(testPackageDir, 'mc-button');

      expect(result).toHaveProperty('ValidExample');
      expect(result).not.toHaveProperty('InvalidExample');
      expect(result.ValidExample).toBe('<mc-button>Valid</mc-button>');
    });
  });
});
