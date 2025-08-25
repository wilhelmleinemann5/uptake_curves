/**
 * Documentation Tool for the MCP Server
 */
import path from 'path';
import { promises as fs } from 'fs';
import { Cache, resolveNodeModulesPath, serverResponse } from '../../utils';

const layoutCache = Cache.getInstance('layout_patterns_documentation');

export const layoutPatternsDocumentationTool = {
  name: 'get_layout_patterns_documentation',
  description: 'Gets MDS page layout patterns documentation for building accessible page layouts',
  inputSchema: {
    type: 'object',
  },
  handler: async () => {
    try {
      return await layoutCache.getOrCompute(`layout_documentation`, async () => {
        const cssPath = path.resolve(resolveNodeModulesPath(), 'mds-foundations', 'css', `_layout.metadata.json`);
        try {
          const cssData = await fs.readFile(cssPath, 'utf-8');
          const data = JSON.parse(cssData);
          return serverResponse('get_layout_patterns_documentation', `layout_patterns_documentation`, data);
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
