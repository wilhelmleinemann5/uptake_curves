import { defineStories, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { preview as basicPreview } from '../components-table-html/examples/01-basic/code-preview';
import { preview as zebraStripesPreview } from '../components-table-html/examples/02-zebra-stripes/code-preview';
import { preview as verticalLinesPreview } from '../components-table-html/examples/03-vertical-lines/code-preview';
import { preview as horizontalLinesPreview } from '../components-table-html/examples/04-horizontal-lines/code-preview';
import { preview as outerBorderPreview } from '../components-table-html/examples/05-outer-border/code-preview';
import { preview as captionPreview } from '../components-table-html/examples/06-caption/code-preview';
import { preview as subtextPreview } from '../components-table-html/examples/07-subtext/code-preview';
import { preview as headerGroupsPreview } from '../components-table-html/examples/08-header-groups/code-preview';
import { preview as rowHeadersPreview } from '../components-table-html/examples/09-row-headers/code-preview';
import { preview as noHeaderPreview } from '../components-table-html/examples/10-no-header/code-preview';
import { preview as footerPreview } from '../components-table-html/examples/11-footer/code-preview';
import { preview as stickyHeaderPreview } from '../components-table-html/examples/12-sticky-header/code-preview';
import { preview as stickyFooterPreview } from '../components-table-html/examples/13-sticky-footer/code-preview';
import { preview as stickyColumnPreview } from '../components-table-html/examples/14-sticky-column/code-preview';
import { preview as stickyHeaderColumnFooterPreview } from '../components-table-html/examples/15-sticky-header-column-footer/code-preview';
import { preview as sortableHeadersPreview } from '../components-table-html/examples/16-sortable-headers/code-preview';
import { rowSelectorTemplate } from '../components-table-html/examples/17-row-selector/code-preview';
import { rowExpansionTemplate } from '../components-table-html/examples/18-row-expansion/code-preview';
import { preview as cellVerticalAlignPreview } from '../components-table-html/examples/19-cell-vertical-alignment/code-preview';

const component = `
<div class="e2e-canvas-card">
  ${basicPreview[0].template}
  ${zebraStripesPreview[0].template}
  ${verticalLinesPreview[0].template}
  ${horizontalLinesPreview[0].template}
  ${outerBorderPreview[0].template}
  ${captionPreview[0].template}
  ${subtextPreview[0].template}
  ${headerGroupsPreview[0].template}
  ${rowHeadersPreview[0].template}
  ${noHeaderPreview[0].template}
  ${footerPreview[0].template}
  ${stickyHeaderPreview[0].template}
  ${stickyFooterPreview[0].template}
  ${stickyColumnPreview[0].template}
  ${stickyHeaderColumnFooterPreview[0].template}
  ${sortableHeadersPreview[0].template}
  ${rowSelectorTemplate}
  ${rowExpansionTemplate}
  ${cellVerticalAlignPreview[0].template}
</div>`;

export default defineStories({
  baseCsf: `
    export default { component: "mc-component", title: "CSS & SASS Foundations/Components/Table HTML"};
  `,
  stories: () => generateThemeStories(component.replace(/\n/g, '')),
});
