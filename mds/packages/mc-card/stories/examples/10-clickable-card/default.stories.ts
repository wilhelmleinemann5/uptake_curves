import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Card/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: false },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-card
        heading="Supply Chain and Logistics"
        subheading="Integrated logistics"
        footer="12 September 2022"
        image="/packages/mc-card/stories/images/supply-chain-logistics_illustration.svg"
        clickable
        @click="${(event) => {
          event.preventDefault();
          action('click')(event);
        }}"
        href="https://www.maersk.com"
        >We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping
        for you.
      </mc-card>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const ClickableCard: StoryObj = {};
