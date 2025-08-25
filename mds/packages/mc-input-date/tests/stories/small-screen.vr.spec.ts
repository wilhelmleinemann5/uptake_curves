import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-input-date',
  states: states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-input-date", 
      title: "mc-input-date VR",
      parameters: {
        viewport: { defaultViewport: 'x-small' },
        chromatic: { modes: { viewport: 'x-small'}},
      }
    };
  `,
  stories: () => generateThemeStories(components, 'small_screen'),
});
