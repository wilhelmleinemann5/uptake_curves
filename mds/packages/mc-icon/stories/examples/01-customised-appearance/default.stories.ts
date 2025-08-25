import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Icon/Examples',
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
        .wrapper {
          display: flex;
          gap: 1em;
        }
        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5em;
        }
        .part mc-icon::part(icon) {
          fill: green;
        }
      </style>
      <div class="wrapper">
        <div class="box">
          <span>Custom color by using a color property</span>
          <mc-icon color="#42b0d5" icon="heart-solid"></mc-icon>
        </div>
        <div class="box part">
          <span>Custom color by using a CSS part</span>
          <mc-icon icon="heart-solid"></mc-icon>
        </div>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
