import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { smallScreenStates } from './_states';

const components = generateStates({
  componentName: 'mc-popover',
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
  fits: ['unknown'],
});

export default defineStories({
  baseCsf: `
    export default { 
      component: "mc-popover", 
      title: "mc-popover VR",
      parameters: {
        viewport: { defaultViewport: 'x-small' },
        chromatic: { modes: { viewport: 'x-small'}},
      }
    };
  `,
  stories: () => generateThemeStories(components, 'small_screen'),
});
