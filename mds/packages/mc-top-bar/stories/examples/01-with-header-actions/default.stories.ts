import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Layout & navigation/Top Bar/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-avatar {
          margin-left: 8px;
        }
      </style>
      <mc-top-bar
        product="Maersk Design System"
        productshort="MDS"
        href="https://designsystem.maersk.com"
        target="_blank"
        ><div slot="actions">
          <mc-menu trigger="click">
            <mc-button slot="trigger" icon="cog" variant="plain" appearance="neutral" fit="small" hiddenlabel
              >Menu
            </mc-button>
            <mc-list>
              <mc-list-item label="One"></mc-list-item>
              <mc-list-item label="Two"></mc-list-item>
              <mc-list-item label="Three"></mc-list-item>
              <mc-list-item label="Four"></mc-list-item>
              <mc-list-item label="Five"></mc-list-item>
            </mc-list>
          </mc-menu>
          <mc-avatar info="info" initials="JD" hiddentooltip fit="small" appearance="color-3"> </mc-avatar></div
      ></mc-top-bar>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const WithHeaderActions: StoryObj = {};
