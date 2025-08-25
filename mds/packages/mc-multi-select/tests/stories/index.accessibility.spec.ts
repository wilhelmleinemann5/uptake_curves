import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-multi-select',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-multi-select", title: "mc-multi-select Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
