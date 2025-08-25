import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        mc-select::part(label) {
          width: 160px;
        }
        mc-select.text-align-right::part(label) {
          text-align: right;
        }
        @media screen and (max-width: 700px) {
          mc-select.text-align-right::part(label) {
            text-align: left;
          }
        }
      </style>
      <div class="container">
        <mc-select class="text-align-right" label="Name" labelposition="left">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5">Five</mc-option>
        </mc-select>
        <mc-select class="text-align-right" label="Long label text that goes over 1 line" labelposition="left">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5">Five</mc-option>
        </mc-select>
        <hr />
        <mc-select label="Name" labelposition="left">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5">Five</mc-option>
        </mc-select>
        <mc-select label="Long label text that goes over 1 line" labelposition="left">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5">Five</mc-option>
        </mc-select>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const LeftLabel: StoryObj = {};
