import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-step-indicator-item',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  cardItemAccessibilityAttributes: 'role="list"',
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-step-indicator-item", title: "mc-step-indicator-item Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
