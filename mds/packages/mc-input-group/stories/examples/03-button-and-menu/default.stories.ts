import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector, renderExperimentalBanner } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Experiments/Input Group/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())} ${renderExperimentalBanner()}
      <mc-input-group legend="Split button with dropdown" hiddenlegend>
        <mc-button appearance="neutral" label="Book shipment"></mc-button>
        <mc-menu trigger="click">
          <mc-button
            slot="trigger"
            icon="chevron-down"
            appearance="neutral"
            label="More options"
            hiddenlabel
          ></mc-button>
          <mc-list>
            <mc-list-item label="Request quote first"></mc-list-item>
            <mc-list-item label="Book with special requirements"></mc-list-item>
            <mc-list-item label="Schedule pickup"></mc-list-item>
          </mc-list>
        </mc-menu>
      </mc-input-group>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const ButtonAndMenu: StoryObj = {};
