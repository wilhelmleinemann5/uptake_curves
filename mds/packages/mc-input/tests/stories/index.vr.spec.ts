import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ variant: 'default' }, { variant: 'vanity' }];

const components = componentsData.map((data) => {
  return {
    variant: data.variant,
    generatedStates: generateStates({
      componentName: 'mc-input',
      states,
      fits: ['small', 'medium', 'large'],
      variants: [data.variant],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-input", title: "mc-input VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.variant}`),
      };
    }, {}),
});
