import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-drawer',
  states: states(
    'small',
    'small',
    'Heading',
    'body text',
    'left',
    false,
    false,
    undefined,
    undefined,
    false,
    false,
    false,
  ),
  fits: ['medium'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-drawer", title: "mc-drawer Accessibility"};
  `,
  stories: () => generateThemeStories(components),
});
