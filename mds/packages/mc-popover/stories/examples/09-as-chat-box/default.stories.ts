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
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 1000;
        }
        .chat-box {
          padding: 16px;
          width: 400px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      </style>
      <div class="wrapper">
        <mc-popover trigger="manual" open position="bottom-right">
          <div slot="trigger"></div>
          <div class="chat-box">
            <h5>Contact Us</h5>
            <p>Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.</p>
            <div class="form">
              <mc-textarea label="Type your message" hiddenlabel placeholder="Write a message" icon="comment">
              </mc-textarea>
              <mc-button icon="envelope"> Send </mc-button>
            </div>
          </div>
        </mc-popover>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const AsChatBox: StoryObj = {};
