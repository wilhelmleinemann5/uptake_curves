import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-number-stepper',
  states,
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-number-stepper", title: "mc-number-stepper VR"};
  `,
  stories: () => generateThemeStories(components),
});
