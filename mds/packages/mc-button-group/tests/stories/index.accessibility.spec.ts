import { getStatesByOrientation } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-button-group',
  states: getStatesByOrientation('horizontal').filter((i) => i.accessibility === true),
  fits: ['unknown'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-button-group", title: "mc-button-group Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
