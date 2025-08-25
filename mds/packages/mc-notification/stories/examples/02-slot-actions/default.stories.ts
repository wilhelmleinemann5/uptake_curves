import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Notification/Examples',
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
      <mc-notification appearance="error" heading="Heading">
        <span slot="actions" class="mc-notification__actions">
          <a class="mds-error--weak__on-background-color" href="http://designsystem.maersk.com">Maersk Design System</a>
          <a class="mds-error--weak__on-background-color" href="http://www.google.com">Google</a>
        </span> </mc-notification
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const ActionsAsSlot: StoryObj = {};
