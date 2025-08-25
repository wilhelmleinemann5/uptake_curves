import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';
import { Fit } from '@maersk-global/mds-shared-types';

const componentsData: { name: string; fits: Fit[] }[] = [
  { name: '', fits: ['small', 'medium', 'large'] },
  { name: 'only_medium', fits: ['medium'] },
];

const components = componentsData.map((data) => {
  return {
    name: data.name,
    generatedStates: generateStates({
      componentName: 'mc-date-range',
      states: states.filter((state) => (data.name === 'only_medium' ? state.onlyMedium : !state.onlyMedium)),
      fits: data.fits,
      excludedPropsFromTitle: ['onlyMedium'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-date-range", title: "mc-date-range VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.name}`),
      };
    }, {}),
});
