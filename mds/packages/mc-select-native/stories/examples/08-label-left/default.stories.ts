import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const options = [1, 2, 3, 4, 5, 6];
const meta: Meta = {
  title: 'Components/Select Native/Examples',
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
        .container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        mc-select-native::part(label) {
          width: 160px;
        }
        mc-select-native.text-align-right::part(label) {
          text-align: right;
        }
        @media screen and (max-width: 700px) {
          mc-select-native.text-align-right::part(label) {
            text-align: left;
          }
        }
      </style>
      <div class="container">
        <mc-select-native
          class="text-align-right"
          label="Number"
          labelposition="left"
          .options=${options}
        ></mc-select-native>
        <mc-select-native
          class="text-align-right"
          label="Long label text that goes over 1 line"
          labelposition="left"
          .options=${options}
        ></mc-select-native>
        <hr />
        <mc-select-native label="Number" labelposition="left" .options=${options}></mc-select-native>
        <mc-select-native
          label="Long label text that goes over 1 line"
          labelposition="left"
          .options=${options}
        ></mc-select-native>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelToTheLeft: StoryObj = {};
