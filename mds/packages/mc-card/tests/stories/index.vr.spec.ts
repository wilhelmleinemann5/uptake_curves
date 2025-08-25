import { getStates } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [
  { orientation: 'vertical', variant: 'bordered' },
  { orientation: 'vertical', variant: 'borderless' },
  { orientation: 'horizontal', variant: 'bordered' },
  { orientation: 'horizontal', variant: 'borderless' },
];

const components = componentsData.map((data) => {
  return {
    name: `${data.orientation}_${data.variant}`,
    generatedStates: generateStates({
      componentName: 'mc-card',
      states: getStates(
        'packages/mc-card/stories/images/supply-chain-logistics_illustration.png',
        'packages/mc-card/stories/images/transportation-services_illustration.png',
        data.orientation
      ),
      fits: ['small', 'medium', 'large'],
      variants: [data.variant],
      excludedPropsFromTitle: ['image'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-card", title: "mc-card VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.name}`),
      };
    }, {}),
});
