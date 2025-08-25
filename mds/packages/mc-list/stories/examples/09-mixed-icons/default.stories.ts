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
          <mc-list-item label="Apples" sublabel="Fruit" icon="apple"></mc-list-item>
          <mc-list-item label="Apricots" sublabel="Fruit" icon="empty"></mc-list-item>
          <mc-list-item label="Oranges" sublabel="Fruit" icon="lemon-slice"></mc-list-item>
          <hr />
          <mc-list-item label="Broccoli" sublabel="Vegetables"><span slot="icon">🥦</span></mc-list-item>
          <mc-list-item label="Carrots" sublabel="Vegetables" icon="carrot"></mc-list-item>
        </mc-list>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithIcons: StoryObj = {};
