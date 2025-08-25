import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcDialog } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Dialog/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const toggleDialog = () => {
      const mcDialog: IMcDialog = document.body.querySelector('mc-dialog') as IMcDialog;
      mcDialog.open = !mcDialog.open;
    };
    return html`${unsafeHTML(generateThemeSelector())} <mc-button @click="${toggleDialog}">Open</mc-button>
      <mc-dialog body="Are you sure you want to delete this item? This action cannot be undone.">
        <span slot="heading">
          Heading as HTML with custom
          <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/dialog/index.html"
            >link</a
          >
        </span>
        <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
        <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined"
          >Cancel</mc-button
        >
      </mc-dialog>
      ${renderCodePreview(preview, context)}`;
  },
};
export default meta;
export const HeadingAsSlot: StoryObj = {};
