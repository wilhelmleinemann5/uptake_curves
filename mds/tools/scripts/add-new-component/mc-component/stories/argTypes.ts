import { fit, eventtype } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  myprop: {
    name: 'myprop',
    type: { required: true },
    defaultValue: 'My prop',
    description: 'Add description here',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  fit,
  event: eventtype('myevent'),
};
