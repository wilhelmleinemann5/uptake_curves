import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/List/List/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <div class="story">
        <mc-list>
          <mc-list-item label="Apples" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Apricots" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Artichokes" sublabel="Vegetables"></mc-list-item>
          <hr />
          <mc-list-item label="Carrots" sublabel="Vegetables"></mc-list-item>
          <hr />
          <mc-list-item label="Cherries" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Onions" sublabel="Vegetables"></mc-list-item>
        </mc-list>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithSeparators: StoryObj = {};
