import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Button/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html` ${unsafeHTML(generateThemeSelector())}<style>
        mc-button::part(button) {
          background-color: #40ab35;
          color: #ffffff;
        }
        mc-button::part(icon) {
          fill: #ffffff;
        }
        mc-button::part(text-and-icon-label) {
          width: 100%;
        }
        mc-button::part(text-and-icon-label):after {
          content: ' ...';
        }
      </style>
      <mc-button icon="star">Success</mc-button>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
