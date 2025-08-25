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
      <style>
        mc-card::part(container) {
          border-color: #0073ab;
        }
        mc-card::part(image-container) {
          opacity: 0.5;
        }
        mc-card::part(content-container) {
          margin: 0;
          padding: 16px;
          background-color: #f7f7f7;
          border-radius: var(--mds_brand_border_x-large_radius);
        }
        mc-card::part(header-container) {
          color: #0073ab;
        }
        mc-card::part(body-container) {
          color: #00243d;
        }
        mc-card::part(footer-container) {
          color: #141414;
        }
        mc-card::part(actions-container) {
          margin-bottom: 0;
        }
      </style>
      <div>
        <div style="width: 370px;">
          <mc-card
            image="packages/mc-card/stories/images/supply-chain-logistics_illustration.svg"
            heading="Supply Chain and Logistics"
            subheading="Integrated logistics"
            body="We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you."
            footer="12 September 2022"
            variant="bordered"
            orientation="vertical"
            fit="medium"
          >
            <div slot="actions" style="display:flex; justify-content: space-between;">
              <mc-button label="Action button" appearance="neutral" variant="filled" fit="medium"></mc-button>
              <mc-button icon="heart" appearance="neutral" variant="filled" hiddenlabel fit="medium"></mc-button>
            </div>
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
