import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as linksPreview } from '../components-link/code-preview';
import { preview as externalPreview } from '../components-link/examples/01-external/code-preview';
import { preview as typographyPreview } from '../components-link/examples/02-typography/code-preview';
import { preview as colorsPreview } from '../components-link/examples/03-colours/code-preview';
import { preview as focusShadowInsetPreview } from '../components-link/examples/04-focus-shadow-inset/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${linksPreview(false, false)[0].template}
  ${externalPreview(false, false)[0].template}
  ${typographyPreview(false, false)[0].template}
  ${colorsPreview(false, false)[0].template}
  ${focusShadowInsetPreview(false, false)[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Components/Link" };
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
