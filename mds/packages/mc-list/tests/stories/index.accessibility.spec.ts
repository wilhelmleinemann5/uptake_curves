import { getStatesByOrientation } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ orientation: 'horizontal' }];

const components = componentsData.map((data) => {
  return {
    orientation: data.orientation,
    generatedStates: generateStates({
      componentName: 'mc-list',
      states: getStatesByOrientation(data.orientation).filter((i) => i.accessibility === true),
      fits: ['unknown'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-list", title: "mc-list Accessibility"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.orientation}`),
      };
    }, {}),
});
