import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { currentYear, currentMonthIndex, currentMonthFormat } from './dates';
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
        .customize=${[
          { date: `${currentYear}-${currentMonthFormat}-05`, disabled: true },
          { date: new Date(currentYear, currentMonthIndex, 12), disabled: true },
          {
            date: { from: new Date(currentYear, currentMonthIndex, 18), to: `${currentYear}-${currentMonthFormat}-22` },
            disabled: true,
          },
        ]}
      ></mc-input-date
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const DisableDatesUsingCustomize: StoryObj = {};
