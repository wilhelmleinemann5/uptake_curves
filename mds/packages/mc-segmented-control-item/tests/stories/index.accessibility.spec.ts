import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-segmented-control-item',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  cardItemAccessibilityAttributes: 'role="list"',
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-segmented-control-item", title: "mc-segmented-control-item Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
