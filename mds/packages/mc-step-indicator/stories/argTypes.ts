import { currentindex, orientation, fitextended, autolayoutdisabled } from '@maersk-global/mds-dev-utils';

const currentIndexType = currentindex(2);

export default {
  labels: {
    name: 'labels',
    type: { required: true },
    defaultValue: ['ETD', 'Release Sent', 'Carrier Released', 'ETA'],
    description: `Corresponding labels of different steps in the step indicator control. 
      Labels could be also passed as a default slot. Look at examples with \`mc-step-indicator-item\``,
    table: {
      category: 'Content',
      type: { summary: 'array | slot' },
    },
    control: {
      type: 'object',
      value: ['ETD', 'Release Sent', 'Carrier Released', 'ETA'],
    },
  },
  currentindex: {
    ...currentIndexType,
    description: `${currentIndexType.description}. It's working only when labels are passed as props. \`currentindex\` is not working for slot labels - here you need to pass \`state\` prop for each step.`,
  },
  orientation: orientation('horizontal', 'horizontal'),
  fit: fitextended(['small', 'medium', 'large', 'x-large']),
  autolayoutdisabled,
  alignitemsdisabled: {
    name: 'alignitemsdisabled',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'By default, all items are center aligned to the marker in the horizontal orientation. When set to `true` the first and the last item in horizontal step indicator will be respectively left and right aligned.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Style',
    },
    control: {
      type: 'boolean',
    },
  },
};
