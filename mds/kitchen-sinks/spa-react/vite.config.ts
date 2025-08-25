/// <reference types='vitest' />
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  cacheDir: './.vite/kitchen-sinks/spa-react',

  server: {
    port: 4300,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    copy({
      targets: [
        {
          src: '../../node_modules/@maersk-global/icons/js/**/*',
          dest: '../../dist/kitchen-sinks/spa-react/assets/node_modules',
        },
      ],
      flatten: false,
      hook: 'writeBundle',
      copySync: true,
    }),
  ],

  build: {
    outDir: '../../dist/kitchen-sinks/spa-react',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/kitchen-sinks/spa-react',
      provider: 'v8',
    },
  },
});
