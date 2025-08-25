import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-textarea',
  states,
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-textarea", title: "mc-textarea VR"};
  `,
  stories: () => generateThemeStories(components),
});
