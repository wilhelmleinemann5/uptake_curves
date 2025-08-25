import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as textPreview } from '../02-colours/01-text/code-preview';
import { preview as backgroundPreview } from '../02-colours/02-background/code-preview';
import { preview as onBackgroundPreview } from '../02-colours/03-on-background/code-preview';
import { preview as borderPreview } from '../02-colours/04-border/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${textPreview(false, false)[0].template}
  ${backgroundPreview(false, false)[0].template}
  ${onBackgroundPreview(false, false)[0].template}
  ${borderPreview(false, false)[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Colours" };
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
