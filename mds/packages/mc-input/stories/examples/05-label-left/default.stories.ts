import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input/Examples',
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
        .container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        mc-input::part(label) {
          width: 160px;
        }
        mc-input.text-align-right::part(label) {
          text-align: right;
        }
        @media screen and (max-width: 700px) {
          mc-input.text-align-right::part(label) {
            text-align: left;
          }
        }
      </style>
      <div class="container">
        <mc-input class="text-align-right" label="Name" labelposition="left"></mc-input>
        <mc-input
          class="text-align-right"
          label="Long label text that goes over 1 line"
          labelposition="left"
        ></mc-input>
        <hr />
        <mc-input label="Name" labelposition="left"></mc-input>
        <mc-input label="Long label text that goes over 1 line" labelposition="left"></mc-input>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LeftLabel: StoryObj = {};
