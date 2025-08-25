import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/List/List/Documentation',
  component: 'mc-list',
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
  const mdsDocsIconPlacement = urlParams.get('mdsdocsiconplacement');
  const mdsDocsSubLabels = urlParams.get('mdsdocssublabels');
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');

  const iconPlacement = mdsDocsIconPlacement == 'trailing' ? 'trailingicon' : 'icon';

  const badgeItem =
    mdsDocsWithBadge == 'true'
      ? `
  <mc-list-item ${iconPlacement}="printer"${mdsDocsSubLabels == 'true' ? 'sublabel="Actions"' : ''}>
    <span>Print</span>
    <mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge>
  </mc-list-item>`
      : `
  <mc-list-item label="Print" ${iconPlacement}="printer"${mdsDocsSubLabels == 'true' ? 'sublabel="Actions"' : ''}></mc-list-item>`;

  const slot = `
  <mc-list-item label="Back" ${iconPlacement}="arrow-left"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>
  <mc-list-item label="Forward" disabled ${iconPlacement}="arrow-right"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>
  <mc-list-item label="Reload" ${iconPlacement}="arrow-clockwise"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>
  <hr />
  <mc-list-item label="Save" ${iconPlacement}="floppy-disk"${mdsDocsSubLabels == 'true' ? 'sublabel="Actions"' : ''}></mc-list-item>
  ${badgeItem}`;
  const code = generateCode('mc-list', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px">
      <mc-list
        fit="${args.fit}"
        type="${args.type}"
        .value="${args.value}"
        aria-label="${args.arialabel}"
        ?noborder="${args.noborder}"
        .orientation="${args.orientation}"
        ?listsearch="${args.listsearch}"
        .listsearchplaceholder="${args.listsearchplaceholder}"
        .filtertype="${args.filtertype}"
        .customfilter="${args.customfilter}"
        ?matchlabelonly="${args.matchlabelonly}"
        @listchange="${(event) => action('listchange')(event.detail)}"
        @listitemsloaded="${(event) => action('listitemsloaded')(event.detail)}"
        @focuschange="${(event) => action('focuschange')(event.detail)}"
        @scroll="${(event) => action('scroll')(event.detail)}"
      >
        ${unsafeHTML(slot)}
      </mc-list>
    </div>
    ${renderCodePreview(code, context)} `;
};
