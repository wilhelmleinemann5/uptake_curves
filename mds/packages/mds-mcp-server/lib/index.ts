import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { tools, setupTools } from './tools/index';
import { config } from './utils/config';

const toolCapabilities: Record<string, any> = {};
Array.from(tools.entries()).forEach(([name, tool]) => {
  toolCapabilities[name] = {
    inputSchema: (tool as any).inputSchema,
  };
});

// Set up MCP Server with extended timeout
const server = new Server(
  {
    name: 'MDS MCP Server',
    version: config.version,
    timeout: 480000, // timeout for requests
  },
  {
    capabilities: {
      resources: {},
      tools: toolCapabilities,
    },
  },
);

// Set up tools including documentation tool
setupTools(server);

// Set up stdio transport
const transport = new StdioServerTransport();

// Start the server
server
  .connect(transport)
  .then(() => {
    // Using the correct JSON-RPC format
    process.stdout.write(
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'server/status',
        params: {
          status: 'running',
        },
      }) + '\n',
    );
  })
  .catch(console.error);

// Handle cleanup
process.on('SIGINT', async () => {
  await server.close();
  process.exit(0);
});
