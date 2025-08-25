import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import cypressSplit from 'cypress-split';
import { defineConfig } from 'cypress';

export const commonCypressConfig = {
  fileServerFolder: '.',
  fixturesFolder: './cypress/fixtures',
  video: false,
  videosFolder: './cypress/snapshots/videos',
  screenshotsFolder: './cypress/snapshots/screenshots',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './cypress/snapshots/reports/e2e.xml',
    toConsole: true,
    attachments: true,
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  projectId: 'q6xttx',
  includeShadowDom: true,
  experimentalWebKitSupport: true,
};

export default defineConfig({
  ...commonCypressConfig,
  component: {
    supportFile: 'cypress/support/component.ts',
    setupNodeEvents: async (on, config) => {
      cypressSplit(on, config);
      return config;
    },
    devServer: {
      bundler: 'vite',
    },
    env: {
      TZ: 'UTC',
    },
    indexHtmlFile: 'cypress/support/component-index.html',
    specPattern: './packages/**/*.component-spec.ts',
    excludeSpecPattern: './packages/components-core',
  },
  e2e: {
    ...nxE2EPreset(__filename, { cypressDir: 'cypress', bundler: 'vite' }),
    specPattern: './packages/**/*.cy.ts',
    excludeSpecPattern: './packages/components-core',
    baseUrl: 'http://localhost:4400',
  },
});
