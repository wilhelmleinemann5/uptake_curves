import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Tag/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<style>
        .col {
          display: flex;
          gap: 0.5em;
        }
        mc-tag::part(tag) {
          padding-left: 0;
        }
      </style>
      <div class="col">
        <mc-tag withaction fit="medium">
          <span slot="icon">
            <mc-avatar
              fit="x-small"
              info="avatar should be 24 x 24 is 24 x 24 (x-small)"
              initials="JD"
              appearance="color-1"
            ></mc-avatar>
          </span>
          Jane Doe
        </mc-tag>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithAvatar: StoryObj = {};
