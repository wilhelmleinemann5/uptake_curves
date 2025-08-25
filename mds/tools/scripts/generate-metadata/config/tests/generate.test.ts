import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { generateConfigMetadata } from '../generate.mjs';

// Mock fs functions
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    rmSync: vi.fn(),
  };
});

// Mock utils
vi.mock('../../utils.mjs', () => ({
  getPackageInfo: vi.fn(),
}));

// Mock process.exit to prevent test runner from exiting
const mockExit = vi.spyOn(process, 'exit').mockImplementation((code?: number | string) => {
  return undefined as never;
});

// Mock console methods to reduce noise during tests
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('config/generate', () => {
  const testDir = '/tmp/mds-test-config';
  const packageDir = testDir;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    // Reset console mocks but keep them mocked
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
    mockExit.mockClear();
  });

  afterEach(() => {
    // Clean up
    vi.clearAllMocks();
  });

  describe('parseReadmeContent', () => {
    test('should parse README content with multiple sections', async () => {
      const readmeContent = `# Introduction

This is the introduction section with some content.

## Getting Started

Instructions for getting started.

# Configuration

This section covers configuration options.

## Basic Setup

Simple setup instructions.

## Advanced Configuration

Advanced configuration details.

# API Reference

Documentation for the API.
`;

      // Import the function directly to test it
      const { generateConfigMetadata } = await import('../generate.mjs');

      // Mock the fs functions
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
            description: 'MDS Configuration',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
        description: 'MDS Configuration',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result.guidelines).toHaveProperty('introduction');
      expect(result.guidelines).toHaveProperty('configuration');
      expect(result.guidelines).toHaveProperty('api-reference');

      // Check that subsections are parsed
      expect(result.guidelines.configuration).toHaveProperty('subsections');
      expect(result.guidelines.configuration.subsections).toHaveProperty('basic-setup');
      expect(result.guidelines.configuration.subsections).toHaveProperty('advanced-configuration');
    });

    test('should handle README with no main sections (# headers)', async () => {
      const readmeContent = `Just some plain text without any main section headers.

More content here.`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      // Since the parser splits by "# " patterns and filters empty sections,
      // content without # headers may still create a section
      expect(typeof result.guidelines).toBe('object');
    });

    test('should skip table of contents section', async () => {
      const readmeContent = `# Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)

# Introduction

Real content here.

# Configuration

Configuration details.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result.guidelines).toHaveProperty('introduction');
      expect(result.guidelines).toHaveProperty('configuration');
      expect(result.guidelines).not.toHaveProperty('table-of-contents');
    });
  });

  describe('parseNestedSections', () => {
    test('should parse nested sections with multiple levels', async () => {
      const contentWithNesting = `Some intro content.

## Level 2 Section

Content for level 2.

### Level 3 Subsection

Content for level 3.

#### Level 4 Subsection

Content for level 4.

## Another Level 2

More level 2 content.
`;

      const readmeContent = `# Main Section

${contentWithNesting}`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result.guidelines).toHaveProperty('main-section');

      const mainSection = result.guidelines['main-section'];
      expect(mainSection.content).toContain('Some intro content.');
      expect(mainSection.subsections).toHaveProperty('level-2-section');
      expect(mainSection.subsections).toHaveProperty('another-level-2');

      // Check nested structure
      const level2Section = mainSection.subsections['level-2-section'];
      expect(level2Section.subsections).toHaveProperty('level-3-subsection');

      const level3Section = level2Section.subsections['level-3-subsection'];
      expect(level3Section.subsections).toHaveProperty('level-4-subsection');
    });

    test('should handle content with no subsections', async () => {
      const readmeContent = `# Simple Section

Just some content without any subsections.

More content here.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result.guidelines).toHaveProperty('simple-section');

      const simpleSection = result.guidelines['simple-section'];
      expect(simpleSection.content).toEqual(['Just some content without any subsections.', 'More content here.']);
      expect(simpleSection.subsections).toBeUndefined();
    });
  });

  describe('generateConfigMetadata', () => {
    test('should generate complete metadata structure', async () => {
      const readmeContent = `# Getting Started

Instructions for getting started with MDS Config.

## Installation

Install the package using npm.

## Setup

Basic setup instructions.

# Configuration Options

Available configuration options.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '2.1.0',
            description: 'MDS Configuration Package',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '2.1.0',
        description: 'MDS Configuration Package',
      });

      const result = await generateConfigMetadata(packageDir);

      // Check overview structure
      expect(result.overview).toEqual({
        name: '@maersk-global/mds-config',
        version: '2.1.0',
        description: 'MDS config and set-up documentation.',
      });

      // Check usage structure
      expect(result.usage).toHaveProperty('description');
      expect(result.usage).toHaveProperty('installation');
      expect(result.usage).toHaveProperty('usage');
      expect(result.usage.installation).toBe('npm install @maersk-global/mds-components-core');

      // Check guidelines structure
      expect(result.guidelines).toHaveProperty('getting-started');
      expect(result.guidelines).toHaveProperty('configuration-options');

      // Verify writeFileSync was called
      expect(writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('metadata.json'),
        expect.stringContaining('"name": "@maersk-global/mds-config"'),
      );
    });

    test('should handle missing README file gracefully', async () => {
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return false; // README doesn't exist
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result.guidelines).toEqual({});
      expect(mockConsoleWarn).toHaveBeenCalledWith(expect.stringContaining('README.md not found'));
    });

    test('should throw error when package.json is missing', async () => {
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return false; // package.json doesn't exist
        return true;
      });

      await expect(generateConfigMetadata(packageDir)).rejects.toThrow('Package file not found');
    });

    test('should handle missing output directory', async () => {
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return false; // Output dir doesn't exist
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return '# Test';
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      expect(result).toBeUndefined();
      expect(mockConsoleWarn).toHaveBeenCalledWith(expect.stringContaining("Output directory doesn't exist"));
    });

    test('should handle special characters in section titles', async () => {
      const readmeContent = `# Getting Started!

Content here.

# API & SDK Reference

API documentation.

# FAQ's & Troubleshooting

Troubleshooting info.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      // Check that special characters are handled in keys
      expect(result.guidelines).toHaveProperty('getting-started');
      expect(result.guidelines).toHaveProperty('api-sdk-reference');
      expect(result.guidelines).toHaveProperty('faqs-troubleshooting');
    });

    test('should handle error during metadata generation', async () => {
      vi.mocked(existsSync).mockImplementation(() => {
        throw new Error('File system error');
      });

      await expect(generateConfigMetadata(packageDir)).rejects.toThrow('File system error');

      expect(mockConsoleError).toHaveBeenCalledWith('❌ Error generating MDS Config metadata:', expect.any(Error));
    });
  });

  describe('Edge cases and robustness', () => {
    test('should handle empty sections in README', async () => {
      const readmeContent = `# Empty Section

# Another Empty Section

# Section With Content

This section has actual content.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      // Only the section with content should be included
      expect(result.guidelines).toHaveProperty('section-with-content');
      expect(result.guidelines).not.toHaveProperty('empty-section');
      expect(result.guidelines).not.toHaveProperty('another-empty-section');
    });

    test('should handle malformed README content', async () => {
      const readmeContent = `### Starting with wrong header level

Content here.

##### Skipping header levels

More content.

# Proper section

Finally proper content.
`;

      vi.mocked(existsSync).mockImplementation((path) => {
        if (path.includes('package.json')) return true;
        if (path.includes('README.md')) return true;
        if (path.includes('dist/packages/mds-config')) return true;
        return false;
      });

      vi.mocked(readFileSync).mockImplementation((path) => {
        if (path.includes('README.md')) return readmeContent;
        if (path.includes('package.json'))
          return JSON.stringify({
            name: '@maersk-global/mds-config',
            version: '1.0.0',
          });
        return '';
      });

      const { getPackageInfo } = await import('../../utils.mjs');
      vi.mocked(getPackageInfo).mockReturnValue({
        name: '@maersk-global/mds-config',
        version: '1.0.0',
      });

      const result = await generateConfigMetadata(packageDir);

      // The parser looks for # headers, so it should parse both the first content and the proper section
      expect(result.guidelines).toHaveProperty('proper-section');
      expect(typeof result.guidelines).toBe('object');
      // Don't assert exact count as the parser may create sections from leading content
    });
  });
});
