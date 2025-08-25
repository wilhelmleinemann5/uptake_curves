import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';

const components = generateStates({
  componentName: 'mc-badge',
  states,
  fits: ['small', 'medium'],
  variants: ['default', 'dot'],
  appearances: ['error', 'warning', 'success', 'info'],
  cardClassList: ['e2e-canvas-relative'],
});

export default defineStories({
  baseCsf: `
    export default { component: "mc-badge", title: "mc-badge VR"};
  `,
  stories: () => generateThemeStories(components),
});
