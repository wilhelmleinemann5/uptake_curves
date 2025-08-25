import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../src/index';
import cardImage1File from '../../images/supply-chain-logistics_illustration.svg';
import cardImage2File from '../../images/transportation-services_illustration.svg';
import cardImage3File from '../../images/digital-solutions_illustration.svg';

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
        <div style="display: flex; align-items: stretch;">
          <mc-card
            .image="${cardImage1File}"
            heading="First card"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nibh praesent tristique magna. Nunc aliquet bibendum enim facilisis gravida neque convallis. Sed faucibus turpis in eu mi bibendum. Ut lectus arcu bibendum at."
            footer="September 21"
            style="width: 280px; margin-right: 24px;"
          >
            <mc-button label="Action button" appearance="neutral" variant="filled" slot="actions"></mc-button>
          </mc-card>
          <mc-card
            .image="${cardImage2File}"
            heading="Second card"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in ornare quam."
            footer="September 21"
            style="width: 280px; margin-right: 24px;"
          >
            <mc-button
              label="Action button"
              appearance="neutral"
              variant="filled"
              icon="heart"
              hiddenlabel
              slot="actions"
            ></mc-button>
          </mc-card>
          <mc-card
            .image="${cardImage3File}"
            heading="Third card"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            footer="September 21"
            style="width: 280px;"
            href="https://www.google.com"
            target="_blank"
          >
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const VerticalStretch: StoryObj = {};
