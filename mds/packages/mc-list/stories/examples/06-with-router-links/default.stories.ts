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
          <mc-list-item label="List Item"></mc-list-item>
          <mc-list-item><a href="#page1">Page 1</a></mc-list-item>
          <mc-list-item trailingicon="file"><a href="#page2">Page 2</a></mc-list-item>
          <mc-list-item sublabel="Subpage 3" trailingicon="file"><a href="#page3">Page 3</a></mc-list-item>
          <mc-list-item sublabel="Subpage 4"><a href="#page4">Page 4</a></mc-list-item>
          <mc-list-item icon="computer"><a href="#page5">Page 5</a></mc-list-item>
          <mc-list-item sublabel="Subpage 6" icon="computer"><a href="#page6">Page 6</a></mc-list-item>
        </mc-list>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithRouterLinks: StoryObj = {};
