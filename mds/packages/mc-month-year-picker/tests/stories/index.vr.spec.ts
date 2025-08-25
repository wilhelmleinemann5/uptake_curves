import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-month-year-picker',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-month-year-picker", title: "mc-month-year-picker VR" };
  `,
  stories: () => generateThemeStories(components),
});
