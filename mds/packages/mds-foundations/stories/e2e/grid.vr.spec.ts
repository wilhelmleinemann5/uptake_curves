import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { templateStory } from '../09-grid/story-utils';
import { example as basicGridPreview } from '../09-grid/code-preview';
import { example as fullWidthPreview } from '../09-grid/1-examples/0-full-width/code-preview';
import { example as pinToEdgesPreview } from '../09-grid/1-examples/1-pin-to-edges/code-preview';
import { example as pinToEdgesAndSpanningPreview } from '../09-grid/1-examples/2-pin-to-edges-and-span/code-preview';
import { example as acrossMultipleLinesPreview } from '../09-grid/1-examples/4-multiple-lines/code-preview';
import { example as customColumnsPreview } from '../09-grid/0-utility-classes/5-custom-columns/code-preview';
import { hologramStyles } from '../09-grid/grid-hologram';

const component = `
${hologramStyles(null, 'container')}
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">The default container-based grid</div>
  <div style="container-type: inline-size;">${templateStory({ ['type']: 'container' }, basicGridPreview)}</div>
</div>
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">Element goes full-width in all breakpoints</div>
  ${templateStory({ ['type']: 'container' }, fullWidthPreview)}
</div>
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">Elements are pinned to the edges in all breakpoints</div>
  ${templateStory({ ['type']: 'container' }, pinToEdgesPreview)}
</div>
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">Elements are edge-pinned at all breakpoints and span 2 columns</div>
  ${templateStory({ ['type']: 'container' }, pinToEdgesAndSpanningPreview)}
</div>
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">Elements are positioned across multiple lines (rows)</div>
  ${templateStory({ ['type']: 'container' }, acrossMultipleLinesPreview)}
</div>
<div class="e2e-canvas-card">
  <div class="e2e-canvas-card-title">Elements are positioned using auto-layout however the default min-widths are overridden</div>
  ${templateStory({ ['type']: 'container' }, customColumnsPreview)}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mds-grid", title: "CSS & SASS Foundations/Grid",       
    parameters: {
      chromatic: { 
        modes: {
          "x-small": { viewport: "x-small" },
          "small": { viewport: "small" },
          "medium": { viewport: "medium" },
          "large": { viewport: "large" },
          "x-large": { viewport: "x-large" },
        },
      },
    }};
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
