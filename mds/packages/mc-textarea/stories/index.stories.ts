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
  title: 'Components/Textarea/Documentation',
  component: 'mc-textarea',
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
  const code = generateCode('mc-textarea', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px;">
      <mc-textarea
        name="comment"
        .hint="${args.hint}"
        .label="${args.label}"
        .labelposition="${args.labelposition}"
        .id="${args.id}"
        ?hiddenlabel="${args.hiddenlabel}"
        .placeholder="${args.placeholder}"
        .maxlength="${args.maxlength && args.maxlength !== '' ? args.maxlength : null}"
        .fit="${args.fit}"
        .rows="${args.rows}"
        ?invalid="${args.invalid}"
        .errormessage="${args.errormessage}"
        .width="${args.width}"
        ?autofocus="${args.autofocus}"
        ?disabled="${args.disabled}"
        ?readonly="${args.readonly}"
        ?required="${args.required}"
        @input="${(event) => action('input')(event.target.value)}"
        @focus="${(event) => action('focus')(event.target.value)}"
        @blur="${(event) => action('blur')(event.target.value)}"
        @click="${(event) => action('click')(event.target.value)}"
        @keydown="${(event) => action('keydown')(event.target.value)}"
      ></mc-textarea>
    </div>
    ${renderCodePreview(code, context)} `;
};
