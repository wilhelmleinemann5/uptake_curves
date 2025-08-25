import { fit, value } from '@maersk-global/mds-dev-utils';

export default {
  label: {
    name: 'label',
    type: { required: true },
    defaultValue: 'Apple',
    description: `Label can be passed as a simple argument like: \`label="Label"\`. Label is required attribute as it will be used as aria-label.`,
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  fit,
  value: value('The value of the item', 'string | number | object', '0', {
    type: 'text',
  }),
};
