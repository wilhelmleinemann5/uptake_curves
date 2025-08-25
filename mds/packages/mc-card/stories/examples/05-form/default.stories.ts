import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Card/Examples',
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
      <div>
        <div style="width: 400px;">
          <mc-card>
            <div style="min-width: 320px; display: flex; flex-direction: column; gap: 16px;">
              <div><mc-input label="Vessel name"></mc-input></div>
              <div><mc-input-date label="Date from"></mc-input-date></div>
            </div>
            <div slot="actions">
              <mc-button label="Search" appearance="primary" variant="filled" width="full-width"></mc-button>
            </div>
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const Form: StoryObj = {};
