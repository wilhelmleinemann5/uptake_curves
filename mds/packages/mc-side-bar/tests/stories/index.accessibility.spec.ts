import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-side-bar',
  states: states.filter((i) => i.accessibility === true),
  fits: ['medium'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-side-bar", title: "mc-side-bar Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
