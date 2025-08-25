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
      <div style="width: 500px">
        <mc-tab-bar>
          <!-- tab 0: -->
          <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
          <div slot="panel">Info page with lots of information about us.</div>
          <!-- tab 1: -->
          <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
          <div slot="panel">Work page that showcases our work.</div>
          <!-- tab 2: -->
          <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
          <div slot="panel">Hobby page that shows our interests.</div>
          <!-- tab 3: -->
          <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
          <div slot="panel">Contact page that shows our contacts.</div>
          <!-- tab 4: -->
          <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
          <div slot="panel">Address page that shows our addresses.</div>
        </mc-tab-bar>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const SmallViewport: StoryObj = {};
