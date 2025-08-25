import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-notification',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  appearances: ['neutral-weak', 'info', 'success', 'warning', 'error'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-notification", title: "mc-notification Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
