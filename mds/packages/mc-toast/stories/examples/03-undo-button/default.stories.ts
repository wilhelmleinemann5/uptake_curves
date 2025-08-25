import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcToast } from '../../../src/lib/types';

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
  render: (args: Args, context: StoryContext) => {
    const restoreFile = () => {
      alert('File has been restored');
      const mcToast: IMcToast = document.querySelector('mc-toast') as IMcToast;
      if (mcToast && typeof mcToast.hide === 'function') {
        mcToast.hide();
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-toast position="top-right" duration="10000" appearance="info">
        <mc-button icon="trash" label="Delete file" appearance="error" variant="outlined" slot="trigger"></mc-button>
        <mc-notification
          icon="info-circle"
          verticalalign="middle"
          actionsposition="right"
          body="The file has been deleted"
        >
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${restoreFile}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification> </mc-toast
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithUndoButton: StoryObj = {};
