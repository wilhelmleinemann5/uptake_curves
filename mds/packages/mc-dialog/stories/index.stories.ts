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
  title: 'Components/Dialog/Documentation',
  component: 'mc-dialog',
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
  const mdsDocsAppearance = urlParams.get('mdsdocsappearance') || 'light';
  const slot = `
    <mc-button slot="secondaryAction" appearance="neutral" dialogaction="cancel" fit="${args.fit}">Cancel</mc-button>
    <mc-button slot="primaryAction" dialogaction="ok" fit="${args.fit}">Yes, do something</mc-button>`;
  const code = generateCode('mc-dialog', argTypes, args, slot);
  const toggleDialog = () => {
    const dialog = document.querySelector('mc-dialog');
    if (!dialog) return;
    dialog.open = !dialog.open;
  };
  const onClosed = (event) => {
    action('dialog is closed')(`dialog is closed by: "${event.detail.action}" action`);
  };
  const onClosing = (event) => {
    action('dialog is closing')(`dialog is closing by: "${event.detail.action}" action`);
  };
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${renderHostStyles('mc-dialog')} ${renderDialogFocusTrapBanner('dialog')}
      <mc-dialog
        .fit=${args.fit}
        .heading=${args.heading}
        .body=${args.body}
        .open=${args.open}
        .width=${args.width}
        .zindex=${args.zindex}
        .dimension=${args.dimension}
        .escapecloseactiondisabled=${args.escapecloseactiondisabled}
        ?nonmodal=${args.nonmodal}
        ?nopadding=${args.nopadding}
        ?disablestickyfooter=${args.disablestickyfooter}
        @closed=${onClosed}
        @closing=${onClosing}
        @opened=${action('dialog is opened')}
        @opening=${action('dialog is opening')}
        @click=${action('dialog is clicked')}
      >
        ${unsafeHTML(slot)}
      </mc-dialog>
      <mc-button
        style="width: fit-content;"
        @click=${toggleDialog}
        trailingicon="mouse"
        variant="plain"
        appearance="neutral"
        >Click to open the dialog</mc-button
      >
    </div>
    ${renderCodePreview(code, context)}`;
};
