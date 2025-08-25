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
      const modal = document.querySelector('mc-modal') as IMcModal;
      if (!modal) return;
      modal.open = !modal.open;
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-modal
        .width=${{
          sm: '100%',
          md: '400px',
          lg: '500px',
          xl: '600px',
        }}
        .height=${{
          sm: '100%',
          md: '400px',
          lg: '500px',
          xl: '600px',
        }}
      >
        <span slot="heading">Responsive modal</span>
        <div>This modal has responsive width and height based on breakpoints.</div>
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-modal>
      <mc-button style="width: fit-content;" @click=${toggleModal}>Open modal</mc-button>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const WidthAndHeightPerBreakpoint: StoryObj = {};
