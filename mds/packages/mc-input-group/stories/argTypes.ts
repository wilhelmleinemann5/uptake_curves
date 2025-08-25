import { fit } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  fit,
  legend: {
    name: 'legend',
    type: { required: true },
    defaultValue: 'Legend',
    description: 'The legend of the component. Can be passed as a simple string or as a slot for HTML content.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenlegend: {
    name: 'hiddenlegend',
    type: { required: false },
    defaultValue: false,
    description: 'Determines whether the legend is visually hidden.',
    table: {
      category: 'Content',
      type: { summary: 'boolean' },
    },
    control: {
      type: 'boolean',
    },
  },
  disableinnerborder: {
    name: 'disableinnerborder',
    type: { required: false },
    defaultValue: false,
    description: 'Determines whether the inner border is disabled.',
    table: {
      category: 'Style',
      type: { summary: 'boolean' },
    },
    control: {
      type: 'boolean',
    },
  },
};
