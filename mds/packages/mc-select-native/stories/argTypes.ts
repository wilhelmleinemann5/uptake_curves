import {
  name,
  value,
  hint,
  errormessage,
  invalid,
  label,
  width,
  fit,
  hiddenlabel,
  placeholder,
  disabled,
  required,
  eventtype,
  labelposition,
  id,
} from '@maersk-global/mds-dev-utils';

export default {
  label: label('mc-select-native', 'Pick a number'),
  hiddenlabel: hiddenlabel('Content'),
  fit,
  options: {
    name: 'options',
    type: { required: true },
    defaultValue: [
      { value: 0, label: 'Zero' },
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' },
      { value: 5, label: 'Five' },
    ],
    description:
      'Options are required. They can be passed as an array: `["One", "Two"]` or as an array of objects: `[{value: 1, label: "One"}, {value: 2, label: "Two"}]`',
    table: {
      category: 'Content',
      type: { summary: 'array' },
      defaultValue: {
        summary: '[]',
      },
    },
    control: {
      type: 'object',
      value: [
        { value: 0, label: 'Zero' },
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
        { value: 4, label: 'Four' },
        { value: 5, label: 'Five' },
      ],
      // value: ['First', 'Second', 'Third', 'Forth', 'Fifth'],
    },
  },
  placeholder: placeholder('Pick a number from a list'),
  id,
  hint: hint('mc-select-native'),
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'default',
    table: {
      category: 'Style',
      type: { summary: 'default | vanity | multiple' },
      defaultValue: { summary: 'default' },
    },
    options: ['default', 'vanity', 'multiple'],
    control: {
      type: 'select',
    },
  },
  width: width('The width of the inner input container in percentage. If not provided the width will be `auto`.'),
  labelposition,
  name: name('digits'),
  event: eventtype('change'),
  value: value(
    'Specifies the selected options. If the `options` are supplied as an array of strings, then the `value` should follow the same pattern, i.e. `["One", "Two"]`. Otherwise if `options` are supplied as an array of objects the `value` should be i.e. `[{value: 1, label: "One"}, {value: 2, label: "Two"}]`.',
    'array',
    [{ value: '1', label: 'One' }],
    {
      type: 'object',
      value: [{ value: 1, label: 'One' }],
    }
  ),
  selectedindex: {
    name: 'selectedindex',
    type: { required: false },
    defaultValue: [1],
    description: 'Specifies the selected indexes. If supplied, then the value array will be disregarded.',
    table: {
      category: 'Form',
      type: { summary: 'array' },
    },
    control: {
      type: 'object',
      value: [1],
    },
  },
  invalid,
  errormessage: errormessage('mc-select-native'),
  disabled,
  required,
};
