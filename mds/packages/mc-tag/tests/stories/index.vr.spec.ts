import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const component = generateStates({
  componentName: 'mc-tag',
  states,
  fits: ['small', 'medium', 'large'],
  appearances: ['neutral-default', 'neutral-weak', 'neutral-inverse', 'info', 'success', 'warning', 'error'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-tag", title: "mc-tag VR"};
  `,
  stories: () => generateThemeStories(component),
});
