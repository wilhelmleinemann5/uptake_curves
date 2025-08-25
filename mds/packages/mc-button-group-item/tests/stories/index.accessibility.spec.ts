import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-button-group-item',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  cardItemAccessibilityAttributes: 'role="list"',
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-button-group-item", title: "mc-button-group-item Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
