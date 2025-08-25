import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ smallScreen: false }, { smallScreen: true }];

const components = componentsData.map((data) => {
  return {
    smallScreen: data.smallScreen,
    generatedStates: generateStates({
      componentName: 'mc-switch-group',
      states: states.filter((state) => state.smallScreen),
      fits: ['small', 'medium', 'large'],
      excludedPropsFromTitle: ['smallScreen'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-switch-group", title: "mc-switch-group VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.smallScreen}`),
      };
    }, {}),
});
