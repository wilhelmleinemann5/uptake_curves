import {
  hint,
  errormessage,
  label,
  placeholder,
  eventtype,
  value,
  listsearch,
  listsearchplaceholder,
  filtertype,
  customfilter,
} from '@maersk-global/mds-dev-utils';
import selectArgTypes from '@maersk-global/mds-components-core-select/stories/argTypes';

const selectArgs = { ...selectArgTypes };
// Remove matchlabelonly since mc-multi-select doesn't support sublabels
delete selectArgs.matchlabelonly;

const multiSelectArgs = {
  selectalllabel: {
    name: 'selectalllabel',
    type: { required: false },
    defaultValue: 'Select all',
    description: 'Label for the `selectall` button.',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: 'Select all' },
    },
    control: {
      type: 'text',
    },
  },
  clearalllabel: {
    name: 'clearalllabel',
    type: { required: false },
    defaultValue: 'Clear all',
    description: 'Label for the `clearall` button.',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: 'Clear all' },
    },
    control: {
      type: 'text',
    },
  },
  summarylabel: {
    name: 'summarylabel',
    type: { required: false },
    defaultValue: '# out of # selected',
    description:
      'Label for displaying how many items has been selected in the multi-select. # are placeholder values calculated automatically and have to be provided.',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: '# out of # selected' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenselectclearlabel: {
    name: 'hiddenselectclearlabel',
    type: { required: false },
    defaultValue: false,
    description:
      'If set to `true` or the attribute is just presented without any value, then the select all / clear all label will not appear in the dropdown',
    table: {
      category: 'Label Text',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
};

export default {
  ...multiSelectArgs,
  ...selectArgs,
  listsearch,
  listsearchplaceholder: listsearchplaceholder(),
  filtertype: filtertype(),
  customfilter: customfilter('Search'),
  label: label('mc-multi-select', 'Container types'),
  placeholder: placeholder('No container types selected'),
  hint: hint('mc-multi-select'),
  errormessage: errormessage('mc-multi-select'),
  eventOptionselected: eventtype('optionselected'),
  value: value(
    'The initial value of the multi-select. It can be passed as a string (i.e. "1,2") or as an array (i.e. ["1", "2"])',
    'string | array | array of objects',
    '',
    {
      type: 'text',
    },
  ),
};
