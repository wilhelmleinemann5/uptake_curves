import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-list-item',
  states,
  fits: ['unknown'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-list-item", title: "mc-list-item VR"};
  `,
  stories: () => generateThemeStories(components),
});
