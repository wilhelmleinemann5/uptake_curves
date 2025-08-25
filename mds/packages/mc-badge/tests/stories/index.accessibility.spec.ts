import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-badge',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-badge", title: "mc-badge Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
