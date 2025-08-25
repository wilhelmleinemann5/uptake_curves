import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
      <mc-list style="width: 200px">
        <mc-list-item label="One"></mc-list-item>
        <mc-list-item> Two </mc-list-item>
        <mc-list-item label="Three"></mc-list-item>
        <mc-list-item label="Four"
          ><mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge
        ></mc-list-item>
        <mc-list-item label="Five"></mc-list-item>
      </mc-list>
      <mc-list style="width: 200px">
        <mc-list-item sublabel="You have new messages">
          Inbox
          <mc-badge variant="default" slot="badge" position="right" display="inline" label="6"></mc-badge
        ></mc-list-item> </mc-list
      ><mc-list style="width: 200px">
        <mc-list-item label="One"></mc-list-item>
        <mc-list-item>
          Two
          <mc-badge variant="dot" slot="badge" position="right" display="inline"></mc-badge
        ></mc-list-item>
        <mc-list-item label="Three"></mc-list-item>
        <mc-list-item label="Four"></mc-list-item>
        <mc-list-item label="Five"></mc-list-item>
      </mc-list>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const InlineWithList: StoryObj = {};
