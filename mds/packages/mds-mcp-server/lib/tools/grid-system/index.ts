/**
 * Documentation Tool for the MCP Server
 */
import path from 'path';
import { promises as fs } from 'fs';
import { Cache, resolveNodeModulesPath, serverResponse } from '../../utils';

const gridCache = Cache.getInstance('styles_documentation');

export const gridDocumentationTool = {
  name: 'get_css_grid_documentation',
  description:
    'Gets MDS CSS grid documentation for using grid system in UI projects. Provides css classes for columns, rows, spanning cells, gaps, etc.',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        description: 'Type of grid css documentation to retrieve',
        enum: ['container-grid', 'gap', 'flex-box', 'viewport-grid'],
        example: 'container-grid',
      },
    },
    required: ['type'],
  },
  handler: async (args: { type: string }) => {
    try {
      return await gridCache.getOrCompute(`css_grid_${args.type}`, async () => {
        const cssPath = path.resolve(resolveNodeModulesPath(), 'mds-foundations', 'css', `_${args.type}.metadata.json`);
        try {
          const cssData = await fs.readFile(cssPath, 'utf-8');
          const data = JSON.parse(cssData);
          return serverResponse('get_css_grid_documentation', `css_grid_${args.type}`, data);
        } catch (error) {
          throw new Error(
            `Failed to read css foundations metadata: ${error instanceof Error ? error.message : String(error)}`,
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
