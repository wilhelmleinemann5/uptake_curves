import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-calendar-month-year-picker',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-calendar-month-year-picker", title: "mc-calendar-month-year-picker VR"};
  `,
  stories: () => generateThemeStories(components),
});
