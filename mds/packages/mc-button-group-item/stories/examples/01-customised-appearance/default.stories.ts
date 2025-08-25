import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Button Group/Item/Examples',
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
      <div class="story">
        <style>
          mc-button-group-item::part(button) {
            color: #40ab35;
          }
          mc-button-group-item::part(text-and-icon) {
            flex-direction: column;
          }
          mc-button-group-item::part(icon) {
            fill: #40ab35;
          }
        </style>
        <mc-button-group-item icon="apple">Apple </mc-button-group-item>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
