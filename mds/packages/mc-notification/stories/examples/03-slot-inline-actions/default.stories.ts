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
      <style>
        .mc-notification__actions > *::after {
          content: '';
        }
      </style>
      <mc-notification
        appearance="info"
        body="The file has been deleted"
        icon="info-circle"
        verticalalign="middle"
        actionsposition="right"
        closable
      >
        <span slot="actions" class="mc-notification__actions">
          <mc-button variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
          <mc-button variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Save</mc-button>
        </span> </mc-notification
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const InlineButtonActions: StoryObj = {};
