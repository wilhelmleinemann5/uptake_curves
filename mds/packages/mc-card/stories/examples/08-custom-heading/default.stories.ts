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
        .card-heading {
          margin: 0 0 20px;
        }
      </style>
      <div>
        <div style="width: 370px;">
          <mc-card image="packages/mc-card/stories/images/supply-chain-logistics_illustration.svg">
            <div>
              <h1 class="card-heading">Supply Chain and Logistics</h1>
              We focus on solving your supply chain needs from end to end, taking the complexity out of container
              shipping for you.
            </div>
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomHeading: StoryObj = {};
