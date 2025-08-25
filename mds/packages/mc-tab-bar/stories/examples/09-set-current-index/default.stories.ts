import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { McTabBar } from '../../../src/index';

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
    let tab: Node;
    let panel: Node;
    let toggle = false;
    const setCurrentIndex = () => {
      const tabBar = document.getElementById('mcTabBar') as McTabBar;
      tabBar.currentindex = 2;
    };
    const toggleFirstTab = () => {
      toggle = !toggle;
      const tabBar = document.getElementById('mcTabBar') as McTabBar;
      if (toggle) {
        tab = tabBar.children[0];
        panel = tabBar.children[1];
        tabBar.removeChild(tab);
        tabBar.removeChild(panel);
      } else {
        tabBar.insertBefore(tab, tabBar.children[0]);
        tabBar.insertBefore(panel, tabBar.children[1]);
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-tab-bar id="mcTabBar">
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Prices"></mc-tab>
        <div slot="panel">Prices info</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Overdue"></mc-tab>
        <div slot="panel">Overdue info</div>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Overview"></mc-tab>
        <div slot="panel">Overview Info</div>
      </mc-tab-bar>
      <mc-button @click=${setCurrentIndex}>Set current index</mc-button>
      <mc-button @click=${toggleFirstTab}>Toggle first tab</mc-button>
      ${renderCodePreview(preview, context)} `;
  },
};
export default meta;
export const SetCurrentIndex: StoryObj = {};
