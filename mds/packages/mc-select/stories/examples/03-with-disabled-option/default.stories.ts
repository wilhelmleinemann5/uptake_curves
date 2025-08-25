import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Select/Examples',
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
      <div class="story" style="max-width: 400px">
        <mc-select name="select" label="Select item">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3" disabled>Three</mc-option>
          <mc-option value="4">Four</mc-option>
        </mc-select>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithDisabledOption: StoryObj = {};
