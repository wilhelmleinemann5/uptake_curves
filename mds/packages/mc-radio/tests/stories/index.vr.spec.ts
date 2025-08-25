import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-radio',
  states,
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-radio", title: "mc-radio VR"};
  `,
  stories: () => generateThemeStories(components),
});
