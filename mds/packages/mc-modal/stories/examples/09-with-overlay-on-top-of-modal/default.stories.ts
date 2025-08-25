import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcModal } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Modal/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const toggleModal = () => {
      const mcModal: IMcModal = document.body.querySelector('mc-modal') as IMcModal;
      mcModal.open = true;
    };
    const triggerLoading = () => {
      const loader = document.body.querySelector('mc-dialog');
      loader.open = true;
      setTimeout(() => {
        loader.open = false;
      }, 3000);
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-dialog::part(dialog) {
          background-color: transparent;
          box-shadow: none;
          transition: none;
        }
      </style>
      <mc-button @click="${toggleModal}">Open</mc-button>
      <mc-modal zindex="0" heading="Heading">
        <mc-button @click="${triggerLoading}" appearance="neutral" variant="outlined"
          >Trigger loading overlay</mc-button
        >
        <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
        <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined"
          >Cancel</mc-button
        >
      </mc-modal>
      <mc-dialog zindex="1">
        <mc-loading-indicator></mc-loading-indicator>
      </mc-dialog>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithOverlayOnTopOfModal: StoryObj = {};
//
