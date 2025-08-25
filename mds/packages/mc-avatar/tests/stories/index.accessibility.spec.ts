import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-avatar',
  states: states.filter((i) => i.accessibility === true),
  fits: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-avatar", title: "mc-avatar Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
