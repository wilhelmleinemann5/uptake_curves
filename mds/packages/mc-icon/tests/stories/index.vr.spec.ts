import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-icon',
  states,
  fits: ['unknown'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-icon", title: "mc-icon VR"};
  `,
  stories: () => generateThemeStories(components),
});
