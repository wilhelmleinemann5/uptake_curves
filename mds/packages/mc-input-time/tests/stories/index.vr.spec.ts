import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';

const components = generateStates({
  componentName: 'mc-input-time',
  states: states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2000-11-22 10:20');

    export default {
      component: "mc-input-time",
      title: "mc-input-time VR",
      parameters: {
        viewport: { defaultViewport: 'large' },
      }
    };
  `,
  stories: () => generateThemeStories(components),
});
