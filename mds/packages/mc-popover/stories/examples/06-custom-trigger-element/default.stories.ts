import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-input';
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
    let popover;
    let triggerContainer;
    let trigger;
    setTimeout(() => {
      popover = document.querySelector('mc-popover');
      triggerContainer = document.querySelector('#trigger-input');
      trigger = triggerContainer.shadowRoot.querySelector('input');
      popover.customtriggerelement = trigger;
    }, 100);
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          justify-content: center;
          adjust-items: center;
          margin-top: 200px;
        }
        .content-wrapper {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }
      </style>
      <div class="wrapper">
        <mc-input id="trigger-input" label="Vesel capacity"></mc-input>
        <mc-popover trigger="click">
          <div class="content-wrapper">
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
export const CustomTriggerElement: StoryObj = {};
