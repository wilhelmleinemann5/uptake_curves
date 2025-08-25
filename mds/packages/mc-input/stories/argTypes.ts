import {
  name,
  value,
  hint,
  errormessage,
  invalid,
  label,
  hiddenlabel,
  placeholder,
  icon,
  id,
  inputvariant,
  labelposition,
  disabled,
  readonly,
  fit,
  width,
  affix,
  required,
  loading,
  eventtype,
  autocomplete,
} from '@maersk-global/mds-dev-utils';

export default {
  label: label('mc-input', 'Username'),
  hiddenlabel: hiddenlabel('Content'),
  placeholder: placeholder('Insert your username'),
  autocomplete: autocomplete(
    'on',
    'P.S. Check Examples -> Password autocompletion story to see a live demo on enabling password autocompletion behavior.',
  ),
  hint: hint('mc-input'),
  loading: loading(
    'input',
    'The leading/trailing icon, suffix/prefix or clear button (if exists) will be replaced by the spinner.',
  ),
  autofocus: {
    name: 'autofocus',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'The autofocus global attribute is a Boolean attribute indicating that an element should be focused on page load, or when the <dialog> that it is part of is displayed.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
    },
  },
  variant: inputvariant,
  fit,
  labelposition,
  width: width('The width of the inner input container in percentage. If not provided the width will be `auto`.'),
  type: {
    name: 'type',
    type: { required: false },
    defaultValue: 'text',
    description:
      'Supported types are: text, tel, url, email, number and password. For number input, please have a look at `mc-number-stepper` documentation and examples stories. For date input, please have a look at `mc-input-date` documentation and examples stories.',
    table: {
      category: 'Content',
      type: { summary: 'text | tel | url | email | number | password | color' },
      defaultValue: { summary: 'text' },
    },
    control: {
      type: 'select',
      options: ['text', 'tel', 'url', 'email', 'number', 'password', 'color'],
    },
  },
  icon: icon('icon'),
  trailingicon: icon('trailingicon'),
  trailingiconlabel: {
    name: 'trailingiconlabel',
    type: { name: 'string', required: false },
    description:
      "The label and title of the trailing icon, which will be shown on icon hover, and used as hidden label in the button. It's important for user experience and accessibility to provide the prop when using `clickabletrailingicon`",
    table: {
      type: { summary: 'boolean' },
      category: 'Icon',
    },
    control: {
      type: 'text',
    },
  },
  clickabletrailingicon: {
    name: 'clickabletrailingicon',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'Trailingicon will be clickable. If you want to handle the click event, please listen to the `iconclick` event.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Icon',
    },
    control: {
      type: 'boolean',
    },
  },
  id,
  prefix: affix(
    'prefix',
    'You can either render prefix or an icon on the same side of the input. Preferably, the prefix should not be longer than 5 characters.',
  ),
  suffix: affix(
    'suffix',
    'You can either render suffix or an icon on the same side of the input. Preferably, the suffix should not be longer than 5 characters. ',
  ),
  clearbutton: {
    name: 'clearbutton',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Actions',
    },
    control: {
      type: 'boolean',
    },
  },
  keepclearbuttonvisible: {
    name: 'keepclearbuttonvisible',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'Clearbutton will be visible at all times when user typed something in the field (not only during input focus)',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Actions',
    },
    control: {
      type: 'boolean',
    },
  },
  invalid,
  errormessage: errormessage('mc-input'),
  disabled,
  readonly,
  required,
  name: name('username'),
  value: value('The initial value of the input', 'string', undefined, {
    type: 'text',
  }),
  eventInput: eventtype('input'),
  eventFocus: eventtype('focus'),
  eventBlur: eventtype('blur'),
  eventClick: eventtype('click'),
  eventKeydown: eventtype('keydown'),
  eventClearbuttonClick: eventtype('clearbuttonclick'),
  eventIconClick: eventtype('trailingiconclick'),
  mask: {
    name: 'mask',
    type: { name: 'string', required: false },
    defaultValue: '',
    description:
      'The mask can be a string or a regular expression i.e. `000 000`. For more information, please have a look at the `with a mask` example or check More examples on mask can be found on https://imask.js.org/.',
    table: {
      type: { summary: 'text' },
      defaultValue: { summary: '' },
      category: 'Content',
    },
    control: {
      type: 'text',
    },
  },
};
