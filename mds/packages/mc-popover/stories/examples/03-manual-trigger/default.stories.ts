import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-button';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Popover/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let popoverElement = null;
    window.addEventListener('DOMContentLoaded', () => {
      popoverElement = document.querySelector('mc-popover');
    });
    const show = () => {
      if (popoverElement?.open === true) {
        popoverElement?.hide();
      } else {
        popoverElement?.show();
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          justify-content: center;
          adjust-items: center;
          margin-top: 200px;
          gap: 48px;
        }
        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      </style>
      <div class="wrapper">
        <mc-button label="Open/close popover" @click="${show}"></mc-button>
        <mc-popover maxwidth="350px" trigger="manual" arrow position="bottom-left">
          <mc-icon slot="trigger" icon="info-circle"></mc-icon>
          <div class="content">
            <h3>Available capacity</h3>
            <span>This vessel has 50% capacity left.</span>
            <mc-button label="Book"></mc-button>
          </div>
        </mc-popover>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const ManualTrigger: StoryObj = {};
