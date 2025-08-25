import { fit, eventtype, value } from '@maersk-global/mds-dev-utils';

export default {
  fit,
  arialabel: {
    name: 'aria-label',
    type: { required: true },
    defaultValue: 'Label',
    description: 'Should be used to give a proper description to the list from accessibility point of view.',
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  value: value(),
  event: eventtype('pickerselected'),
};
