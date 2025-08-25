import {
  name,
  label,
  disabled,
  widthbutton,
  loading,
  fit,
  href,
  rel,
  target,
  eventtype,
  appearance,
} from '@maersk-global/mds-dev-utils';
import textAndIconArgTypes from '@maersk-global/mds-components-core-text-and-icon/stories/argTypes';

const textAndIconArgs = { ...textAndIconArgTypes };
delete textAndIconArgs.sublabel;

const buttonArgs = {
  label: label('mc-button', 'Button'),
  loading: loading(
    'button',
    'The leading/trailing icon (if exists) is replaced by the spinner. This state also prevents the user from clicking and activating or submitting something more than one time.',
  ),
  appearance: appearance(['primary', 'secondary', 'neutral', 'inverse', 'error'], 'primary'),
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'filled',
    table: {
      category: 'Style',
      type: { summary: 'filled | outlined | plain' },
      defaultValue: { summary: 'filled' },
    },
    options: ['filled', 'outlined', 'plain'],
    control: {
      type: 'select',
    },
  },
  fit,
  padding: {
    name: 'padding',
    type: { required: false },
    defaultValue: 'default',
    description: 'Adjusts the padding size.',
    table: {
      category: 'Style',
      type: { summary: 'default | compact | none' },
      defaultValue: { summary: 'default' },
    },
    options: ['default', 'compact', 'none'],
    control: {
      type: 'select',
    },
  },
  width: widthbutton(),
  justifyitems: {
    name: 'justifyitems',
    type: { required: false },
    defaultValue: 'center',
    description:
      'Allows to position items inside the button like label text & icon. Specially useful when using `width="full-width"`',
    table: {
      category: 'Style',
      type: { summary: 'center | left | right | space-between' },
      defaultValue: { summary: 'center' },
    },
    options: ['center', 'left', 'right', 'space-between'],
    control: {
      type: 'select',
    },
  },
  disabled,
  active: {
    name: 'active',
    type: { required: false },
    defaultValue: false,
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  href: href('button'),
  rel,
  target,
  arialabel: {
    name: 'arialabel',
    defaultValue: '',
    description:
      "Should 'only' be used if for the sake of accessibility the `aria-label` is differnt that the label which appears on the button, so that for instance the screen reader can provide more details than what's being visually displayed as a label on the button component.",
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  ariacurrent: {
    name: 'ariacurrent',
    defaultValue: '',
    description:
      'Sets the aria-current on the inner button in cases like pagination where the button is repeated in a list and at the same time, the currently active item needs to be specified.',
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  ariarole: {
    name: 'ariarole',
    defaultValue: '',
    description: 'Sets the `role` on the inner button in cases like `tab-bar` where of every button is `tab`',
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  type: {
    name: 'type',
    type: { required: false },
    description: 'Button type, default value is `button`',
    table: {
      category: 'Form',
      type: { summary: 'button | submit | reset | menu' },
    },
    control: {
      type: 'text',
    },
  },
  name: name('', 'Pass name if the button with `type="submit"` is used inside a `form` element.'),
  eventClick: eventtype('click'),
  eventFocus: eventtype('focus'),
  eventBlur: eventtype('blur'),
};

export default {
  ...textAndIconArgs,
  ...buttonArgs,
};
