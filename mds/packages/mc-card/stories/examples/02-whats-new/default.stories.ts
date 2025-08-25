import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import cardImage1File from '../../images/whats-new-1.svg';
import cardImage2File from '../../images/whats-new-2.svg';
import cardImage3File from '../../images/whats-new-3.svg';
import cardImage4File from '../../images/whats-new-4.svg';
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
        <div
          style="display: grid; grid-template-columns: repeat(2, minmax(0px, 1fr)); gap: 24px; margin: 24px 0; max-width: 1152px;"
        >
          <mc-card
            style="height: 134px;"
            href="https://designsystem.maersk.com"
            .image="${cardImage1File}"
            heading="Summer lovin"
            footer="8 July 2022"
            contentalignment="middle"
            orientation="horizontal"
            imagepercent="24"
            fit="small"
            variant="bordered"
            padding="16px"
          >
          </mc-card>
          <mc-card
            style="height: 134px;"
            href="https://designsystem.maersk.com"
            .image="${cardImage2File}"
            heading="Tech Expo Copenhagen, Winners!"
            footer="16 June 2022"
            contentalignment="middle"
            orientation="horizontal"
            imagepercent="24"
            fit="small"
            variant="bordered"
            padding="16px"
          >
          </mc-card>
          <mc-card
            style="height: 134px;"
            href="https://designsystem.maersk.com"
            .image="${cardImage3File}"
            heading="New table component, font styles & optimised icon bundling"
            footer="15 June 2022"
            contentalignment="middle"
            orientation="horizontal"
            imagepercent="24"
            fit="small"
            variant="bordered"
            padding="16px"
          >
          </mc-card>
          <mc-card
            style="height: 134px;"
            href="https://designsystem.maersk.com"
            .image="${cardImage4File}"
            heading="Notification guidelines"
            footer="20 May 2022"
            contentalignment="middle"
            orientation="horizontal"
            imagepercent="24"
            fit="small"
            variant="bordered"
            padding="16px"
          >
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WhatsNew: StoryObj = {};
