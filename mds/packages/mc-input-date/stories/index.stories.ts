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
  title: 'Components/Input Date/Documentation',
  component: 'mc-input-date',
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
  const mdsDocsShowFooter = urlParams.get('mdsdocsshowfooter');
  const footerSlot =
    mdsDocsShowFooter == 'true'
      ? `
  <span class="mds-text--x-small-normal" slot="footer">
    Use arrow keys to navigate between days
  </span>`
      : '';
  ('');
  const code = generateCode('mc-input-date', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-input-date
      ?clearbutton="${args.clearbutton}"
      ?disabled="${args.disabled}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?invalid="${args.invalid}"
      ?keepclearbuttonvisible="${args.keepclearbuttonvisible}"
      ?loading="${args.loading}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?showadjacentmonthdays=${args.showadjacentmonthdays}
      ?usemask="${args.usemask}"
      .activedate="${args.activedate}"
      .id="${args.id}"
      .labelposition="${args.labelposition}"
      .autocomplete="${args.autocomplete}"
      .customize="${args.customize}"
      .customstyles="${args.customstyles}"
      .disable="${args.disable}"
      .errormessage="${args.errormessage}"
      .fit="${args.fit}"
      .format="${args.format}"
      .hint="${args.hint}"
      .icon="${args.icon}"
      .locale="${args.locale}"
      .dayperiod="${args.dayperiod}"
      .max="${args.max}"
      .min="${args.min}"
      .placeholder="${args.placeholder}"
      .calendarposition="${args.calendarposition}"
      .prefix="${args.prefix}"
      .startofweek="${args.startofweek}"
      .suffix="${args.suffix}"
      .type="${args.type}"
      .value="${args.value}"
      .variant="${args.variant}"
      .width="${args.width}"
      .yearcap="${args.yearcap}"
      .label="${args.label}"
      @blur="${(event) => action('blur')(event.target.value)}"
      @focus="${(event) => action('focus')(event.target.value)}"
      @input="${(event) => action('input')(event.target.value)}"
      @inputdateselected="${(event) => action('inputdateselected')(event.target.value)}"
      @invalid=${(event) => action('invalid')(event.target.value)}
      @click="${(event) => action('click')(event.target.value)}"
      @clearbuttonclick="${(event) => action('clearbuttonclick')(event.target.value)}"
      @keydown="${(event) => action('keydown')(event.key)}"
      name="username"
      ?showweeknumbers="${args.showweeknumbers}"
      ?open="${args.open}"
    >
      ${unsafeHTML(footerSlot)}
    </mc-input-date>
    ${renderCodePreview(code, context)}`;
};
