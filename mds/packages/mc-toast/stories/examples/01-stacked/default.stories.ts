import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Toast/Examples',
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
        .wrapper {
          display: flex;
          gap: 16px;
        }
      </style>
      <div class="wrapper">
        <mc-toast appearance="success" position="top-right">
          <mc-button appearance="neutral" label="Success" slot="trigger"></mc-button>
          <mc-notification icon="check-circle" body="Toast message"></mc-notification>
        </mc-toast>
        <mc-toast appearance="warning" position="top-right">
          <mc-button appearance="neutral" label="Warning" slot="trigger"></mc-button>
          <mc-notification icon="exclamation-triangle" body="Toast message"></mc-notification>
        </mc-toast>
        <mc-toast appearance="error" position="top-right">
          <mc-button appearance="neutral" label="Error" slot="trigger"></mc-button>
          <mc-notification icon="exclamation-octagon" body="Toast message"></mc-notification>
        </mc-toast>
        <mc-toast appearance="info" position="top-right">
          <mc-button appearance="neutral" label="Info" slot="trigger"></mc-button>
          <mc-notification icon="info-circle" body="Toast message"></mc-notification>
        </mc-toast>
        <mc-toast appearance="neutral-default" position="top-right">
          <mc-button appearance="neutral" label="Neutral Default" slot="trigger"></mc-button>
          <mc-notification icon="cog" body="Toast message"></mc-notification>
        </mc-toast>
        <mc-toast appearance="neutral-inverse" position="top-right">
          <mc-button appearance="neutral" label="Neutral Inverse" slot="trigger"></mc-button>
          <mc-notification icon="moon" body="Toast message"></mc-notification>
        </mc-toast>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const StackedToast: StoryObj = {};
