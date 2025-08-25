import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Input/Documentation',
  component: 'mc-input',
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
  const code = generateCode('mc-input', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px;">
      <mc-input
        ?autofocus="${args.autofocus}"
        ?clearbutton="${args.clearbutton}"
        ?disabled="${args.disabled}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?invalid="${args.invalid}"
        ?keepclearbuttonvisible="${args.keepclearbuttonvisible}"
        ?loading="${args.loading}"
        ?readonly="${args.readonly}"
        ?required="${args.required}"
        .autocomplete="${args.autocomplete}"
        .errormessage="${args.errormessage}"
        .fit="${args.fit}"
        .hint="${args.hint}"
        .icon="${args.icon}"
        .id="${args.id}"
        .label="${args.label}"
        .labelposition="${args.labelposition}"
        .placeholder="${args.placeholder}"
        .prefix="${args.prefix}"
        .suffix="${args.suffix}"
        .trailingicon="${args.trailingicon}"
        .trailingiconlabel="${args.trailingiconlabel}"
        ?clickabletrailingicon="${args.clickabletrailingicon}"
        .type="${args.type}"
        .value="${args.value}"
        .variant="${args.variant}"
        .width="${args.width}"
        .mask="${args.mask}"
        @blur="${(event) => action('blur')(event.target.value)}"
        @clearbuttonclick="${(event) => action('clearbuttonclick')(event.target.value)}"
        @click="${(event) => action('click')(event.target.value)}"
        @focus="${(event) => action('focus')(event.target.value)}"
        @input="${(event) => action('input')(event.target.value)}"
        @trailingiconclick="${(event) => action('trailingiconclick')(event.target)}"
        @keydown="${(event) => action('keydown')(event.key)}"
        name="username"
      ></mc-input>
    </div>

    ${renderCodePreview(code, context)} `;
};
