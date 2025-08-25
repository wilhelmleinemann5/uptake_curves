import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-modal',
  states: states('small', 'small', 'Heading', false),
  fits: ['small'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-modal", title: "mc-modal Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
