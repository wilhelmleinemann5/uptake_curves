/**
 * Documentation Tool for the MCP Server
 */
import path from 'path';
import { promises as fs } from 'fs';
import { Cache, resolveNodeModulesPath, serverResponse } from '../../utils';

const tokensCache = Cache.getInstance('design_tokens_documentation');

export const designTokensDocumentationTool = {
  name: 'get_design_tokens_documentation',
  description:
    'Gets MDS documentation for using design tokens - background colors, text colors, borders, shadows, etc.',
  inputSchema: {
    type: 'object',
    properties: {
      brand: {
        type: 'string',
        description: 'Brand for which design tokens documentation to retrieve',
        enum: ['maersk', 'apmterminals', 'alianca'],
        example: 'maersk',
      },
    },
    required: ['brand'],
  },
  handler: async (args: { brand: string }) => {
    try {
      return await tokensCache.getOrCompute(`design_tokens_${args.brand}`, async () => {
        const designTokensPath = path.resolve(
          resolveNodeModulesPath(),
          'mds-design-tokens',
          args.brand,
          'metadata.json',
        );

        try {
          const designTokensData = await fs.readFile(designTokensPath, 'utf-8');
          const data = JSON.parse(designTokensData);
          return serverResponse('get_design_tokens_documentation', `design_tokens_${args.brand}`, data);
        } catch (error) {
          throw new Error(
            `Failed to read design tokens metadata: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Tool execution failed: ${String(error)}`);
    }
  },
};
