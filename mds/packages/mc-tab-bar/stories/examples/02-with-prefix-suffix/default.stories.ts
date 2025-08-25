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
        .prefix:before {
          content: '\\2713';
          display: inline-block;
          color: green;
          padding: 0 6px 0 0;
        }
      </style>
      <mc-tab-bar>
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Prices">
          <span class="prefix" slot="prefix">prefix</span>
          <span slot="suffix">$</span>
        </mc-tab>
        <div slot="panel">Prices info</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Overdue">
          <span slot="suffix"><mc-tag fit="small" label="3"></mc-tag></span>
        </mc-tab>
        <div slot="panel">Overdue info</div> </mc-tab-bar
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const PrefixAndSuffix: StoryObj = {};
