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
  title: 'Components/Radio/Documentation',
  component: 'mc-radio',
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
  const code = generateCode('mc-radio', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-radio
      name="${args.name}"
      value="yes"
      .label="${args.label}"
      .fit="${args.fit}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      @click="${(event) => action('click')(event.target)}"
      @change="${(event) => action('change')(event.target.checked ? 'true' : 'false')}"
      @focus="${(event) => action('focus')(event.target)}"
      @blur="${(event) => action('blur')(event.target)}"
    ></mc-radio>
    ${renderCodePreview(code, context)}`;
};
