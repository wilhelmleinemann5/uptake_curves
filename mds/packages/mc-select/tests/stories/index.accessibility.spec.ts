import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-select',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-select", title: "mc-select Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
