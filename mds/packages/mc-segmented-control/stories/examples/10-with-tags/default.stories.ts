import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Segmented Control/Group/Examples',
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
        <mc-segmented-control selectiontype="single">
          <mc-segmented-control-item selected value="New"
            >Hub <mc-tag label="New" appearance="info"></mc-tag
          ></mc-segmented-control-item>
          <mc-segmented-control-item value="Export" label="Shipment overview - Export"></mc-segmented-control-item>
          <mc-segmented-control-item value="Import" label="Shipment overview - Import"></mc-segmented-control-item>
          <mc-segmented-control-item value="Inbound" label="All inbound"></mc-segmented-control-item>
          <mc-segmented-control-item value="MyFinance" label="MyFinance"></mc-segmented-control-item>
          <mc-segmented-control-item value="MaerskFlow"
            >Maersk Flow <mc-tag label="New" appearance="info"></mc-tag
          ></mc-segmented-control-item>
        </mc-segmented-control>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithTags: StoryObj = {};
