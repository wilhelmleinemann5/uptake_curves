import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import { headerGroupsColumns } from './columns-with-cell-renderers';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Table/Documentation',
  component: 'mc-table',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const urlParams = new URLSearchParams(window.location.search);
  const mdsDocsSubLabels = urlParams.get('mdsdocssublabels');
  const mdsDocsGrouping = urlParams.get('mdsdocsgrouping');
  if (mdsDocsGrouping == 'true') {
    args.columns = headerGroupsColumns;
  }

  if (mdsDocsSubLabels) {
    args.columns[0].subDataLabel = 'Vessel type';
    args.columns[0].subDataKey = 'type';
  }
  const footer = args.footer
    ? `
    <div slot="length_footer">Total:</div>
    <div slot="capacity_footer" class="mds-tabular-figures mds-numeric">72377</div>`
    : '';
  const expand = args.expand
    ? `
    <div slot="1_expanded">Expanded row for Madrid Maersk</div>
    <div slot="2_expanded">Expanded row for Mary Maersk</div>`
    : '';
  const slot = `${footer}${expand}`;
  const code = generateCode('mc-table', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width: 100%;">
      <mc-table
        ?disablehorizontallines="${args.disablehorizontallines}"
        ?disableoverflow="${args.disableoverflow}"
        ?disableroundedcorners="${args.disableroundedcorners}"
        ?disablerowhighlightonhover="${args.disablerowhighlightonhover}"
        ?disableplaceholderfooters="${args.disableplaceholderfooters}"
        ?sortdisabled="${args.sortdisabled}"
        ?sortdisableoninitialload="${args.sortdisableoninitialload}"
        ?footer="${args.footer}"
        ?headerhidden="${args.headerhidden}"
        ?nowrap="${args.nowrap}"
        ?expand="${args.expand}"
        ?select="${args.select}"
        ?footersticky="${args.footersticky}"
        ?headersticky="${args.headersticky}"
        ?expandsticky="${args.expandsticky}"
        ?selectsticky="${args.selectsticky}"
        ?zebrastripes="${args.zebrastripes}"
        ?resetscrollonpagechange="${args.resetscrollonpagechange}"
        .caption="${args.caption}"
        .currentpage="${args.currentpage}"
        .columns="${args.columns}"
        .data="${args.data}"
        .datakey="${args.datakey}"
        .sortdefaultcolumnid="${args.sortdefaultcolumnid}"
        .sortdefaultdirection="${args.sortdefaultdirection}"
        .expandopened="${args.expandopened}"
        .expandpadding="${args.expandpadding}"
        .expandtriggerlabel="${args.expandtriggerlabel}"
        .fit="${args.fit}"
        .height="${args.height}"
        .horizontallinestyle="${args.horizontallinestyle}"
        .sortmanual="${args.sortmanual}"
        .outerborderstyle="${args.outerborderstyle}"
        .recordsperpage="${args.recordsperpage}"
        .selectalllabel="${args.selectalllabel}"
        .selected="${args.selected}"
        .selectlabel="${args.selectlabel}"
        .verticalalign="${args.verticalalign}"
        .verticallinestyle="${args.verticallinestyle}"
        .hidecolumns="${args.hidecolumns}"
        .stateslotheight="${args.stateslotheight}"
        @sortchange="${(event) => action('sortchange')(event.detail)}"
        @selectchange="${(event) => action('selectchange')(event.detail)}"
        @expandchange="${(event) => action('expandchange')(event.detail)}"
        @hidecolumnschange="${(event) => action('hidecolumnschange')(event.detail)}"
        @rowclick="${(event) => action('rowclick')(event.detail)}"
        @rowmouseenter="${(event) => action('rowmouseenter')(event.detail)}"
        @rowmouseleave="${(event) => action('rowmouseleave')(event.detail)}"
        @rowselected="${(event) => action('rowselected')(event.detail)}"
        @rowdeselected="${(event) => action('rowdeselected')(event.detail)}"
        @rowexpanded="${(event) => action('rowexpanded')(event.detail)}"
        @rowcollapsed="${(event) => action('rowcollapsed')(event.detail)}"
        >${unsafeHTML(slot)}
      </mc-table>
    </div>
    ${renderCodePreview(code, context)} `;
};
