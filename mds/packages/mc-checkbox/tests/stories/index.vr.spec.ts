import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-checkbox',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-checkbox", title: "mc-checkbox VR"};
  `,
  stories: () => generateThemeStories(components),
});
