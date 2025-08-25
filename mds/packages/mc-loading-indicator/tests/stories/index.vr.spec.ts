import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-loading-indicator',
  states,
  fits: ['small', 'medium', 'large'],
  variants: ['ring', 'bar'],
  appearances: ['primary', 'neutral-inverse'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-loading-indicator", title: "mc-loading-indicator VR"};
  `,
  stories: () => generateThemeStories(components),
});
