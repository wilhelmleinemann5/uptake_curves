import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-input-group',
  states: states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-input-group", title: "mc-input-group VR"};
  `,
  stories: () => generateThemeStories(components, 'desktop_screen'),
});
