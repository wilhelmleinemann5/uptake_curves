import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-step-indicator-item',
  states,
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-step-indicator-item", title: "mc-step-indicator-item VR"};
  `,
  stories: () => generateThemeStories(components),
});
