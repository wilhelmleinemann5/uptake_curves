import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';
import { Fit } from '@maersk-global/mds-shared-types';

const componentsData = [{ fit: 'small' }, { fit: 'medium' }, { fit: 'large' }];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    generatedStates: generateStates({
      componentName: 'mc-table',
      states,
      fits: [data.fit as Fit],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-table", title: "mc-table VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.fit}`),
      };
    }, {}),
});
