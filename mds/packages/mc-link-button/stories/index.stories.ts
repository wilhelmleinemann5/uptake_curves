import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Link Button/Documentation',
  component: 'mc-link-button',
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
  const code = generateCode('mc-link-button', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-link-button
      .label="${args.label}"
      .variant="${args.variant}"
      .appearance="${args.appearance}"
      .fit="${args.fit}"
      .justifyitems="${args.justifyitems}"
      .padding="${args.padding}"
      width="${args.width}"
      ?loading="${args.loading}"
      .icon="${args.icon}"
      .trailingicon="${args.trailingicon}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?disabled="${args.disabled}"
      ?active="${args.active}"
      .arialabel="${args.arialabel}"
      .ariacurrent="${args.ariacurrent}"
      .ariarole="${args.ariarole}"
      .name="${args.name}"
      @click="${(event) => action('click')(event.detail)}"
      @focus="${(event) => action('focus')(event.detail)}"
      @blur="${(event) => action('blur')(event.detail)}"
      .href="${args.href}"
      .rel="${args.rel}"
      .target="${args.target}"
    ></mc-link-button>
    ${renderCodePreview(code, context)} `;
};
