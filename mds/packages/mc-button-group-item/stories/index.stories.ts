import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Button Group/Item/Documentation',
  component: 'mc-button-group-item',
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
  const slot =
    mdsDocsWithBadge === 'true'
      ? `
  <span>${args.label}</span>
  <mc-badge slot="badge" position="left" display="inline" label="4"></mc-badge>`
      : '';

  // Calculate the label value conditionally
  const labelValue = mdsDocsWithBadge === 'true' ? undefined : args.label;
  const argsForCode = { ...args };
  if (mdsDocsWithBadge === 'true') {
    delete argsForCode.label;
  }
  const code = generateCode('mc-button-group-item', argTypes, argsForCode, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-button-group aria-label="fruits" selectiontype="multiple">
      <mc-button-group-item
        ?selected="${args.selected}"
        ?disabled="${args.disabled}"
        icon="${args.icon}"
        trailingicon="${args.trailingicon}"
        fit="${args.fit}"
        ?hiddenlabel="${args.hiddenlabel}"
        href="${args.href}"
        label="${ifDefined(labelValue)}"
        @focus="${(event) => action('focus')(event.detail)}"
        @blur="${(event) => action('blur')(event.detail)}"
        >${unsafeHTML(slot)}</mc-button-group-item
      >
    </mc-button-group>
    ${renderCodePreview(code, context)} `;
};
