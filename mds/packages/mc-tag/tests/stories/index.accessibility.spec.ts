import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-tag',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  appearances: ['neutral-default', 'neutral-weak', 'neutral-inverse', 'info', 'success', 'warning', 'error'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-tag", title: "mc-tag Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
