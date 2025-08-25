import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-menu',
  states: states.filter((i) => i.accessibility === true),
  fits: ['unknown'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-menu", title: "mc-menu Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
