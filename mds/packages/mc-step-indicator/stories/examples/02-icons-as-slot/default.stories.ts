import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Step Indicator/Group/Examples',
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
        .my-icon-completed::part(icon) {
          fill: white;
        }
        .my-icon-current::part(icon) {
          fill: #42b0d5;
        }
        .my-icon-pending::part(icon) {
          fill: #dbdbdb;
        }
      </style>
      <div style="height:200px; width: 400px">
        <mc-step-indicator>
          <mc-step-indicator-item state="completed" label="ETD">
            <span slot="icon"><mc-icon class="my-icon-completed" icon="clock"></mc-icon></span>
          </mc-step-indicator-item>
          <mc-step-indicator-item state="completed" label="Release Sent">
            <span slot="icon"><mc-icon class="my-icon-completed" icon="envelope"></mc-icon></span>
          </mc-step-indicator-item>
          <mc-step-indicator-item state="current" label="Carrier Released">
            <span slot="icon"><mc-icon class="my-icon-current" icon="vessel-front"></mc-icon></span>
          </mc-step-indicator-item>
          <mc-step-indicator-item label="ETA" state="pending">
            <span slot="icon"><mc-icon class="my-icon-pending" icon="clock"></mc-icon></span>
          </mc-step-indicator-item>
        </mc-step-indicator>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const IconAsSlot: StoryObj = {};
