import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-dialog',
  states: states('small', 'small', 'Heading', 'body text', false, false, false, false, false),
  fits: ['small'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-dialog", title: "mc-dialog Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
