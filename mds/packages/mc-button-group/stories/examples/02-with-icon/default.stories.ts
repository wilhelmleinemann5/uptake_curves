import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Button Group/Group/Examples',
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
      <div class="story">
        <mc-button-group selectiontype="multiple">
          <mc-button-group-item value="Computer" label="Computer" icon="computer"></mc-button-group-item>
          <mc-button-group-item value="Printer" label="Printer" icon="printer"></mc-button-group-item>
          <mc-button-group-item value="File" label="File" icon="file"></mc-button-group-item>
          <mc-button-group-item value="Folder" label="Folder" icon="folder-open"></mc-button-group-item>
          <mc-button-group-item value="Office" label="Office" icon="office-2"></mc-button-group-item>
        </mc-button-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithIcon: StoryObj = {};
