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
  label: label('mc-typeahead', 'Fruit'),
  placeholder: placeholder('Type a fruit name'),
  autocomplete: autocomplete('off'),
  hint: hint('mc-typeahead'),
  errormessage: errormessage('mc-typeahead'),
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
