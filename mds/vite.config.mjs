import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';
import { NodePackageImporter } from 'sass-embedded';

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: 'node_modules/@maersk-global/icons/js/**/*',
          dest: './.storybook/public/',
        },
        {
          src: 'dist/packages/mds-design-tokens/**/*',
          dest: './.storybook/public/',
        },
        {
          src: 'node_modules/@maersk-global/icons/js/**/*',
          dest: 'dist/storybook/mds/assets/',
        },
        {
          src: 'dist/packages/mds-design-tokens/**/*',
          dest: 'dist/storybook/mds/assets/',
        },
      ],
      flatten: false,
      hook: 'buildStart',
      copySync: true,
    }),
  ],
  resolve: {
    alias: {
      '@maersk-global/mds-components-utils/lib/host/host.styles.js': resolve(
        __dirname,
        './packages/mds-components-utils/lib/host/host.styles.ts',
      ),
      '@maersk-global/mds-components-utils/host/host.styles.js': resolve(
        __dirname,
        './packages/mds-components-utils/lib/host/host.styles.ts',
      ),
      '@maersk-global/mds-components-utils': resolve(__dirname, './packages/mds-components-utils'),
      '@maersk-global/mds-components-core/mc-tab': resolve(
        __dirname,
        './dist/packages/mds-components-core-tab/index.js',
      ),
      '@maersk-global/mds-components-core/mc-list': resolve(
        __dirname,
        './dist/packages/mds-components-core-list/index.js',
      ),
      '@maersk-global/mds-components-core/mc-list-item': resolve(
        __dirname,
        './dist/packages/mds-components-core-list-item/index.js',
      ),
      '@maersk-global/mds-components-core/mc-button': resolve(
        __dirname,
        './dist/packages/mds-components-core-button/index.js',
      ),
      '@maersk-global/mds-components-core/mc-tab-bar': resolve(
        __dirname,
        './dist/packages/mds-components-core-tab-bar/index.js',
      ),
      '@maersk-global/mds-components-core/mc-menu': resolve(
        __dirname,
        './dist/packages/mds-components-core-menu/index.js',
      ),
      '@maersk-global/mds-components-core/mc-tooltip': resolve(
        __dirname,
        './dist/packages/mds-components-core-tooltip/index.js',
      ),
      '@maersk-global/mds-config': resolve(__dirname, './packages/mds-config/lib/index.ts'),
      '@maersk-global/mds-design-tokens': resolve(__dirname, './dist/packages/mds-design-tokens'),
      '@maersk-global/mds-dev-utils': resolve(__dirname, './packages/mds-dev-utils'),
      '@maersk-global/mds-foundations': resolve(__dirname, './packages/mds-foundations'),
      '@maersk-global/mds-shared-types': resolve(__dirname, './packages/mds-shared-types/index.d.ts'),
      '@maersk-global/mds-components-core-button/stories/argTypes': resolve(
        __dirname,
        './packages/mc-button/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-input/stories/argTypes': resolve(
        __dirname,
        './packages/mc-input/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-input-date/stories/argTypes': resolve(
        __dirname,
        './packages/mc-input-date/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-calendar/stories/argTypes': resolve(
        __dirname,
        './packages/mc-calendar/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-list/stories/argTypes': resolve(
        __dirname,
        './packages/mc-list/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-multi-choice-fieldset/stories/argTypes': resolve(
        __dirname,
        './packages/mc-multi-choice-fieldset/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-popover/stories/argTypes': resolve(
        __dirname,
        './packages/mc-popover/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-select/stories/argTypes': resolve(
        __dirname,
        './packages/mc-select/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-text-and-icon/stories/argTypes': resolve(
        __dirname,
        './packages/mc-text-and-icon/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-time-picker/stories/argTypes': resolve(
        __dirname,
        './packages/mc-time-picker/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-loading-indicator/stories/argTypes': resolve(
        __dirname,
        './packages/mc-loading-indicator/stories/argTypes.ts',
      ),
      '@maersk-global/mds-components-core-button/src/lib/styles/mc-button.mixins.scss': resolve(
        __dirname,
        './dist/packages/mds-components-core-button/src/lib/styles/mc-button.mixins.scss',
      ),
      '@maersk-global/mds-components-core-avatar': resolve(__dirname, './packages/mc-avatar/src/index.ts'),
      '@maersk-global/mds-components-core-button-group-item': resolve(
        __dirname,
        './packages/mc-button-group-item/src/index.ts',
      ),
      '@maersk-global/mds-components-core-button-group': resolve(__dirname, './packages/mc-button-group/src/index.ts'),
      '@maersk-global/mds-components-core-button': resolve(__dirname, './packages/mc-button/src/index.ts'),
      '@maersk-global/mds-components-core-calendar': resolve(__dirname, './packages/mc-calendar/src/index.ts'),
      '@maersk-global/mds-components-core-card': resolve(__dirname, './packages/mc-card/src/index.ts'),
      '@maersk-global/mds-components-core-checkbox-group': resolve(
        __dirname,
        './packages/mc-checkbox-group/src/index.ts',
      ),
      '@maersk-global/mds-components-core-checkbox': resolve(__dirname, './packages/mc-checkbox/src/index.ts'),
      '@maersk-global/mds-components-core-date-range': resolve(__dirname, './packages/mc-date-range/src/index.ts'),
      '@maersk-global/mds-components-core-error': resolve(__dirname, './packages/mc-error/src/index.ts'),
      '@maersk-global/mds-components-core-file-upload': resolve(__dirname, './packages/mc-file-upload/src/index.ts'),
      '@maersk-global/mds-components-core-hint': resolve(__dirname, './packages/mc-hint/src/index.ts'),
      '@maersk-global/mds-components-core-icon': resolve(__dirname, './packages/mc-icon/src/index.ts'),
      '@maersk-global/mds-components-core-input-date': resolve(__dirname, './packages/mc-input-date/src/index.ts'),
      '@maersk-global/mds-components-core-input-time': resolve(__dirname, './packages/mc-input-time/src/index.ts'),
      '@maersk-global/mds-components-core-input': resolve(__dirname, './packages/mc-input/src/index.ts'),
      '@maersk-global/mds-components-core-label': resolve(__dirname, './packages/mc-label/src/index.ts'),
      '@maersk-global/mds-components-core-list-item': resolve(__dirname, './packages/mc-list-item/src/index.ts'),
      '@maersk-global/mds-components-core-list': resolve(__dirname, './packages/mc-list/src/index.ts'),
      '@maersk-global/mds-components-core-loading-indicator': resolve(
        __dirname,
        './packages/mc-loading-indicator/src/index.ts',
      ),
      '@maersk-global/mds-components-core-menu': resolve(__dirname, './packages/mc-menu/src/index.ts'),
      '@maersk-global/mds-components-core-modal': resolve(__dirname, './packages/mc-modal/src/index.ts'),
      '@maersk-global/mds-components-core-month-year-picker': resolve(
        __dirname,
        './packages/mc-month-year-picker/src/index.ts',
      ),
      '@maersk-global/mds-components-core-multi-choice-fieldset': resolve(
        __dirname,
        './packages/mc-multi-choice-fieldset/src/index.ts',
      ),
      '@maersk-global/mds-components-core-multi-select': resolve(__dirname, './packages/mc-multi-select/src/index.ts'),
      '@maersk-global/mds-components-core-notification': resolve(__dirname, './packages/mc-notification/src/index.ts'),
      '@maersk-global/mds-components-core-number-stepper': resolve(
        __dirname,
        './packages/mc-number-stepper/src/index.ts',
      ),
      '@maersk-global/mds-components-core-option': resolve(__dirname, './packages/mc-option/src/index.ts'),
      '@maersk-global/mds-components-core-pagination': resolve(__dirname, './packages/mc-pagination/src/index.ts'),
      '@maersk-global/mds-components-core-picker-item': resolve(__dirname, './packages/mc-picker-item/src/index.ts'),
      '@maersk-global/mds-components-core-picker': resolve(__dirname, './packages/mc-picker/src/index.ts'),
      '@maersk-global/mds-components-core-popover': resolve(__dirname, './packages/mc-popover/src/index.ts'),
      '@maersk-global/mds-components-core-radio-group': resolve(__dirname, './packages/mc-radio-group/src/index.ts'),
      '@maersk-global/mds-components-core-radio': resolve(__dirname, './packages/mc-radio/src/index.ts'),
      '@maersk-global/mds-components-core-segmented-control-item': resolve(
        __dirname,
        './packages/mc-segmented-control-item/src/index.ts',
      ),
      '@maersk-global/mds-components-core-segmented-control': resolve(
        __dirname,
        './packages/mc-segmented-control/src/index.ts',
      ),
      '@maersk-global/mds-components-core-select-native': resolve(
        __dirname,
        './packages/mc-select-native/src/index.ts',
      ),
      '@maersk-global/mds-components-core-select': resolve(__dirname, './packages/mc-select/src/index.ts'),
      '@maersk-global/mds-components-core-switch-group': resolve(__dirname, './packages/mc-switch-group/src/index.ts'),
      '@maersk-global/mds-components-core-switch': resolve(__dirname, './packages/mc-switch/src/index.ts'),
      '@maersk-global/mds-components-core-tab-bar': resolve(__dirname, './packages/mc-tab-bar/src/index.ts'),
      '@maersk-global/mds-components-core-tab': resolve(__dirname, './packages/mc-tab/src/index.ts'),
      '@maersk-global/mds-components-core-table': resolve(__dirname, './packages/mc-table/src/index.ts'),
      '@maersk-global/mds-components-core-tag': resolve(__dirname, './packages/mc-tag/src/index.ts'),
      '@maersk-global/mds-components-core-text-and-icon': resolve(
        __dirname,
        './packages/mc-text-and-icon/src/index.ts',
      ),
      '@maersk-global/mds-components-core-textarea': resolve(__dirname, './packages/mc-textarea/src/index.ts'),
      '@maersk-global/mds-components-core-time-picker': resolve(__dirname, './packages/mc-time-picker/src/index.ts'),
      '@maersk-global/mds-components-core-toast': resolve(__dirname, './packages/mc-toast/src/index.ts'),
      '@maersk-global/mds-components-core-tooltip': resolve(__dirname, './packages/mc-tooltip/src/index.ts'),
      '@maersk-global/mds-components-core-typeahead': resolve(__dirname, './packages/mc-typeahead/src/index.ts'),
      '@maersk-global/mds-components-core-step-indicator-item': resolve(
        __dirname,
        './packages/mc-step-indicator-item/src/index.ts',
      ),
      '@maersk-global/mds-components-core-step-indicator': resolve(
        __dirname,
        './packages/mc-step-indicator/src/index.ts',
      ),
      '@maersk-global/mds-components-core-dialog': resolve(__dirname, './packages/mc-dialog/src/index.ts'),
      '@maersk-global/mds-components-core-link-button': resolve(__dirname, './packages/mc-link-button/src/index.ts'),
      '@maersk-global/mds-components-core-drawer': resolve(__dirname, './packages/mc-drawer/src/index.ts'),
      '@maersk-global/mds-components-core-top-bar': resolve(__dirname, './packages/mc-top-bar/src/index.ts'),
      '@maersk-global/mds-components-core-side-bar': resolve(__dirname, './packages/mc-side-bar/src/index.ts'),
      '@maersk-global/mds-components-core-theme-switch': resolve(__dirname, './packages/mc-theme-switch/src/index.ts'),
      '@maersk-global/mds-components-core-progress-indicator': resolve(
        __dirname,
        './packages/mc-progress-indicator/src/index.ts',
      ),
      '@maersk-global/mds-components-core-badge': resolve(__dirname, './packages/mc-badge/src/index.ts'),
      '@maersk-global/mds-components-core-typeahead-multi-select': resolve(
        __dirname,
        './packages/mc-typeahead-multi-select/src/index.ts',
      ),
      '@maersk-global/mds-components-core-input-group': resolve(__dirname, './packages/mc-input-group/src/index.ts'),
      //%%COMPONENT_INTERNAL_VITE_ALIAS%%
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        importers: [new NodePackageImporter()],
        quietDeps: true,
        silenceDeprecations: ['import'],
      },
    },
  },
});
