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
  title: 'Components/Date Range/Documentation',
  component: 'mc-date-range',
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
  const isMDSDocs = urlParams.has('mdsdocs');
  const mdsDocsAppearance = urlParams.get('mdsdocsappearance') || 'light';
  const mdsDoscShowFooter = urlParams.get('mdsdocsshowfooter');
  const mdsDocsShowHint = urlParams.get('mdsdocsshowhint');
  const hintSlot =
    mdsDocsShowHint == 'true'
      ? ` 
  <mc-input-date slot="from" label="Arrival date">
    <span slot="hint">Check our <a target="_blank" href="https://designsystem.maersk.com" class="mds-neutral--weakest__text-color">website</a> for available slots</span>
  </mc-input-date>
  <mc-input-date slot="to" label="Departure date" >
  </mc-input-date>`
      : '';
  const footerSlot =
    mdsDoscShowFooter == 'true'
      ? `
  <mc-input-date slot="from" label="From">
    <span class="mds-text--x-small-normal" slot="footer">Use arrow keys to navigate between days</span>
  </mc-input-date>
  <mc-input-date slot="to" label="To">
    <span class="mds-text--x-small-normal" slot="footer">Use arrow keys to navigate between days</span>
  </mc-input-date>`
      : '';
  ('');
  const code = generateCode('mc-date-range', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-date-range
      ?autolayoutdisabled="${args.autolayoutdisabled}"
      ?clearbutton="${args.clearbutton}"
      ?keepclearbuttonvisible="${args.keepclearbuttonvisible}"
      ?disabled="${args.disabled}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?hiddenlegend="${args.hiddenlegend}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      .autocomplete="${args.autocomplete}"
      .calendarposition="${args.calendarposition}"
      .customize="${args.customize}"
      .customstyles="${args.customstyles}"
      .fit="${args.fit}"
      .format="${args.format}"
      .fromlabel="${args.fromlabel}"
      .icon="${args.icon}"
      .labelposition="${args.labelposition}"
      .legend="${args.legend}"
      .loading="${args.loading}"
      .locale="${args.locale}"
      .max="${args.max}"
      .min="${args.min}"
      .orientation="${args.orientation}"
      .nextlabel="${args.nextlabel}"
      .placeholder="${args.placeholder}"
      .previouslabel="${args.previouslabel}"
      .showadjacentmonthdays="${args.showadjacentmonthdays}"
      .showweeknumbers="${args.showweeknumbers}"
      .size="${args.size}"
      .startofweek="${args.startofweek}"
      .tolabel="${args.tolabel}"
      .value="${args.value}"
      .variant="${args.variant}"
      .width="${args.width}"
      .yearcap="${args.yearcap}"
      @blur="${(event) => action('blur')(event.target.value)}"
      @focus="${(event) => action('focus')(event.target.value)}"
      @input="${(event) => action('input')(event.target.value)}"
      @click="${(event) => action('click')(event.target.value)}"
      @keydown="${(event) => action('keydown')(event.key)}"
    >
      ${mdsDocsShowHint == 'true' ? unsafeHTML(hintSlot) : null}
      ${mdsDoscShowFooter == 'true' ? unsafeHTML(footerSlot) : null}
    </mc-date-range>
    ${renderCodePreview(code, context)} `;
};
