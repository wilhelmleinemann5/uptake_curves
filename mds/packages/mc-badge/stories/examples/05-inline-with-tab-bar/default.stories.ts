import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Components/Badge/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-tab-bar>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"
          ><mc-badge slot="badge" position="left" display="inline" label="8"></mc-badge
        ></mc-tab>
        <div slot="panel">Work page that showcases our work.</div>
      </mc-tab-bar>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const InlineWithTabBar: StoryObj = {};
