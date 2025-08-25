import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as headlinePreview } from '../03-typography/01-headline/code-preview';
import { preview as textPreview } from '../03-typography/02-text/code-preview';
import { preview as tabularFiguresPreview } from '../03-typography/03-tabular-figures/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${headlinePreview(false, false)[0].template}
  ${textPreview(false, false)[0].template}
  ${tabularFiguresPreview(false, false)[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Typography"};
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
