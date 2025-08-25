import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Menu/Examples',
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
        mc-button::part(trailing-icon) {
          transform: rotate(0deg);
          transition: transform 350ms ease-in-out;
        }
        mc-menu[open] mc-button::part(trailing-icon) {
          transform: rotate(-180deg);
        }
      </style>
      <div class="story">
        <mc-menu>
          <mc-button slot="trigger" variant="plain" trailingicon="chevron-down"> Options </mc-button>
          <mc-list>
            <mc-list-item label="Settings"></mc-list-item>
            <mc-list-item label="My Account"></mc-list-item>
          </mc-list>
        </mc-menu>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithRotatingIcon: StoryObj = {};
