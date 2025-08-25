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
    const hide = () => {
      const popoverElement = document.querySelector('mc-popover');
      popoverElement?.hide();
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          justify-content: center;
          adjust-items: center;
          margin-top: 200px;
        }
        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .close-button {
          align-self: flex-end;
        }
        .close-button::part(button) {
          padding: 0;
          width: auto;
        }
        .close-button::part(button):hover {
          background: transparent;
        }
      </style>
      <div class="wrapper">
        <mc-popover maxwidth="350px" open position="bottom-left">
          <mc-button slot="trigger" label="Click me"></mc-button>
          <div class="content">
            <mc-button
              hiddenlabel
              icon="times"
              variant="plain"
              appearance="neutral"
              label="close button"
              class="close-button"
              @click="${hide}"
            ></mc-button>
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
export const WithCloseButton: StoryObj = {};
