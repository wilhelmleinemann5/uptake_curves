import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-segmented-control-item',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-segmented-control-item", title: "mc-segmented-control-item VR"};
  `,
  stories: () => generateThemeStories(components),
});
