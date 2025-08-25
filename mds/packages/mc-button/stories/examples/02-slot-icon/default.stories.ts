import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Button/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html` ${unsafeHTML(generateThemeSelector())}<style>
        .col {
          display: flex;
          gap: 0.5em;
        }
        .my-icon::part(icon) {
          fill: white;
        }
      </style>
      <div class="col">
        <mc-button appearance="neutral" label="Label"
          ><span slot="icon"><mc-icon icon="star"></mc-icon></span
        ></mc-button>
        <mc-button appearance="primary" label="Label"
          ><span slot="trailingicon"><mc-icon class="my-icon" icon="star"></mc-icon></span
        ></mc-button>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const IconAsASlot: StoryObj = {};
