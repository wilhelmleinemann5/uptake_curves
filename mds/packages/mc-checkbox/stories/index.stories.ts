import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Checkbox/Documentation',
  component: 'mc-checkbox',
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
  const code = generateCode('mc-checkbox', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-checkbox
      id="test"
      name="${args.name}"
      value="yes"
      .label="${args.label}"
      .hint="${args.hint}"
      .fit="${args.fit}"
      .errormessage="${args.errormessage}"
      .checked="${args.checked}"
      .invalid="${args.invalid}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?disabled="${args.disabled}"
      .indeterminate="${args.indeterminate}"
      @click="${(event) => action('click')(event.target)}"
      @change="${(event) => action('change')(event.target.checked ? 'true' : 'false')}"
      @focus="${(event) => action('focus')(event.target)}"
      @blur="${(event) => action('blur')(event.target)}"
    ></mc-checkbox>
    ${renderCodePreview(code, context)}`;
};
