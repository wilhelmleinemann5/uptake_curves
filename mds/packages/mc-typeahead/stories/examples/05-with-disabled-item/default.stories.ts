import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
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
      <div class="input-container">
        <mc-typeahead label="Name" clearbutton hint="Type 't'">
          <mc-option value="One">One</mc-option>
          <mc-option value="Two">Two</mc-option>
          <mc-option value="Three" disabled>Three</mc-option>
          <mc-option value="Four">Four</mc-option>
          <mc-option value="Five">Five</mc-option>
        </mc-typeahead>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const DisabledItem: StoryObj = {};
