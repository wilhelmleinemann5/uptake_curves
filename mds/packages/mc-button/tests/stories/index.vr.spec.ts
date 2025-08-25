import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';
import { Fit } from '@maersk-global/mds-shared-types';

const componentsData = [
  { fit: 'small', variant: 'filled' },
  { fit: 'medium', variant: 'filled' },
  { fit: 'large', variant: 'filled' },
  { fit: 'small', variant: 'outlined' },
  { fit: 'medium', variant: 'outlined' },
  { fit: 'large', variant: 'outlined' },
  { fit: 'small', variant: 'plain' },
  { fit: 'medium', variant: 'plain' },
  { fit: 'large', variant: 'plain' },
];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    variant: data.variant,
    generatedStates: generateStates({
      componentName: 'mc-button',
      states,
      fits: [data.fit as Fit],
      variants: [data.variant],
      appearances: ['primary', 'secondary', 'neutral', 'inverse', 'error'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-button", title: "mc-button VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.fit}_${component.variant}`),
      };
    }, {}),
});
