import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-side-bar',
  states,
  fits: ['medium'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-side-bar", title: "mc-side-bar VR"};
  `,
  stories: () => generateThemeStories(components),
});
