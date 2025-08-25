import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Number Stepper/Examples',
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
        mc-number-stepper::part(label) {
          width: 160px;
        }
        mc-number-stepper.text-align-right::part(label) {
          text-align: right;
        }
        @media screen and (max-width: 700px) {
          mc-number-stepper.text-align-right::part(label) {
            text-align: left;
          }
        }
      </style>
      <div class="container">
        <mc-number-stepper class="text-align-right" label="Number" labelposition="left"></mc-number-stepper>
        <mc-number-stepper
          class="text-align-right"
          label="Long label text that goes over 1 line"
          labelposition="left"
        ></mc-number-stepper>
        <hr />
        <mc-number-stepper label="Number" labelposition="left"></mc-number-stepper>
        <mc-number-stepper label="Long label text that goes over 1 line" labelposition="left"></mc-number-stepper>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelToTheLeft: StoryObj = {};
