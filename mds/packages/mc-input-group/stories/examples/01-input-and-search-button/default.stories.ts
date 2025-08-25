import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector, renderExperimentalBanner } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Experiments/Input Group/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())} ${renderExperimentalBanner()}
      <style>
        mc-input {
          width: 400px;
        }
      </style>
      <mc-input-group legend="Search" hiddenlegend disableinnerborder>
        <mc-input label="Input Label" placeholder="Search vessel" hiddenlabel></mc-input>
        <mc-button appearance="neutral" label="Search" icon="vessel-front"></mc-button>
      </mc-input-group>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const InputAndSearchNoBorder: StoryObj = {};
