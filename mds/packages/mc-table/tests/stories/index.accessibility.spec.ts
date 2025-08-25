import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const component = generateStates({
  componentName: 'mc-table',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-table", title: "mc-table Accessibility"};
  `,
  stories: () => generateThemeStories(component),
});
