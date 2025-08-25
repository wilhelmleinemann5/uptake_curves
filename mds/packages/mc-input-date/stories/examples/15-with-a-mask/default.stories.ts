import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
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
      <style>
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      </style>
      <div class="input-container">
        <mc-notification heading="Keeping the placeholder up to date">
          <p>
            If you want to dynamically change the <code>format</code> after the component was rendered, please also
            remember to update the placeholder.
          </p>
          <p>Input date will only set the placeholder during render(if no custom placeholder is provided).</p>
        </mc-notification>
        <mc-input-date
          label="Enter your birthday"
          hint="Use MM/DD/YYYY format"
          usemask
          format="MM/DD/YYYY"
        ></mc-input-date>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithAMask: StoryObj = {};
