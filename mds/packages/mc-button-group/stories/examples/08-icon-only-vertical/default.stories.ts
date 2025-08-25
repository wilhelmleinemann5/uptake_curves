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
        <mc-button-group selectiontype="single" orientation="vertical">
          <mc-button-group-item hiddenlabel value="Apples" label="Apples" icon="apple"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Bananas" label="Bananas" icon="banana"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Carrots" label="Carrots" icon="carrot"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Lemons" label="Lemons" icon="lemon"></mc-button-group-item>
        </mc-button-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const VerticalIconOnly: StoryObj = {};
