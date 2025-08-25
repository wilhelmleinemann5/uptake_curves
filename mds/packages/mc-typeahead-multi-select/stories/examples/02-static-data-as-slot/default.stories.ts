import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import icons from '@maersk-global/icons/metadata/metadata.json';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Typeahead Multi Select/Examples',
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
      <div style="width: 400px;">
        <mc-typeahead-multi-select
          name="typeahead"
          label="Icon (multi selection)"
          clearbutton
          placeholder="Start typing icon name or category"
          >${icons.map((icon) => {
            return html`<mc-option value="${icon.name}">
              <mc-icon icon="${icon.name}"></mc-icon>&nbsp;<b>${icon.name}</b>
              <span slot="sublabel"><i>${icon.tags.join(', ')}</i></span>
            </mc-option>`;
          })}</mc-typeahead-multi-select
        >
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const StaticDataAsSlot: StoryObj = {};
