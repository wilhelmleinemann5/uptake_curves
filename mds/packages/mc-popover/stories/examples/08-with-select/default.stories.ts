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
      <mc-popover>
        <mc-button slot="trigger" label="Click me"></mc-button>
        <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
          <mc-select label="Select a port">
            <mc-option value="CNSHA">Shanghai, China</mc-option>
            <mc-option value="SGSIN">Singapore</mc-option>
            <mc-option value="CNNBO">Ningbo-Zhoushan, China</mc-option>
            <mc-option value="CNSZX">Shenzhen, China</mc-option>
            <mc-option value="CNGZH">Guangzhou, China</mc-option>
            <mc-option value="KRPUS">Busan, South Korea</mc-option>
            <mc-option value="CNTAO">Qingdao, China</mc-option>
            <mc-option value="HKHKG">Hong Kong</mc-option>
          </mc-select>
          <mc-button label="Book"></mc-button>
        </div>
      </mc-popover>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithSelect: StoryObj = {};
