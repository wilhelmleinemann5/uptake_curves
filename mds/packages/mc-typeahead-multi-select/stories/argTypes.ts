import {
  hint,
  errormessage,
  label,
  placeholder,
  eventtype,
  autocomplete,
  data,
  maxoptions,
  minchars,
  debounce,
  highlight,
  nosuggestions,
  matchlabelonly,
  disablefilter,
  customfilter,
  listlabel,
  optionswidth,
  optionsheight,
} from '@maersk-global/mds-dev-utils';
import inputArgTypes from '@maersk-global/mds-components-core-input/stories/argTypes';

const inputArgs = { ...inputArgTypes };
delete inputArgs.autocomplete;
delete inputArgs.clearbutton;
delete inputArgs.type;
delete inputArgs.mask;
delete inputArgs.readonly;

export const argTypes = {
  clearalllabel: {
    name: 'clearalllabel',
    type: { name: 'string', required: false },
    defaultValue: 'Clear all',
    description: 'Label for the clear all filters button that appears when there are more than 2 selected options.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Clear all' },
      category: 'Typeahead Multi Select',
    },
    control: {
      type: 'text',
    },
  },
  selecteddata: {
    name: 'selecteddata',
    type: { name: 'array', required: false },
    defaultValue: [],
    description:
      'Array of selected data that will be rendered as tags. Can be set initially to pre-populate the component with selected options. Each item should match the structure of data items (IMcTypeaheadData).',
    table: {
      type: { summary: 'IMcTypeaheadData[]' },
      defaultValue: { summary: '[]' },
      category: 'Typeahead Multi Select',
    },
    control: {
      type: 'object',
    },
  },
  freetexttagging: {
    name: 'freetexttagging',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      "Allows users to create custom tags by pressing Enter when the input doesn't match any dropdown option. Custom tags can be dismissed without affecting the dropdown suggestion list.",
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Typeahead Multi Select',
    },
    control: { type: 'boolean' },
  },
  hiddentags: {
    name: 'hiddentags',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'Hides the tags of selected options. You can then use callback function `optionselected` which will give a list of all selected options, and render tags somewhere else on the page. Please check out `Examples` folder to see how this can be implemented.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Typeahead Multi Select',
    },
    control: {
      type: 'boolean',
    },
  },
  data,
  maxoptions,
  minchars,
  debounce,
  highlight,
  nosuggestions,
  matchlabelonly: matchlabelonly('Typeahead'),
  disablefilter,
  customfilter: customfilter('Typeahead'),
  listlabel,
  optionswidth,
  optionsheight,
  eventSearch: eventtype('search', '', 'Events Typeahead'),
  eventOptionselected: eventtype('optionselected', '', 'Events Typeahead'),
  ...inputArgs,
  label: label('mc-typeahead-multi-select', 'Fruit'),
  placeholder: placeholder('Type a fruit name'),
  autocomplete: autocomplete('off'),
  hint: hint('mc-typeahead-multi-select'),
  errormessage: errormessage('mc-typeahead-multi-select'),
  clearbutton: {
    name: 'clearbutton',
    type: { name: 'boolean', required: false },
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
      category: 'Actions',
    },
    control: {
      type: 'boolean',
    },
  },
};
