import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/List/List/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<style>
        mc-tag {
          margin-left: 8px;
        }
      </style>
      <div class="story">
        <mc-list>
          <mc-list-item>Hub <mc-tag label="New" appearance="info"></mc-tag></mc-list-item>
          <hr />
          <mc-list-item label="Shipment overview - Export"></mc-list-item>
          <mc-list-item label="Shipment overview - Import"></mc-list-item>
          <mc-list-item label="All inbound"></mc-list-item>
          <mc-list-item label="MyFinance"></mc-list-item>
          <hr />
          <mc-list-item>Maersk Flow <mc-tag label="New" appearance="info"></mc-tag></mc-list-item>
        </mc-list>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithTags: StoryObj = {};
