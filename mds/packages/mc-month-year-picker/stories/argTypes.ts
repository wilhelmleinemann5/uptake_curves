import { fit, eventtype } from '@maersk-global/mds-dev-utils';

export default {
  yearcap: {
    name: 'yearcap',
    type: { required: false },
    defaultValue: 10,
    description: 'How many years backwards and forwards from the current one to render.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'number',
    },
  },
  fit,
  preventinitialeventdispatch: {
    name: 'preventinitialeventdispatch',
    type: { required: false },
    defaultValue: false,
    description: 'True if the monthyearselected event should not be dispatched on initial load when used in a popover.',
    table: {
      category: 'State',
    },
    control: {
      type: 'boolean',
    },
  },
  value: {
    name: 'value',
    type: { required: false },
    defaultValue: null,
    description: 'Sets the selected value of the picker. Check the `Examples` page to see how to set the value.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'object',
    },
  },
  locale: {
    name: 'locale',
    type: { required: false },
    defaultValue: new Intl.NumberFormat().resolvedOptions().locale,
    description: 'Locale to render the month names in. By default the component will use the users browser language.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: new Intl.NumberFormat().resolvedOptions().locale },
    },
    control: {
      type: 'text',
    },
  },
  min: {
    name: 'min',
    type: { required: false },
    defaultValue: null,
    description:
      'Sets the minimal value of the picker that can be selected. Check the `Examples` page to see how to set the min.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'object',
    },
  },
  max: {
    name: 'max',
    type: { required: false },
    defaultValue: null,
    description:
      'Sets the maximum value of the picker that can be selected. Check the `Examples` page to see how to set the max.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'object',
    },
  },
  fullwidth: {
    name: 'fullwidth',
    type: { required: false },
    defaultValue: false,
    description: 'Sets the picker to take the full width.',
    table: {
      category: 'Style',
    },
    control: {
      type: 'boolean',
    },
  },
  nopadding: {
    name: 'nopadding',
    type: { required: false },
    defaultValue: false,
    description: 'Sets the padding to 0.',
    table: {
      category: 'Style',
    },
    control: {
      type: 'boolean',
    },
  },
  event: eventtype('monthyearselected'),
};
