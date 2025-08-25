import { ListToolsRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { designTokensDocumentationTool } from './design-tokens/index';
import { layoutPatternsDocumentationTool } from './layout-patterns/index';
import { gridDocumentationTool } from './grid-system/index';
import { cssStylesDocumentationTool } from './styling/index';
import { componentDocumentationTool } from './components/index';
import { setupDocumentationTool } from './setup/index';
import { installComponentTool } from './install/index';
import { z } from 'zod';

/**
 * Collection of available tools
 */
export const tools = new Map();

// Register documentation tool
tools.set(designTokensDocumentationTool.name, designTokensDocumentationTool);

tools.set(layoutPatternsDocumentationTool.name, layoutPatternsDocumentationTool);

tools.set(gridDocumentationTool.name, gridDocumentationTool);

tools.set(cssStylesDocumentationTool.name, cssStylesDocumentationTool);

tools.set(componentDocumentationTool.name, componentDocumentationTool);

tools.set(setupDocumentationTool.name, setupDocumentationTool);

tools.set(installComponentTool.name, installComponentTool);

/**
 * Set up the tools for the MCP server
 * @param server - The MCP server instance
 */
export function setupTools(server: Server): void {
  // Create tool.call schema
  const ToolCallRequestSchema = z.object({
    method: z.literal('tools/call'),
    params: z.object({
      name: z.string(),
      arguments: z.object({}).passthrough(),
    }),
  });

  // Handle tool listing
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: Array.from(tools.entries()).map(([name, tool]) => ({
        name,
        description: (tool as any).description,
        inputSchema: (tool as any).inputSchema,
      })),
    };
  });

  // Handle tool execution
  server.setRequestHandler(ToolCallRequestSchema, async (request) => {
    const tool = tools.get(request.params.name);

    if (!tool) {
      throw new McpError(ErrorCode.MethodNotFound, `Tool '${request.params.name}' not found`);
    }

    try {
      const result = await (tool as any).handler(request.params.arguments);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      throw new McpError(ErrorCode.InternalError, error.message);
    }
  });
}
