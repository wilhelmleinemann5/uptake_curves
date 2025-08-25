import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { action } from 'storybook/actions';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Menu/Documentation',
  component: 'mc-menu',
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
  const isMDSDocs = urlParams.has('mdsdocs');
  const mdsDocsIconPlacement = urlParams.get('mdsdocsiconplacement');
  const mdsDocsSubLabels = urlParams.get('mdsdocssublabels');
  const mdsHideCode = urlParams.get('mdshidecode') || '{}';
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');

  const iconPlacement = mdsDocsIconPlacement == 'trailing' ? 'trailingicon' : 'icon';

  const margin = args.position.includes('top') ? (mdsDocsSubLabels == 'true' ? '180px' : '120px') : '0px';

  const menuWrapperStyle = isMDSDocs
    ? `display: flex; justify-content: center; adjust-items: center; ${mdsHideCode !== 'true' ? `margin-top: ${margin};` : `margin-top: ${margin}; margin-bottom: ${margin};`}}`
    : `display: flex; justify-content: center; adjust-items: center; margin-top: ${margin};`;

  const triggerEventLabel =
    args.trigger == 'contextmenu' ? 'Right click' : args.trigger.charAt(0).toUpperCase() + args.trigger.slice(1);

  const triggerButton = `<mc-button slot="trigger" icon="bars-horizontal" appearance="neutral" label="${triggerEventLabel} to show menu"></mc-button>`;

  const badgeItem =
    mdsDocsWithBadge == 'true'
      ? `<mc-list-item ${iconPlacement}="arrow-clockwise"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}>
      <span>Reload</span>
      <mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge>
    </mc-list-item>`
      : `<mc-list-item label="Reload" ${iconPlacement}="arrow-clockwise"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>`;

  const listItems = `<mc-list-item label="Back" ${iconPlacement}="arrow-left"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>
    <mc-list-item label="Forward" disabled ${iconPlacement}="arrow-right"${mdsDocsSubLabels == 'true' ? 'sublabel="Navigation"' : ''}></mc-list-item>
    ${badgeItem}`;

  const slot = `
  ${triggerButton}
  <mc-list @listchange="yourEventHandler(e)">
    ${listItems}
  </mc-list>`;

  const code = generateCode('mc-menu', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div class="story-notification">
      <mc-notification heading="Menu with list">
        <span
          >Check out the list component examples in Storybook to see the code and use cases of list that can be used
          within menu.</span
        >
      </mc-notification>
    </div>
    <div style="${menuWrapperStyle}">
      <mc-menu
        .arrow="${args.arrow}"
        .position="${args.position}"
        .maxwidth="${args.maxwidth}"
        .maxheight="${args.maxheight}"
        .zindex="${args.zindex}"
        ?open="${args.open}"
        .trigger="${args.trigger}"
        .fit="${args.fit}"
        ?noborder="${args.noborder}"
        ?contextmenuonside="${args.contextmenuonside}"
      >
        ${unsafeHTML(triggerButton)}
        <mc-list @listchange="${(event) => action('listchange')(event.detail)}"> ${unsafeHTML(listItems)} </mc-list>
      </mc-menu>
    </div>
    ${renderCodePreview(code, context)}`;
};
