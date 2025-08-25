import { getStatesByOrientation } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ orientation: 'horizontal' }, { orientation: 'vertical' }];

const components = componentsData.map((data) => {
  return {
    orientation: data.orientation,
    generatedStates: generateStates({
      componentName: 'mc-button-group',
      states: getStatesByOrientation(data.orientation),
      fits: ['small', 'medium', 'large'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-button-group", title: "mc-button-group VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.orientation}`),
      };
    }, {}),
});
