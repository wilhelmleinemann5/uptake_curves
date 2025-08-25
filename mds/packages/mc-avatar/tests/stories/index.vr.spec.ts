import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-avatar',
  states,
  fits: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
  appearances: ['color-1', 'color-2', 'color-3', 'color-4'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-avatar", title: "mc-avatar VR"};
  `,
  stories: () => generateThemeStories(components),
});
