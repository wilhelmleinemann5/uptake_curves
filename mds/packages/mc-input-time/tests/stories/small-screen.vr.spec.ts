import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-input-time',
  states: [{ ...states[0], open: true }],
  fits: ['medium'],
});

export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2000-11-22 10:20');

    export default { 
      component: "mc-input-time", 
      title: "mc-input-time VR",
      parameters: {
        viewport: { defaultViewport: 'x-small' },
        chromatic: { modes: { viewport: 'x-small'}},
      }
    };
  `,
  stories: () => generateThemeStories(components, 'small_screen'),
});
