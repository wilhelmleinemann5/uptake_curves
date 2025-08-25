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
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        .col {
          display: flex;
          gap: 0.5em;
        }
      </style>
      <div class="col">
        <mc-tag appearance="success"><span slot="icon">✨</span>Success</mc-tag>
        <mc-tag appearance="info"><span slot="trailingicon">❤️</span>Success</mc-tag>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const IconAsSlot: StoryObj = {};
