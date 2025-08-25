import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Number Stepper/Documentation',
  component: 'mc-number-stepper',
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
  const code = generateCode('mc-number-stepper', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px;">
      <mc-number-stepper
        .label="${args.label}"
        ?readonly="${args.readonly}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?hiddenstepper="${args.hiddenstepper}"
        .placeholder="${args.placeholder}"
        .hint="${args.hint}"
        .min="${args.min}"
        .max="${args.max}"
        .step="${args.step}"
        .minuslabel="${args.minuslabel}"
        .pluslabel="${args.pluslabel}"
        .prefix="${args.prefix}"
        .suffix="${args.suffix}"
        .fit="${args.fit}"
        .width="${args.width}"
        .labelposition="${args.labelposition}"
        .id="${args.id}"
        @input="${(event) => action('input')(event.target.value)}"
        @focus="${(event) => action('focus')(event.target.value)}"
        @blur="${(event) => action('blur')(event.target.value)}"
        @keydown="${(event) => action('keydown')(event.key)}"
        name="containers"
        .value="${args.value}"
        ?invalid="${args.invalid}"
        .errormessage="${args.errormessage}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
      ></mc-number-stepper>
    </div>
    ${renderCodePreview(code, context)}`;
};
