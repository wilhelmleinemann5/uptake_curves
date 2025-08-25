import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { currentYear, currentMonthFormat } from './dates';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input Date/Examples',
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
      <div class="story-notification">
        <mc-notification class="light" heading="Disable dates" icon="">
          <span>
            <span
              >There are multiple ways of disabling the dates. You can use the <code>min</code>, <code>max</code> and
              <code>customize</code> attributes.</span
            >
            <br />
            <span class="mds-font--small--italic">Check 'Code Preview' below to see implementation.</span>
          </span>
        </mc-notification>
      </div>
      <mc-input-date
        value="${currentYear}-${currentMonthFormat}-10"
        label="Shipping day"
        hiddenlabel
        min="${currentYear}-${currentMonthFormat}-08"
        max="${currentYear}-${currentMonthFormat}-12"
      ></mc-input-date
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const DisableDatesUsingCallbackFunction: StoryObj = {};
