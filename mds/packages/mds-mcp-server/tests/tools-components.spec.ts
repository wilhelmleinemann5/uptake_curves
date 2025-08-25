import { describe, it, expect, vi } from 'vitest';
import { componentDocumentationTool } from '../lib/tools/components/index';
import { COMPONENTS } from '../lib/tools/components/types';

// Mock fs and path for handler
import * as fs from 'fs';
import * as utils from '../lib/utils';

// Mocked metadata response
const mockMetadata = { foo: 'bar', name: 'test-component' };

vi.spyOn(fs.promises, 'readFile').mockImplementation(async () => JSON.stringify(mockMetadata));
vi.spyOn(utils, 'resolveNodeModulesPath').mockImplementation(() => '/mock/node_modules');
vi.spyOn(utils, 'serverResponse').mockImplementation((tool, cache_key, data) => ({
  meta: {
    tool,
    version: 'test',
    timestamp: '2020-01-01T00:00:00.000Z',
    cache_key,
  },
  ...data,
}));

const testCases = [
  ['button', 'button'], // COMPONENTS key
  [COMPONENTS['button'].componentName, 'button'], // componentName
  [COMPONENTS['button'].alternativeNames?.[0] || '', 'button'], // alternativeName
  ['mc-table', 'table'], // componentName for table
  ['data-table', 'table'], // alternativeName for table
  ['breadcrumb-bar', 'breadcrumb'], // alternativeName for breadcrumb
  ['mds-breadcrumb', 'breadcrumb'], // componentName for breadcrumb
  ['breadcrumb', 'breadcrumb'], // key for breadcrumb
];

describe('componentDocumentationTool handler', () => {
  testCases.forEach(([input, expectedKey]) => {
    it(`resolves '${input}' to '${expectedKey}' and returns correct JSON`, async () => {
      const result = await componentDocumentationTool.handler({ component: input });
      expect(result).toEqual({
        meta: {
          tool: 'get_components_documentation',
          version: 'test',
          timestamp: '2020-01-01T00:00:00.000Z',
          cache_key: `components-${expectedKey}`,
        },
        ...mockMetadata,
      });
    });
  });

  it('throws error for invalid component', async () => {
    await expect(componentDocumentationTool.handler({ component: 'not-a-component' })).rejects.toThrow(
      /Invalid component name/,
    );
  });
});
