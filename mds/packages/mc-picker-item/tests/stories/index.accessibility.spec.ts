import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-picker-item',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  cardItemAccessibilityAttributes: 'role="listbox" aria-label="fruits"',
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-picker-item", title: "mc-picker-item Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
