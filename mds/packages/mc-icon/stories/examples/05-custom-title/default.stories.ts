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
      <div class="wrapper">
        <div class="box">
          <span>The title on this icon reads "My empty heart"</span>
          <mc-icon color="red" icon="heart" title="My empty heart"></mc-icon>
        </div>
        <div class="box part">
          <span>The title for this icon reads "My heart is full"</span>
          <mc-icon color="red" icon="heart-solid" title="My heart is full"></mc-icon>
        </div>
        <p>
          If no title is provided, the name of the icon is used. Without that, a screen reader announces the icon as
          "image"
        </p>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomTitle: StoryObj = {};
