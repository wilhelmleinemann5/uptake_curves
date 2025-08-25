import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-calendar',
  states: states.filter((state) => state.noborder),
  fits: ['unknown'],
});

export default defineStories({
  baseCsf: `
    import MockDate from 'mockdate';
    MockDate.set('2022-06-15'); 

    export default { component: "mc-calendar", title: "mc-calendar VR",       
    parameters: {
      viewport: { defaultViewport: 'x-small' },
      chromatic: { modes: { viewport: 'x-small'}},
    }};
  `,
  stories: () => {
    return generateThemeStories(components, 'small_screen');
  },
});
