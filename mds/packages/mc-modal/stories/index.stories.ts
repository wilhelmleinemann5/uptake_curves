import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import {
  getDefaultValues,
  renderHostStyles,
  generateCode,
  generateThemeSelector,
  renderCodePreview,
} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';
import { IMcModal } from '../src/lib/types';

export default {
  title: 'Components/Modal/Documentation',
  component: 'mc-modal',
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
  const mdsDocsHideFooter = urlParams.get('mdsdocshidefooter');

  const slot = `${
    mdsDocsHideFooter !== 'true'
      ? `<mc-button slot="primaryAction" appearance="primary" fit="${args.fit}" dialogaction="ok">OK</mc-button>
    <mc-button slot="secondaryAction" appearance="neutral" variant="filled" dialogaction="cancel" fit="${args.fit}">Cancel</mc-button>`
      : ''
  }`;
  const code = generateCode('mc-modal', argTypes, args, slot);
  const toggleModal = () => {
    const mcModal: IMcModal = document.body.querySelector('mc-modal') as IMcModal;
    mcModal.open = true;
  };
  const onClosed = (event) => {
    action('modal is closed')(`modal is closed by: "${event.detail.action}" action`);
  };
  const onClosing = (event) => {
    action('modal is closing')(`modal is closing by: "${event.detail.action}" action`);
  };
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${renderHostStyles('mc-modal')}
      <mc-button variant="plain" appearance="neutral" trailingicon="mouse" @click="${toggleModal}" .fit="${args.fit}"
        >Click to see modal</mc-button
      >
      <mc-modal
        .heading="${args.heading}"
        .zindex=${args.zindex}
        .dimension="${args.dimension}"
        .width="${args.width}"
        .height="${args.height}"
        .fit="${args.fit}"
        .padding="${args.padding}"
        ?hiddenclose="${args.hiddenclose}"
        ?open="${args.open}"
        ?backdropcloseactiondisabled="${args.backdropcloseactiondisabled}"
        ?escapecloseactiondisabled="${args.escapecloseactiondisabled}"
        ?entercloseactiondisabled="${args.entercloseactiondisabled}"
        @closed=${onClosed}
        @closing=${onClosing}
        @opened=${action('modal is opened')}
        @opening=${action('modal is opening')}
        @click=${action('modal is clicked')}
      >
        <span class="mds-text--${args.fit}-normal"> ${args.body ? unsafeHTML(args.body) : null} </span>
        ${unsafeHTML(slot)}
      </mc-modal>
    </div>
    ${renderCodePreview(code, context)} `;
};
