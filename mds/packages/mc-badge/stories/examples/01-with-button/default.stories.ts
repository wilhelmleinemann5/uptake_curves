import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
      <mc-button label="You have notifications" icon="bell" hiddenlabel>
        <mc-badge slot="badge" position="top" display="pinned" variant="dot" distance="large"></mc-badge>
      </mc-button>
      <mc-button label="You have 9 notifications" icon="bell" hiddenlabel>
        <mc-badge slot="badge" position="top" display="pinned" label="9" distance="large"></mc-badge>
      </mc-button>
      <mc-button arialabel="You have new notifications">
        Notifications
        <mc-badge slot="badge" position="top" display="pinned" label="New" distance="large"></mc-badge>
      </mc-button>
      <mc-button appearance="neutral" variant="plain" icon="bell" label="You have notifications" hiddenlabel>
        <mc-badge slot="badge" position="top" display="pinned" variant="dot" distance="small"></mc-badge>
      </mc-button>
      <mc-button appearance="neutral" variant="plain" label="You have 9 notifications" icon="bell" hiddenlabel>
        <mc-badge slot="badge" position="top" display="pinned" label="9" distance="small"></mc-badge>
      </mc-button>
      <mc-button appearance="neutral" variant="plain" arialabel="You have new notifications">
        Notifications
        <mc-badge slot="badge" position="top" display="pinned" label="New" distance="medium"></mc-badge>
      </mc-button>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const WithButton: StoryObj = {};
