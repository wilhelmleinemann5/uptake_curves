import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-top-bar',
  states: states.filter((i) => i.accessibility === true),
  fits: ['medium'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-top-bar", title: "mc-top-bar Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
