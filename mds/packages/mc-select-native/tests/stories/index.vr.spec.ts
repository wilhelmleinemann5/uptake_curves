import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';
import { Fit } from '@maersk-global/mds-shared-types';

const componentsData = [
  { fit: 'small', variant: 'default' },
  { fit: 'medium', variant: 'default' },
  { fit: 'large', variant: 'default' },
  { fit: 'small', variant: 'vanity' },
  { fit: 'medium', variant: 'vanity' },
  { fit: 'large', variant: 'vanity' },
  { fit: 'small', variant: 'multiple' },
  { fit: 'medium', variant: 'multiple' },
  { fit: 'large', variant: 'multiple' },
];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    variant: data.variant,
    generatedStates: generateStates({
      componentName: 'mc-select-native',
      states,
      fits: [data.fit as Fit],
      variants: [data.variant],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-select-native", title: "mc-select-native VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.fit}_${component.variant}`),
      };
    }, {}),
});
