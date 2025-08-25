import { states } from './_states';
import { defineStories, Fit, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [{ fit: 'small' }, { fit: 'medium' }, { fit: 'large' }];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    generatedStates: generateStates({
      componentName: 'mc-notification',
      states: states,
      fits: [data.fit as Fit],
      appearances: ['neutral-weak', 'info', 'success', 'warning', 'error'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-notification", title: "mc-notification VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.fit}`),
      };
    }, {}),
});
