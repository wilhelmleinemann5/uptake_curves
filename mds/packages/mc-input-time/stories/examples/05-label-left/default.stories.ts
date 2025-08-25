import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input Time/Examples',
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
        mc-input-time::part(label) {
          width: 160px;
        }
        mc-input-time.text-align-right::part(label) {
          text-align: right;
        }
        @media screen and (max-width: 700px) {
          mc-input-time.text-align-right::part(label) {
            text-align: left;
          }
        }
      </style>
      <div class="container">
        <mc-input-time class="text-align-right" label="Departure" labelposition="left"></mc-input-time>
        <mc-input-time
          class="text-align-right"
          label="Long label text that goes over 1 line"
          labelposition="left"
        ></mc-input-time>
        <hr />
        <mc-input-time label="Departure" labelposition="left"></mc-input-time>
        <mc-input-time label="Long label text that goes over 1 line" labelposition="left"></mc-input-time>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelToTheLeft: StoryObj = {};
