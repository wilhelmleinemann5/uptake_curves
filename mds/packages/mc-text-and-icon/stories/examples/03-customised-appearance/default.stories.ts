import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Utility components/Text And Icon/Examples',
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
        mc-text-and-icon::part(text-and-icon) {
          gap: 24px;
        }
        mc-text-and-icon::part(icon) {
          fill: #767676;
        }
        mc-text-and-icon::part(text-and-icon-label) {
          width: 100%;
        }
        mc-text-and-icon::part(text-and-icon-label):after {
          content: ' ...';
        }
      </style>
      <mc-text-and-icon icon="apple" trailingicon="banana">
        <b>Fruits</b>
        <span slot="sublabel" class="mds-neutral--weak__text-color">Most common ones</span>
      </mc-text-and-icon>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
