import { hiddenlabel, fit, appearance, orientation } from '@maersk-global/mds-dev-utils';
export default {
  label: {
    name: 'label',
    type: { required: true },
    defaultValue: 'Loading',
    description: 'Label has to be passed as a property. It is required attribute as it will be used as aria-label',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: 'Loading' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenlabel: hiddenlabel('Content'),
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'ring',
    table: {
      category: 'Style',
      type: { summary: 'bar | ring' },
      defaultValue: { summary: 'ring' },
    },
    options: ['bar', 'ring'],
    control: {
      type: 'select',
    },
  },
  appearance: appearance(['primary', 'neutral-inverse'], 'primary'),
  orientation: orientation('vertical'),
  fit,
};
