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
        <mc-button-group selectiontype="single">
          <mc-button-group-item value="Apple"> Apple </mc-button-group-item>
          <mc-button-group-item value="Apricot"> Apricot </mc-button-group-item>
          <mc-button-group-item value="Artichoke"> Artichoke </mc-button-group-item>
        </mc-button-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelAsSlot: StoryObj = {};
