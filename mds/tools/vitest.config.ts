/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/tests/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/add-new-component/kitchen-sinks/**/*', '**/add-new-component/mc-component/**/*'],
    reporters: ['default'],
    coverage: {
      exclude: [
        '**/ux-general-mapping.mjs',
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.config.*',
        '**/*.test.*',
        '**/*.spec.*',
        '**/add-new-component/kitchen-sinks/**/*',
        '**/add-new-component/mc-component/**/*',
      ],
    },
  },
});
