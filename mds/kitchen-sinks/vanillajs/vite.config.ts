/// <reference types='vitest' />
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: './.vite/kitchen-sinks/vanillajs',

  server: {
    port: 4500,
    host: 'localhost',
  },

  preview: {
    port: 4500,
    host: 'localhost',
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
  },

  plugins: [
    copy({
      targets: [
        {
          src: '../../node_modules/@maersk-global/icons/js/**/*',
          dest: '../../dist/kitchen-sinks/vanillajs/assets/node_modules',
        },
      ],
      flatten: false,
      hook: 'writeBundle',
      copySync: true,
    }),
  ],

  build: {
    outDir: '../../dist/kitchen-sinks/vanillajs',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
