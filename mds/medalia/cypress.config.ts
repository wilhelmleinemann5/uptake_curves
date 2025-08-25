import { defineConfig } from 'cypress';
import { configureVisualRegression } from 'cypress-visual-regression';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureVisualRegression(on);
    },
  },
  viewportWidth: 1000,
  viewportHeight: 1000,
  projectId: 'q6xttx',
});
