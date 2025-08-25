import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Link Button/Examples',
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
        mc-link-button::part(button) {
          background-color: #40ab35;
          color: #ffffff;
        }
        mc-link-button::part(icon) {
          fill: #ffffff;
        }
        mc-link-button::part(text-and-icon-label) {
          width: 100%;
        }
        mc-link-button::part(text-and-icon-label):after {
          content: ' ...';
        }
      </style>
      <mc-link-button icon="star"><a href="http://maersk.com">Link button</a></mc-link-button>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
