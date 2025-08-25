import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-button',
  states: states.filter((i) => i.accessibility === true),
  fits: ['small', 'medium', 'large'],
  variants: ['filled', 'outlined', 'plain'],
  appearances: ['primary', 'secondary', 'neutral', 'inverse', 'error'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-button", title: "mc-button Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
