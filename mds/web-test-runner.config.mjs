import { litSsrPlugin } from '@lit-labs/testing/web-test-runner-ssr-plugin.js';
import { importMapsPlugin } from '@web/dev-server-import-maps';

const config = {
  rootDir: '.',
  nodeResolve: true,
  preserveSymlinks: true,
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: '60000',
    },
  },
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '@maersk-global/mds-components-utils': '/dist/packages/mds-components-utils/index.js',
            '@maersk-global/mds-components-utils/': '/dist/packages/mds-components-utils/',
          },
        },
      },
    }),
    litSsrPlugin(),
  ],
};

export default config;
