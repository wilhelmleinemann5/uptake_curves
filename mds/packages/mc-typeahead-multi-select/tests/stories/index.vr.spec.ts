import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-typeahead-multi-select',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-typeahead-multi-select", 
      title: "mc-typeahead-multi-select VR", 
      parameters: {
        viewport: { defaultViewport: 'large' },
      }
};
  `,
  stories: () => generateThemeStories(components),
});
