import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-text-and-icon',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-text-and-icon", title: "mc-text-and-icon VR"};
  `,
  stories: () => generateThemeStories(components),
});
