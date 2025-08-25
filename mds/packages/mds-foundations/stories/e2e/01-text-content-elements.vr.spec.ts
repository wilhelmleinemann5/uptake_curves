import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview } from '../01-text-content-elements/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${preview(false, false)[0].template}
  ${preview(false, true)[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Text Content Elements"};
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
