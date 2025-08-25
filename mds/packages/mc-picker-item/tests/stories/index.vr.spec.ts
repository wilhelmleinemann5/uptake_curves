import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-picker-item',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-picker-item", title: "mc-picker-item VR"};
  `,
  stories: () => generateThemeStories(components),
});
