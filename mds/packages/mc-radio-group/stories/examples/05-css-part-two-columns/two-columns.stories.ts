import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-radio';

export default {
  title: 'Components/Radio Group/Examples',
  parameters: {
    docs: {
      source: {
        code: preview,
      },
    },
  },
};

export const TwoColumnLayout = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    <style>
      mc-radio-group::part(fieldset-container) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
      }
    </style>

    <mc-radio-group legend="Choose a shipping option" hint="Select one option">
      <mc-radio name="shipping" value="Standard" label="Standard (3-5 days)"></mc-radio>
      <mc-radio name="shipping" value="Express" label="Express (1-2 days)"></mc-radio>
      <mc-radio name="shipping" value="Overnight" label="Overnight"></mc-radio>
      <mc-radio name="shipping" value="PickUp" label="In-store pickup"></mc-radio>
      <mc-radio name="shipping" value="International" label="International"></mc-radio>
      <mc-radio name="shipping" value="Special" label="Special handling"></mc-radio>
    </mc-radio-group>
    ${renderCodePreview(preview, context)} `;
};
