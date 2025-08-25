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
  title: 'Components/Typeahead Multi Select',
  component: 'mc-typeahead-multi-select',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
let persistentSelectedData: any[] = [];
let lastArgsSelectedData: any[] = [];

export const Documentation = (args: Args, context: StoryContext) => {
  const code = generateCode('mc-typeahead-multi-select', argTypes, args);

  const currentArgsSelectedData = args.selecteddata || [];
  const argsSelectedDataChanged = JSON.stringify(currentArgsSelectedData) !== JSON.stringify(lastArgsSelectedData);
  if (argsSelectedDataChanged) {
    persistentSelectedData = [...currentArgsSelectedData];
    lastArgsSelectedData = [...currentArgsSelectedData];
  }

  const handleOptionSelected = (event: CustomEvent) => {
    action('optionselected')(event.detail);
    persistentSelectedData = event.detail || [];
  };

  const currentSelectedData = persistentSelectedData || args.selecteddata || [];

  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width: 280px;">
      <mc-typeahead-multi-select
        name="typeahead"
        .maxoptions=${args.maxoptions}
        .minchars=${args.minchars}
        .debounce=${args.debounce}
        ?highlight="${args.highlight}"
        ?clearbutton="${args.clearbutton}"
        ?disabled="${args.disabled}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?invalid="${args.invalid}"
        ?keepclearbuttonvisible="${args.keepclearbuttonvisible}"
        ?disablefilter="${args.disablefilter}"
        ?loading="${args.loading}"
        .clearalllabel="${args.clearalllabel}"
        ?hiddentags="${args.hiddentags}"
        ?freetexttagging="${args.freetexttagging}"
        .selecteddata="${currentSelectedData}"
        ?readonly="${args.readonly}"
        ?required="${args.required}"
        .autocomplete="${args.autocomplete}"
        .data="${args.data}"
        .errormessage="${args.errormessage}"
        .fit="${args.fit}"
        .hint="${args.hint}"
        .icon="${args.icon}"
        .id="${args.id}"
        .nosuggestions="${args.nosuggestions}"
        .label="${args.label}"
        .labelposition="${args.labelposition}"
        .optionsheight="${args.optionsheight}"
        .optionswidth="${args.optionswidth}"
        .placeholder="${args.placeholder}"
        .prefix="${args.prefix}"
        .suffix="${args.suffix}"
        .trailingicon="${args.trailingicon}"
        .trailingiconlabel="${args.trailingiconlabel}"
        ?clickabletrailingicon="${args.clickabletrailingicon}"
        .value="${args.value}"
        .variant="${args.variant}"
        .width="${args.width}"
        .listlabel="${args.listlabel}"
        @input="${(event) => action('input')(event.target.value)}"
        @focus="${(event) => action('focus')(event.target.value)}"
        @blur="${(event) => action('blur')(event.target.value)}"
        @click="${(event) => action('click')(event.target.value)}"
        @keydown="${(event) => action('keydown')(event.key)}"
        @clearbuttonclick="${(event) => action('clearbuttonclick')(event.target.value)}"
        @search="${(event) => action('search')(event.target.value)}"
        @optionselected="${handleOptionSelected}"
        @listscroll="${(event) => action('listscroll')(event.target.value)}"
      ></mc-typeahead-multi-select>
    </div>
    ${renderCodePreview(code, context)}`;
};
