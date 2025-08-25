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
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-badge::part(badge) {
          top: 2px;
          right: 2px;
        }
      </style>
      <mc-button variant="plain" appearance="neutral" label="Notifications" icon="calendar" hiddenlabel>
        <mc-badge display="pinned" position="top" slot="badge" label="9" distance="medium"></mc-badge>
      </mc-button>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomizedAppearance: StoryObj = {};
