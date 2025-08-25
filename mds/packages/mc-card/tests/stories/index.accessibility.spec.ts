import { getStates } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const states: unknown[] = getStates('', '', 'horizontal');
const components = generateStates({
  componentName: 'mc-card',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  variants: ['bordered', 'borderless'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-card", title: "mc-card Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
