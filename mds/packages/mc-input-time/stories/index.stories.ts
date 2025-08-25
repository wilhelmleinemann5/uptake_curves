import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Input Time/Documentation',
  component: 'mc-input-time',
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
  const code = generateCode('mc-input-time', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-input-time
      ?clearbutton="${args.clearbutton}"
      ?disabled="${args.disabled}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?invalid="${args.invalid}"
      ?keepclearbuttonvisible="${args.keepclearbuttonvisible}"
      ?loading="${args.loading}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      .autocomplete="${args.autocomplete}"
      .customize="${args.customize}"
      .customstyles="${args.customstyles}"
      .disable="${args.disable}"
      .errormessage="${args.errormessage}"
      .fit="${args.fit}"
      .format="${args.format}"
      .hint="${args.hint}"
      .hourstep="${args.hourstep}"
      .minutestep="${args.minutestep}"
      .id="${args.id}"
      .labelposition="${args.labelposition}"
      .icon="${args.icon}"
      .max="${args.max}"
      .min="${args.min}"
      .placeholder="${args.placeholder}"
      ?preselectcurrenttime="${args.preselectcurrenttime}"
      .timepickerposition="${args.timepickerposition}"
      .prefix="${args.prefix}"
      .startofweek="${args.startofweek}"
      .suffix="${args.suffix}"
      .type="${args.type}"
      .value="${args.value}"
      .variant="${args.variant}"
      .width="${args.width}"
      @blur="${(event) => action('blur')(event.target.value)}"
      @focus="${(event) => action('focus')(event.target.value)}"
      @input="${(event) => action('input')(event.target.value)}"
      @click="${(event) => action('click')(event.target.value)}"
      @keydown="${(event) => action('keydown')(event.key)}"
      name="departureTime"
      .label="${args.label}"
    ></mc-input-time>
    ${renderCodePreview(code, context)}`;
};
