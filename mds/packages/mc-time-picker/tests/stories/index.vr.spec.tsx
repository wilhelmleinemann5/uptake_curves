import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const component = generateStates({
  componentName: 'mc-time-picker',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2000-11-22 10:20');
    
    export default { component: "mc-time-picker", title: "mc-time-picker VR", chromatic: { delay: 500 }};
  `,
  stories: () => generateThemeStories(component),
});
