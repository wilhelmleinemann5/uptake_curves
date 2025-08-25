import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ variant: 'default' }, { variant: 'vanity' }];

const components = componentsData.map((data) => {
  return {
    name: data.variant,
    generatedStates: generateStates({
      componentName: 'mc-select',
      states,
      cardClassList: ['e2e-canvas-card--height-300'],
      fits: ['small', 'medium', 'large'],
      variants: [data.variant],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-select", title: "mc-select VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.name}`),
      };
    }, {}),
});
