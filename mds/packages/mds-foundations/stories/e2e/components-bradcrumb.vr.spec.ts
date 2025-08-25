import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as previewDefault } from '../components-breadcrumb/code-preview';
import { preview as previewTruncatedCurrentPage } from '../components-breadcrumb/examples/01-with-truncation-current-page/code-preview';
import { preview as previewTruncated } from '../components-breadcrumb/examples/02-with-truncation/code-preview';
import { preview as previewWithIcons } from '../components-breadcrumb/examples/03-with-icon/code-preview';
import { preview as previewWithContainerQuery } from '../components-breadcrumb/examples/04-collapse-container-query/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${previewDefault({ 'aria-label': 'example a' })[0].template}
  <div style="width:480px">${previewDefault({ variant: 'collapsed', 'aria-label': 'example b' })[0].template}</div>
  <div style="width:600px">${previewTruncatedCurrentPage[0].template}</div>
  <div style="width:600px">${previewTruncated[0].template}</div>
  ${previewWithIcons[0].template}
  ${previewWithContainerQuery[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Components/Breadcrumb"};
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
