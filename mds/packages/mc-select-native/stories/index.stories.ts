import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../src/index';

export default {
  title: 'Components/Select Native/Documentation',
  component: 'mc-select-native',
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
  const code = generateCode('mc-select-native', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px;">
      <mc-select-native
        name="number"
        .label="${args.label}"
        .hint="${args.hint}"
        .width="${args.width}"
        .fit="${args.fit}"
        ?hiddenlabel="${args.hiddenlabel}"
        .options="${args.options}"
        .placeholder="${args.placeholder}"
        .variant="${args.variant}"
        .value="${args.value}"
        .selectedindex="${args.selectedindex}"
        .id="${args.id}"
        .labelposition="${args.labelposition}"
        ?invalid="${args.invalid}"
        .errormessage="${args.errormessage}"
        ?disabled="${args.disabled}"
        @change="${(event) => action('change')(event.detail)}"
        ?required="${args.required}"
      ></mc-select-native>
    </div>
    ${renderCodePreview(code, context)} `;
};
