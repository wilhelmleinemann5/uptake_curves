import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import {
  getDefaultValues,
  generateCode,
  generateThemeSelector,
  renderCodePreview,
  renderExperimentalBanner,
} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../src/index.ts';

export default {
  title: 'Experiments/Input Group/Documentation',
  component: 'mc-input-group',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const slot = `<mc-select hiddenlabel label="country code" placeholder="+40">
    <mc-option value="+40">+40</mc-option>
    <mc-option value="+44">+44</mc-option>
    <mc-option value="+45">+45</mc-option>
  </mc-select>
  <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>`;
  
  const code = generateCode('mc-input-group', argTypes, args, slot);
  
  return html`
    <style>
      mc-select {
        width: 75px;
      }
      mc-input {
        width: 252px;
      }
    </style>
    ${unsafeHTML(generateThemeSelector())} ${renderExperimentalBanner()}
    <div style="min-width: 300px;">
      <mc-input-group
        .fit=${args.fit}
        .legend="${args.legend}"
        ?hiddenlegend="${args.hiddenlegend}"
        ?disableinnerborder="${args.disableinnerborder}"
      >
        ${unsafeHTML(slot)}
      </mc-input-group>
    </div>
    ${renderCodePreview(code, context)}
  `;
};
