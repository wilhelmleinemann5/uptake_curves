import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Select/Documentation',
  component: 'mc-select',
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
  const mdsDocsOptionGroups = urlParams.get('mdsdocsoptiongroups');
  const slot = `
  ${mdsDocsOptionGroups == 'true' ? `<small>Dry Containers</small>` : ''}
  <mc-option value="20' Dry Standard">20' Dry Standard</mc-option>
  <mc-option value="40' Dry Standard">40' Dry Standard</mc-option>
  <mc-option value="40' Dry High">40' Dry High</mc-option>
  <mc-option value="45' Dry High">45' Dry High</mc-option>
  ${mdsDocsOptionGroups == 'true' ? `<hr />` : ''}
  ${mdsDocsOptionGroups == 'true' ? `<small>Reefer Containers</small>` : ''}
  <mc-option value="20' Reefer Standard">20' Reefer Standard</mc-option>
  <mc-option value="40' Reefer Standard">40' Reefer Standard</mc-option>`;
  const code = generateCode('mc-select', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px">
      <mc-select
        ?clearbutton="${args.clearbutton}"
        ?disabled="${args.disabled}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?invalid="${args.invalid}"
        ?readonly="${args.readonly}"
        ?required="${args.required}"
        .errormessage="${args.errormessage}"
        .icon="${args.icon}"
        .fit="${args.fit}"
        .hint="${args.hint}"
        .label="${args.label}"
        .labelposition="${args.labelposition}"
        .id="${args.id}"
        .optionsheight="${args.optionsheight}"
        .optionswidth="${args.optionswidth}"
        .placeholder="${args.placeholder}"
        .value="${args.value}"
        .variant="${args.variant}"
        ?loading="${args.loading}"
        ?listsearch="${args.listsearch}"
        .listsearchplaceholder="${args.listsearchplaceholder}"
        .filtertype="${args.filtertype}"
        .customfilter="${args.customfilter}"
        ?matchlabelonly="${args.matchlabelonly}"
        @blur="${(event) => action('blur')(event.target.value)}"
        @input="${(event) => action('input')(event.target.value)}"
        @opened="${(event) => action('opened')(event.detail)}"
        @closed="${(event) => action('closed')(event.detail)}"
        @optionselected="${(event) => action('optionselected')(event.detail.value, event.detail.label)}"
        @clearbuttonclick="${(event) => action('clearbuttonclick')(event.target.value)}"
        name="select"
      >
        ${unsafeHTML(slot)}
      </mc-select>
    </div>
    ${renderCodePreview(code, context)} `;
};
