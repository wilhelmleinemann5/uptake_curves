import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Button Group/Group/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-tag {
          margin-left: 8px;
        }
      </style>
      <div class="story">
        <mc-button-group selectiontype="single">
          <mc-button-group-item value="New">Hub <mc-tag label="New" appearance="info"></mc-tag></mc-button-group-item>
          <mc-button-group-item value="Export" label="Shipment overview - Export"></mc-button-group-item>
          <mc-button-group-item value="Import" label="Shipment overview - Import"></mc-button-group-item>
          <mc-button-group-item value="Inbound" label="All inbound"></mc-button-group-item>
          <mc-button-group-item value="MyFinance" label="MyFinance"></mc-button-group-item>
          <mc-button-group-item value="MaerskFlow"
            >Maersk Flow <mc-tag label="New" appearance="info"></mc-tag
          ></mc-button-group-item>
        </mc-button-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithTags: StoryObj = {};
