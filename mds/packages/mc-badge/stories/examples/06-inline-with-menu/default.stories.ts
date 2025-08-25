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
      <mc-menu trigger="click">
        <mc-button slot="trigger" icon="bell" variant="plain" appearance="neutral" label="Notifications" hiddenlabel
          ><mc-badge slot="badge" position="top" variant="dot" distance="small"></mc-badge
        ></mc-button>
        <mc-list style="display:block; width: 120px">
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
          <mc-list-item label="Three"
            ><mc-badge slot="badge" position="right" display="inline" label="3"></mc-badge
          ></mc-list-item>
          <mc-list-item label="Four"></mc-list-item>
          <mc-list-item label="Five"></mc-list-item>
        </mc-list>
      </mc-menu>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const InlineWithMenu: StoryObj = {};
