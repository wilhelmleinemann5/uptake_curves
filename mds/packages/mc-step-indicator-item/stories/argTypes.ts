import { orientation, label, icon, fitextended, autolayoutdisabled, appearance } from '@maersk-global/mds-dev-utils';

export default {
  label: { ...label('mc-step-indicator-item'), type: { required: false } },
  state: {
    name: 'state',
    type: { required: false },
    defaultValue: 'pending',
    table: {
      disabled: true,
      category: 'Style',
      type: { summary: 'pending | current | completed' },
      defaultValue: { summary: 'pending' },
    },
    options: ['pending', 'current', 'completed'],
    control: {
      type: 'select',
    },
  },
  orientation: orientation('horizontal', 'horizontal'),
  fit: fitextended(['small', 'medium', 'large', 'x-large']),
  autolayoutdisabled,
  alignitemsdisabled: {
    name: 'alignitemsdisabled',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'By default, all items are center aligned to the marker. When set to `true` the first and the last item in step indicator will be respectively left and right aligned.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Style',
    },
    control: {
      type: 'boolean',
    },
  },
  icon: icon('icon', '', '', 'string | slot'),
  appearance: appearance(['default', 'warning', 'error'], 'default'),
};
