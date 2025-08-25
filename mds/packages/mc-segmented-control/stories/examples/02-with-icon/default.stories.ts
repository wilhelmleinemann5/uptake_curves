import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Segmented Control/Group/Examples',
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
        <mc-segmented-control type="single">
          <mc-segmented-control-item
            selected
            value="Computer"
            label="Computer"
            icon="computer"
          ></mc-segmented-control-item>
          <mc-segmented-control-item value="Printer" label="Printer" icon="printer"></mc-segmented-control-item>
          <mc-segmented-control-item value="File" label="File" icon="file"></mc-segmented-control-item>
          <mc-segmented-control-item value="Folder" label="Folder" icon="folder-open"></mc-segmented-control-item>
          <mc-segmented-control-item value="Office" label="Office" icon="office-2"></mc-segmented-control-item>
        </mc-segmented-control>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithIcon: StoryObj = {};
