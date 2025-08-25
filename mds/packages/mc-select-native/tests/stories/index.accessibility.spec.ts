import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-select-native',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-select-native", title: "mc-select-native Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
