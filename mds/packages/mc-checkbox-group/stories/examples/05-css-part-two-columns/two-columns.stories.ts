import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-checkbox';

export default {
  title: 'Components/Checkbox Group/Examples',
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
      mc-checkbox-group::part(fieldset-container) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
      }
    </style>

    <mc-checkbox-group legend="Choose your favorite fruits" hint="Select one or more">
      <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
      <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
      <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
      <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
      <mc-checkbox name="fruits" value="Strawberry" label="Strawberry"></mc-checkbox>
      <mc-checkbox name="fruits" value="Mango" label="Mango"></mc-checkbox>
    </mc-checkbox-group>
    ${renderCodePreview(preview, context)} `;
};
