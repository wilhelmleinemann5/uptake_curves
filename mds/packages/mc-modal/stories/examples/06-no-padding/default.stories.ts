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
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .container {
          display: flex;
          flex-grow: 1;
        }
        .image {
          width: 50%;
          background-color: var(--mds_brand_appearance_primary_weak_background-color);
          display: flex;
          justify-content: center;
          border-radius: 6px 0 0 6px;
        }
        .image img {
          width: 90%;
        }
        .content {
          width: 50%;
          padding: 0 20px 40px 20px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      </style>
      <mc-button @click="${toggleModal}">Open</mc-button>
      <mc-modal padding="none">
        <div class="container">
          <div class="image">
            <img src="./hero.svg" />
          </div>
          <div class="content">
            <h3>About v2</h3>
            <p>The Maersk Design System has released its v2 with official support for multiple Maersk brand themes .</p>
            <p>
              It also includes a Figma component rebuild, CSS parts customisation, enhanced CSS foundations and more. We
              need your help to try out the new release and provide feedback as we move into 2023.
            </p>
            <mc-button fit="small" appearance="neutral" href="https://designsystem.maersk.com" target="_blank"
              >Read all about the release</mc-button
            >
          </div>
        </div>
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithoutPaddingAndFooter: StoryObj = {};
