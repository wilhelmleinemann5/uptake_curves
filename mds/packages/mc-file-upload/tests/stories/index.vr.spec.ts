import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils';

const components = generateStates({
  componentName: 'mc-file-upload',
  states,
  fits: ['small', 'medium', 'large'],
  excludedPropsFromTitle: ['files'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-file-upload", title: "mc-file-upload VR"};
  `,
  stories: () => generateThemeStories(components),
});
