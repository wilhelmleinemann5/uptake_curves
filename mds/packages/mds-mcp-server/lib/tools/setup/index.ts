/**
 * Documentation Tool for the MCP Server
 */
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { Cache, serverResponse } from '../../utils';

// Get setup cache instance
const setupCache = Cache.getInstance('setup');

/**
 * Documentation tool definition
 */
export const setupDocumentationTool = {
  name: 'get_setup_documentation',
  description:
    'Gets MDS documentation on how to setup MDS in projects. It can return the README or mds-config for setting up icons path.',
  inputSchema: {
    type: 'object',
  },
  handler: async () => {
    try {
      return await setupCache.getOrCompute('setup', async () => {
        const response: Record<string, any> = {
          timestamp: new Date().toISOString(),
        };
        // const data = JSON.parse(setupData);
        const data = {
          overview: {
            name: '@maersk-global/mds-config',
            version: '2.131.1',
            description: `Setup needed in order to use MDS basic styles for HTML tags, CSS resets, typography, useful css classes to be used for getting text, border and background colours. 
It includes also CSS classes that allow you to use MDS grid and MDS layout in your project. 
You need to add MDS design tokens CSS file as well, to get theming and brands in project.`,
            installation: 'npm install @maersk-global/mds-components-core',
            usage: `import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = process.env.NODE_ENV === 'development' ? '/node_modules/' : '/assets/node_modules/';`,
          },
        };
        return serverResponse('get_setup_documentation', `setup`, data);
      });
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
};
