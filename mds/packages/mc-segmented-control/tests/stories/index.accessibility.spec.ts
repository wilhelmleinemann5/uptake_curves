import { getStatesByOrientation } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-segmented-control',
  states: getStatesByOrientation('horizontal').filter((i) => i.accessibility === true),
  fits: ['unknown'],
});
export default defineStories({
  baseCsf: `
    export default { component: "mc-segmented-control", title: "mc-segmented-control Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
