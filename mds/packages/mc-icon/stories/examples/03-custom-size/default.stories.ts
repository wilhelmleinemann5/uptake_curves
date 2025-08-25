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
        .size48::part(icon) {
          transform: scale(2);
        }
      </style>
      <div class="wrapper">
        <div class="box">
          <span>small - 16px</span>
          <mc-icon size="16" icon="heart"></mc-icon>
        </div>
        <div class="box">
          <span>small - 20px</span>
          <mc-icon icon="heart"></mc-icon>
        </div>
        <div class="box">
          <span>large - 24px</span>
          <mc-icon size="24" icon="heart"></mc-icon>
        </div>
        <div class="box">
          <span>custom width of 48px</span>
          <mc-icon class="size48" size="24" icon="heart"></mc-icon>
        </div>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const Sizes: StoryObj = {};
