import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import {
  getDefaultValues,
  renderDialogFocusTrapBanner,
  renderHostStyles,
  generateCode,
  generateThemeSelector,
  renderCodePreview,
} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Drawer/Documentation',
  component: 'mc-drawer',
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
  const mdsDocsHideHeading = urlParams.get('mdsdocshideheading');
  const mdsDocsHideFooter = urlParams.get('mdsdocshidefooter');

  const mdsDocsTriggerLabel = urlParams.get('mdsdocstriggerlabel');
  const triggerLabel = mdsDocsTriggerLabel ? mdsDocsTriggerLabel : 'Click to see drawer';

  const slot = `
  ${
    mdsDocsHideHeading !== 'true'
      ? `
  <span slot="heading">Heading</span>`
      : ''
  }
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  ${mdsDocsHideFooter !== 'true' ? `<mc-button fit=${args.fit} slot="footer" dialogaction="close">Close</mc-button>` : ''}
`;
  const code = generateCode('mc-drawer', argTypes, args, slot);
  const toggleDrawer = () => {
    const drawer = document.querySelector('mc-drawer');
    if (!drawer) return;
    drawer.open = !drawer.open;
  };
  const onClosed = (event) => {
    action('drawer is closed')(`drawer is closed by: "${event.detail.action}" action`);
  };
  const onClosing = (event) => {
    action('drawer is closing')(`drawer is closing by: "${event.detail.action}" action`);
  };
  return html`${unsafeHTML(generateThemeSelector())} ${renderHostStyles('mc-drawer')}
    ${renderDialogFocusTrapBanner('drawer')}
    <mc-drawer
      .fit=${args.fit}
      .open=${args.open}
      .position=${args.position}
      .width=${args.width}
      .height=${args.height}
      .customsize=${args.customsize}
      .dimension=${args.dimension}
      ?disablestickyfooter=${args.disablestickyfooter}
      ?nonmodal=${args.nonmodal}
      ?nopadding=${args.nopadding}
      ?backdropcloseactiondisabled="${args.backdropcloseactiondisabled}"
      @closed=${onClosed}
      @closing=${onClosing}
      @opened=${action('drawer is opened')}
      @opening=${action('drawer is opening')}
      @click=${action('drawer is clicked')}
    >
      ${unsafeHTML(slot)}
    </mc-drawer>
    <mc-button
      style="width: fit-content;"
      @click=${toggleDrawer}
      trailingicon="mouse"
      variant="plain"
      appearance="neutral"
      >${triggerLabel}</mc-button
    >
    ${renderCodePreview(code, context)} `;
};
