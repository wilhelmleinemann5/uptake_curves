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
        .input-container {
          width: 150px;
        }
        mc-number-stepper::part(label-container) {
          display: flex;
          justify-content: flex-end;
        }
        mc-number-stepper::part(label) {
          color: #000000;
        }
        mc-number-stepper::part(input) {
          color: #000000;
        }
      </style>
      <div class="input-container">
        <mc-number-stepper label="Label text"></mc-number-stepper>
      </div>
      ${renderCodePreview(preview, context)} ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
