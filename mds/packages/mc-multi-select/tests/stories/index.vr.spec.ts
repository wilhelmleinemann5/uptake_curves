import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-multi-select',
  states,
  fits: ['small', 'medium', 'large'],
  cardClassList: ['e2e-canvas-card--height-300'],
  variants: ['default', 'vanity'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-multi-select", title: "mc-multi-select VR"};
  `,
  stories: () => generateThemeStories(components),
});
