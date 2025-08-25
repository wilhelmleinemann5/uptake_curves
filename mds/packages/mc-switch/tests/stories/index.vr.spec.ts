import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-switch',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-switch", title: "mc-switch VR"};
  `,
  stories: () => generateThemeStories(components),
});
