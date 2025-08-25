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
          <mc-list-item label="Red Heart"><span slot="icon">❤️</span></mc-list-item>
          <mc-list-item label="Sparkles"><span slot="icon">✨</span></mc-list-item>
          <mc-list-item label="Party Popper"><span slot="icon">🎉</span></mc-list-item>
          <mc-list-item label="Smiling Face with Hearts"><span slot="icon">🥰</span></mc-list-item>
          <mc-list-item label="Fire"><span slot="icon">🔥</span></mc-list-item>
          <mc-list-item label="Smiling Face with Smiling Eyes"><span slot="icon">😊</span></mc-list-item>
          <mc-list-item label="Pleading Face"><span slot="icon">🥺</span></mc-list-item>
          <mc-list-item label="Face with Tears of Joy"><span slot="icon">😂</span></mc-list-item>
        </mc-list>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithGraphics: StoryObj = {};
