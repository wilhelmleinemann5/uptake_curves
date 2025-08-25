import type { StorybookConfig } from '@storybook/web-components-vite';

let stories = ['../stories/**/*.stories.@(js|jsx|ts|tsx)', '../packages/**/*.stories.@(js|jsx|ts|tsx)'];

if (process.env.STORYBOOK_MODE === 'vr') {
  stories = ['../packages/**/*.vr.spec.@(js|jsx|ts|tsx)'];
} else if (process.env.STORYBOOK_MODE === 'accessibility') {
  stories = [
    '../packages/**/*.accessibility.spec.@(js|jsx|ts|tsx)',
    '../packages/mds-foundations/**/*.vr.spec.@(js|jsx|ts|tsx)',
  ];
}

const config: StorybookConfig = {
  stories,
  staticDirs: ['./public'],
  addons: [
    './panel-addon-slots/register.js',
    './panel-addon-cssparts/register.js',
    '@storybook/addon-a11y',
    './preset',
  ],
  features: {
    interactions: false,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;
