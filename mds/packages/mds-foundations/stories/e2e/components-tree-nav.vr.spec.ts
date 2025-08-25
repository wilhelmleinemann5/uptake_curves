import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as defaultPreview } from '../components-tree-nav/code-preview';
import { preview as withIconPreview } from '../components-tree-nav/examples/01-with-icon/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${defaultPreview()[0].template}
  ${withIconPreview()[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Components/Tree Nav" };
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
