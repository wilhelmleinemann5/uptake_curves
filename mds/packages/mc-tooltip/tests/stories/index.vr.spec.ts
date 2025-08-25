import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';
import { Fit } from '@maersk-global/mds-shared-types';

const componentsData = [{ fit: 'small' }, { fit: 'medium' }, { fit: 'large' }];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    generatedStates: generateStates({
      componentName: 'mc-tooltip',
      states: states(),
      fits: [data.fit as Fit],
      appearances: ['neutral-default', 'neutral-inverse'],
      excludedPropsFromTitle: ['open', 'slots'],
      cardClassList: ['e2e-canvas-card--large', 'e2e-canvas-card--center'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-tooltip", title: "mc-tooltip VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.fit}`),
      };
    }, {}),
});
