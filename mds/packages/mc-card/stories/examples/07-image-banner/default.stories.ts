import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../src/index';
import cardImage1File from '../../images/supply-chain-logistics_illustration.svg';
import cardBannerImage from '../../images/community-card-banner.svg';

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
        <div style="width: 370px;">
          <mc-card
            style="position: relative;"
            .image="${cardImage1File}"
            heading="First card"
            footer="September 21"
            style="width: 280px; margin-right: 24px;"
          >
            <div>
              <img
                src="${cardBannerImage}"
                style="width: 66px; height: 66px; position: absolute; top: 0; left: 0; border-top-left-radius: 6px; pointer-events: none;"
              />
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Aliquet nibh praesent tristique magna. Nunc aliquet bibendum enim facilisis gravida
                neque convallis. Sed faucibus turpis in eu mi bibendum. Ut lectus arcu bibendum at.</span
              >
            </div>
            <mc-button label="Action button" appearance="neutral" variant="filled" slot="actions"></mc-button>
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const ImageBanner: StoryObj = {};
