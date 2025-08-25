import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-typeahead',
  states,
  fits: ['unknown'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-typeahead", 
      title: "mc-typeahead VR",
      parameters: {
        viewport: { defaultViewport: 'x-small' },
        chromatic: { modes: { viewport: 'x-small'}},
      }
    };
  `,
  stories: () =>
    generateThemeStories(
      `${components}`,
      'small_screen',
      `requestAnimationFrame(() => {
        const typeahead = document.querySelector('mc-typeahead');
        typeahead.isActive = true;
        typeahead.fullScreen = true;
        console.log('test');
      });`,
    ),
});
