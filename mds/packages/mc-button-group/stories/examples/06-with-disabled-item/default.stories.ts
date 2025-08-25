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
          <mc-button-group-item value="Zero" label="Zero"></mc-button-group-item>
          <mc-button-group-item value="One" disabled label="One"></mc-button-group-item>
          <mc-button-group-item value="Two" label="Two"></mc-button-group-item>
          <mc-button-group-item value="Three" label="Three"></mc-button-group-item>
          <mc-button-group-item value="Four" label="Four"></mc-button-group-item>
          <mc-button-group-item value="Five" label="Five"></mc-button-group-item>
        </mc-button-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithDisabledItem: StoryObj = {};
