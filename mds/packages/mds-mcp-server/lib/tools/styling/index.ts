/**
 * Documentation Tool for the MCP Server
 */
import path from 'path';
import { promises as fs } from 'fs';
import { Cache, resolveNodeModulesPath, serverResponse } from '../../utils';

const cssStylesCache = Cache.getInstance('css_styles_documentation');

export const cssStylesDocumentationTool = {
  name: 'get_css_styles_documentation',
  description:
    'Gets MDS CSS styles documentation for using approved css styles in UI projects. Provides css classes for colors, borders, shadows, fonts, etc.',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        description: 'Type of css styles documentation to retrieve',
        enum: ['color', 'typography', 'content'],
        example: 'color',
      },
    },
    required: ['type'],
  },
  handler: async (args: { type: string }) => {
    try {
      return await cssStylesCache.getOrCompute(`css_styles_${args.type}`, async () => {
        const cssPath = path.resolve(resolveNodeModulesPath(), 'mds-foundations', 'css', `_${args.type}.metadata.json`);
        try {
          const cssData = await fs.readFile(cssPath, 'utf-8');
          const data = JSON.parse(cssData);
          return serverResponse('get_css_styles_documentation', `css_styles_${args.type}`, data);
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
