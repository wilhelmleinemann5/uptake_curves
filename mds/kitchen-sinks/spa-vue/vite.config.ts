/// <reference types='vitest' />
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: __dirname,
  cacheDir: './.vite/kitchen-sinks/spa-vue',

  server: {
    port: 4400,
    host: 'localhost',
  },

  preview: {
    port: 4400,
    host: 'localhost',
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^mc-/.test(tag),
        },
      },
    }),
    copy({
      targets: [
        {
          src: '../../node_modules/@maersk-global/icons/js/**/*',
          dest: '../../dist/kitchen-sinks/spa-vue/assets/node_modules',
        },
      ],
      flatten: false,
      hook: 'writeBundle',
      copySync: true,
    }),
  ],

  build: {
    outDir: '../../dist/kitchen-sinks/spa-vue',
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
      reportsDirectory: '../../coverage/kitchen-sinks/spa-vue',
      provider: 'v8',
    },
  },
});
