import { config } from './config';
import { env } from 'node:process';
import path from 'path';

export const serverResponse = (tool: string, cache_key: string, data: object) => {
  return {
    meta: {
      tool,
      version: config.version,
      timestamp: new Date().toISOString(),
      cache_key,
    },
    ...data,
  };
};

export const resolveNodeModulesPath = (): string => {
  let nodeModulesPath = path.resolve(process.cwd(), 'node_modules', '@maersk-global');
  if ((env as unknown as any).MCP_CONNECTION && (env as unknown as any).MCP_CONNECTION === 'dev') {
    nodeModulesPath = path.resolve(process.cwd(), 'dist', 'packages');
  }
  return nodeModulesPath;
};
