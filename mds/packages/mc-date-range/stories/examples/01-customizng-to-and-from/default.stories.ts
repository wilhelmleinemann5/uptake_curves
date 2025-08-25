import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Date Range/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<mc-date-range>
        <mc-input-date slot="from" label="Check-in date"></mc-input-date>
        <mc-input-date slot="to" label="Check-out date">
          <span slot="hint"
            >Look at our <a target="_blank" href="https://designsystem.maersk.com">website</a> for available slots</span
          >
        </mc-input-date> </mc-date-range
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomizingBothToAndFromInputDates: StoryObj = {};
