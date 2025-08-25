import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const component = generateStates({
  componentName: 'mc-picker',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-picker", title: "mc-picker VR"};
  `,
  stories: () => generateThemeStories(component),
});
