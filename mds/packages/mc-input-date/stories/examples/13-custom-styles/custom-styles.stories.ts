import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
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
        <mc-notification class="light" heading="Custom styles" icon="">
          <span
            >It is possible to supply custom styles which will be scoped to the Input Date via the "customstyles"
            property. This is useful for defining styles that can then be used to customize date cells in the
            <code>customize</code> property.
            <br />
            <span class="mds-font--small--italic">Check 'Code Preview' below to see implementation.</span>
          </span>
        </mc-notification>
      </div>
      <p>
        Applying custom styles using <code>customize</code> and a callback function(disabling all weekends in the
        example).
      </p>
      <mc-input-date
        value="2022-08-17"
        label="Shipping day"
        hiddenlabel
        customstyles=".holiday mc-button::part(button){ color: green; font-weight: bold;}"
        .customize=${[{ date: (date) => date.getDay() === 6 || date.getDay() === 0, customClasses: ['holiday'] }]}
      ></mc-input-date
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomStyles: StoryObj = {};
