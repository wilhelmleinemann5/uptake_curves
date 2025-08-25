import { states, smallScreenStates, positionStates } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const componentsData = [
  { name: 'small', states: states() },
  { name: 'medium', states: states() },
  { name: 'large', states: states() },
  { name: 'positions', states: positionStates },
  {
    name: 'modal_mode_enabled_desktop_screen',
    states: [
      {
        ...smallScreenStates[0],
        modalmode: 'x-small-screen',
        slots: [
          ...(smallScreenStates[0].slots ? smallScreenStates[0].slots : []),
          { name: 'heading', content: '<h2 slot="heading">The title</h2>' },
          { name: 'footer', content: '<mc-button slot="footer">Ok</mc-button>' },
        ],
      },
    ],
  },
];

const components = componentsData.map((data) => {
  return {
    name: data.name,
    generatedStates: generateStates({
      componentName: 'mc-popover',
      states: data.states,
      fits: ['small', 'medium', 'large'],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-popover", title: "mc-popover VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(component.generatedStates, `${component.name}`),
      };
    }, {}),
});
