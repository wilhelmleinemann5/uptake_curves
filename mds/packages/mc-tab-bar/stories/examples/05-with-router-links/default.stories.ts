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
  render: (args: Args, context: StoryContext) => {
    let currentIndex = 0;
    if (window.location.hash) {
      switch (window.location.hash) {
        case '#info':
          currentIndex = 0;
          break;
        case '#prices':
          currentIndex = 1;
          break;
        case '#overdue':
          currentIndex = 2;
          break;
        default:
          currentIndex = 0;
      }
    }

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-tab-bar currentindex=${currentIndex}>
        <!-- tab 0: -->
        <mc-tab slot="tab" icon="info-circle"><a href="#info" target="_blank">Info</a></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab"><a href="#prices" target="_blank">Prices</a></mc-tab>
        <div slot="panel">Prices info</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" trailingicon="exclamation-triangle"><a href="#overdue" target="_blank">Overdue</a></mc-tab>
        <div slot="panel">Overdue info</div>
        <!-- tab 3: -->
        <mc-tab slot="tab" disabled><a href="#contact" target="_blank">Contact</a></mc-tab>
        <div slot="panel">Contact info</div></mc-tab-bar
      >
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithRouterLinks: StoryObj = {};
