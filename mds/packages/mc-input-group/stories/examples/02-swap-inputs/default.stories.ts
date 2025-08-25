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
  render: (args: Args, context: StoryContext) => {
    const swapInputs = () => {
      const inputGroup = document.querySelector('mc-input-group');
      if (inputGroup) {
        const inputs = inputGroup.querySelectorAll('mc-input');
        if (inputs.length === 2) {
          const [firstInput, secondInput] = inputs;

          // Swap placeholders
          const firstPlaceholder = firstInput.getAttribute('placeholder');
          const secondPlaceholder = secondInput.getAttribute('placeholder');
          firstInput.setAttribute('placeholder', secondPlaceholder || '');
          secondInput.setAttribute('placeholder', firstPlaceholder || '');

          // Swap values
          const firstValue = firstInput.value;
          const secondValue = secondInput.value;
          firstInput.value = secondValue;
          secondInput.value = firstValue;
        }
      }
    };

    return html`${unsafeHTML(generateThemeSelector())} ${renderExperimentalBanner()}

      <style>
        mc-input {
          width: 200px;
        }
      </style>
      <mc-input-group legend="Search" hiddenlegend disableinnerborder>
        <mc-input label="Input Label1" placeholder="name" hiddenlabel></mc-input>
        <mc-button
          appearance="neutral"
          label="search"
          hiddenlabel
          icon="arrows-left-right"
          @click="${swapInputs}"
        ></mc-button>
        <mc-input label="Input Label2" placeholder="surname" hiddenlabel></mc-input>
      </mc-input-group>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const SwapInputsNoBorder: StoryObj = {};
