import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-calendar-month-year-picker',
  states: states.filter((i) => i.accessibility === true),
});
export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2023-04-27');

    export default { component: "mc-calendar-month-year-picker", title: "mc-calendar-month-year-picker Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
