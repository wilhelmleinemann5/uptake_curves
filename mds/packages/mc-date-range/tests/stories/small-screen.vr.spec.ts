import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-date-range',
  states: states.filter((state) => state.onlyMedium),
  fits: ['medium'],
  excludedPropsFromTitle: ['onlyMedium'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-date-range", 
      title: "mc-date-range VR",
      parameters: {
        viewport: { defaultViewport: 'x-small' },
        chromatic: { modes: { viewport: 'x-small'}},
      }
    };
  `,
  stories: () => generateThemeStories(components, 'small_screen'),
});
