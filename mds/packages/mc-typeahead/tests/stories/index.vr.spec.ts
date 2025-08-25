import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-typeahead',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-typeahead", 
      title: "mc-typeahead VR",
      parameters: {
        viewport: { defaultViewport: 'large' },
      }
    };
  `,
  stories: () => generateThemeStories(components),
});
