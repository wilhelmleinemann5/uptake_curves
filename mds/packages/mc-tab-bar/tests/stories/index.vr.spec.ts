import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ portView: 'small' }, { portView: 'large' }];

const components = componentsData.map((data) => {
  return {
    portView: data.portView,
    generatedStates: generateStates({
      componentName: 'mc-tab-bar',
      states: states,
      fits: ['small', 'medium', 'large'],
      variants: ['default', 'stretched'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-tab-bar", title: "mc-tab-bar VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.portView}`),
      };
    }, {}),
});
