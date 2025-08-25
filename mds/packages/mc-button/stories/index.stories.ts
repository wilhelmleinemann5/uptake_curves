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
  title: 'Components/Button/Documentation',
  component: 'mc-button',
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
  const urlParams = new URLSearchParams(window.location.search);
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');

  let slot;
  if (mdsDocsWithBadge == 'true') {
    slot = `
  <span>${args.label}</span>
  <mc-badge slot="badge" position="top" display="pinned" label="9" distance="large"></mc-badge>`;
    delete args.label;
  }

  const code = generateCode('mc-button', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div
      style="${
        args.appearance === 'inverse'
          ? 'background-color: var(--mds_brand_appearance_neutral_inverse_background-color); padding: 24px;'
          : ''
      }"
    >
      <mc-button
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
      >${slot ? unsafeHTML(slot) : null}</mc-button>
    </div>
    ${renderCodePreview(code, context)}
  </div>`;
};
