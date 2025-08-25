import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const component = generateStates({
  componentName: 'mc-time-picker',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-time-picker", title: "mc-time-picker Accessibility"};
  `,
  stories: () => generateThemeStories(component),
});
