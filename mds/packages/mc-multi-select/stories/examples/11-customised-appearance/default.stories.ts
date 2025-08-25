import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Multi Select/Examples',
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
        mc-multi-select::part(label-container) {
          display: flex;
          justify-content: flex-end;
        }
        mc-multi-select::part(label) {
          color: #000000;
        }
        mc-multi-select::part(selected-option) {
          color: #000000;
        }
        mc-multi-select::part(popover-content) {
          box-shadow: none;
          z-index: 1000;
        }
      </style>
      <div class="input-container">
        <mc-multi-select label="Name">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5">Five</mc-option>
        </mc-multi-select>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
