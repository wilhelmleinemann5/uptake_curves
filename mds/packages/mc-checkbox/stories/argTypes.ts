import {
  name,
  value,
  hint,
  errormessage,
  invalid,
  label,
  fit,
  checked,
  disabled,
  hiddenlabel,
  eventtype,
} from '@maersk-global/mds-dev-utils';
export default {
  label: label('mc-checkbox', 'I agree to the terms'),
  hiddenlabel: hiddenlabel('Content'),
  hint: hint('mc-checkbox'),
  fit,
  checked,
  disabled,
  invalid,
  errormessage: errormessage('mc-checkbox'),
  indeterminate: {
    name: 'indeterminate',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'Indeterminate state gets precedence over the `checked` state and the checkbox `does not` consider to be `checked` when is in `indeterminate` state. There are not many use cases for this property. The most common is when a checkbox "owns" a number of sub-options (which are also checkboxes). If all of the sub-options are checked, the owning checkbox is also checked, and if they\'re all unchecked, the owning checkbox is unchecked. If any one or more of the sub-options have a different state than the others, the owning checkbox is in the `indeterminate` state.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'State',
    },
    control: {
      type: 'boolean',
    },
  },
  name: name('disclaimer'),
  value: value(),
  eventClick: eventtype('click'),
  eventChange: eventtype('change'),
  eventFocus: eventtype('focus'),
  eventBlur: eventtype('blur'),
};
