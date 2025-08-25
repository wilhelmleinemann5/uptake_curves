import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Tabs/Tab Bar/Examples',
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
      <style>
        mc-tab-bar::part(tabs) {
          max-width: 300px;
        }
        mc-tab-bar::part(panels) {
          max-width: 300px;
        }
      </style>
      <div class="story">
        <mc-tab-bar>
          <!-- tab 0: -->
          <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
          <div slot="panel">Info page with lots of information about us.</div>
          <!-- tab 1: -->
          <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
          <div slot="panel">Work page that showcases our work.</div>
        </mc-tab-bar>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
