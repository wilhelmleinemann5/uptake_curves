import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import cardImage1File from '../../images/community.png';
import cardImage2File from '../../images/contribution-board.png';

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
        <div
          style="background-color: var(--mds_brand_appearance_neutral_default_background-color); padding: 24px; display: flex; gap: 24px; max-width: 1152px;"
        >
          <div style="width: 368px; background: #F5F5F5; border-radius: 8px;">
            <mc-card
              .image="${cardImage1File}"
              heading="Community"
              body="An open community for all Maersk employees who want to shape the future of the Maersk Design System."
              imagepercent="85"
              variant="borderless"
              href="https://designsystem.maersk.com/community/index.html"
              padding="40px"
            >
            </mc-card>
          </div>
          <div style="width: 368px; background: #F5F5F5; border-radius: 8px;">
            <mc-card
              .image="${cardImage2File}"
              heading="Contribution board"
              body="See what the community and MDS team are currently working on and explore new opportunities for contribution."
              imagepercent="85"
              variant="borderless"
              href="https://designsystem.maersk.com/community/contribution-board/index.html"
              padding="40px"
            >
            </mc-card>
          </div>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CallToAction: StoryObj = {};
