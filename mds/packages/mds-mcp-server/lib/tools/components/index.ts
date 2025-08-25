/**
 * Documentation Tool for the MCP Server
 */
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import path from 'node:path';
import { promises as fs } from 'fs';
import { Cache, resolveNodeModulesPath, serverResponse } from '../../utils';
import { ComponentName, COMPONENTS, ComponentDocumentationToolInput } from './types';

function resolveComponentKey(input: string): ComponentName | undefined {
  const lowerInput = input.toLowerCase();
  const matches: string[] = [];

  for (const [key, meta] of Object.entries(COMPONENTS)) {
    if (
      key === lowerInput ||
      meta.componentName?.toLowerCase() === lowerInput ||
      (meta.alternativeNames && meta.alternativeNames.map((n) => n.toLowerCase()).includes(lowerInput))
    ) {
      matches.push(key);
    }
  }

  // Prioritize web-component type
  const webComponent = matches.find((key) => COMPONENTS[key].type === 'web-component');
  if (webComponent) return webComponent as ComponentName;

  // Fallback to any match (e.g., css)
  return matches[0] as ComponentName | undefined;
}

function isWebComponentName(key: ComponentName): key is ComponentName {
  return COMPONENTS[key].type === 'web-component';
}

function isCssComponentName(key: ComponentName): key is ComponentName {
  return COMPONENTS[key].type === 'css';
}

// Get components cache instance
const componentsCache = Cache.getInstance('components_documentation');

export const componentDocumentationTool = {
  name: 'get_components_documentation',
  description: 'Gets MDS documentation for using MDS components',
  inputSchema: {
    type: 'object',
    properties: {
      component: {
        type: 'string',
        description: 'Component name when requesting component documentation',
        enum: Object.keys(COMPONENTS),
        example: 'button',
      },
    },
    required: ['component'],
  },
  handler: async (args: ComponentDocumentationToolInput) => {
    try {
      if (!args.component) {
        throw new McpError(ErrorCode.InvalidParams, 'Component name is required for component documentation');
      }

      // Use resolveComponentKey to find the canonical key
      const resolvedKey = resolveComponentKey(args.component);

      if (resolvedKey) {
        return await componentsCache.getOrCompute(`components_${resolvedKey}`, async () => {
          if (isWebComponentName(resolvedKey)) {
            // Return exact JSON from web component metadata
            const componentMetadataPath = path.resolve(
              resolveNodeModulesPath(),
              `mds-components-core-${resolvedKey}`,
              'metadata.json',
            );

            try {
              const componentData = await fs.readFile(componentMetadataPath, 'utf-8');
              const data = JSON.parse(componentData);
              return serverResponse('get_components_documentation', `components-${resolvedKey}`, data);
            } catch (error) {
              throw new McpError(
                ErrorCode.InternalError,
                `Failed to read component metadata: ${error instanceof Error ? error.message : String(error)}`,
              );
            }
          } else if (isCssComponentName(resolvedKey)) {
            // Return exact JSON from foundations metadata for CSS components
            const fileName = `_${(resolvedKey as string).replace(/-basic/g, '')}.metadata.json`;
            const componentMetadataPath = path.resolve(
              resolveNodeModulesPath(),
              'mds-foundations',
              'css',
              `${fileName}`,
            );

            try {
              const componentData = await fs.readFile(componentMetadataPath, 'utf-8');
              const data = JSON.parse(componentData);
              return serverResponse('get_components_documentation', `components-${resolvedKey}`, data);
            } catch (error) {
              throw new McpError(
                ErrorCode.InternalError,
                `Failed to read component metadata: ${error instanceof Error ? error.message : String(error)}`,
              );
            }
          }

          throw new McpError(ErrorCode.InvalidParams, `Unknown component type for: ${args.component}`);
        });
      }

      throw new McpError(ErrorCode.InvalidParams, `Invalid component name: ${args.component}`);
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
};
