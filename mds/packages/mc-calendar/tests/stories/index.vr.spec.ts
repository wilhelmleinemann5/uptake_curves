import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-calendar',
  states,
  fits: ['small', 'medium', 'large'],
});

export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2022-06-15'); 

    export default { component: "mc-calendar", title: "mc-calendar VR"};
  `,
  stories: () => {
    return generateThemeStories(components);
  },
});
