import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import icons from '@maersk-global/icons/metadata/metadata.json';

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
        <mc-typeahead
          label="Icon"
          clearbutton
          .data="${icons.map((icon) => ({
            label: icon.name,
            value: icon.name,
            icon: icon.name,
            sublabel: icon.tags.join(', '),
          }))}"
          matchlabelonly
          .customfilter="${(text, value) => (text.startsWith(value) ? text : null)}"
        >
        </mc-typeahead>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomFilterFunction: StoryObj = {};
