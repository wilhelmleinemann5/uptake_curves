import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-step-indicator',
  states,
  fits: ['small', 'medium', 'large'],
  excludedPropsFromTitle: ['smallScreen'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-step-indicator", 
      title: "mc-step-indicator VR",
      parameters: {
        viewport: { defaultViewport: 'large' },
      }};
  `,
  stories: () => generateThemeStories(components),
});
