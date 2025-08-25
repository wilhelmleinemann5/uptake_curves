import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-step-indicator',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-step-indicator", title: "mc-step-indicator Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
