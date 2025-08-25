import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { action } from 'storybook/actions';
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
    const goBack = () => {
      action('go back button')('callback function called on click, modal closing');
      toggleModal();
    };
    return html`${unsafeHTML(generateThemeSelector())} <mc-button @click="${toggleModal}">Open</mc-button>
      <mc-modal heading="Heading">
        <p>
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p>
        <mc-checkbox slot="footer" label="Lorem ipsum?"></mc-checkbox>
        <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
        <mc-button slot="secondaryAction" @click="${goBack}" appearance="neutral" variant="outlined">Go back</mc-button>
        <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined"
          >Cancel</mc-button
        >
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const MultipleActionButtons: StoryObj = {};
