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
      <mc-tab-bar>
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab> </mc-tab-bar
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithoutPanelSlot: StoryObj = {};
