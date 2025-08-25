import { fit, eventtype, value } from '@maersk-global/mds-dev-utils';

export const minutestep = (category = 'Content'): unknown => ({
  name: 'minutestep',
  type: { required: false },
  defaultValue: 1,
  description:
    'A numeric value that indicates the level of granularity that the minute items must meet. It can range between greater than 1 and less than 59. For more details, see the examples.',
  table: {
    category,
    type: { summary: 'number' },
    defaultValue: { summary: 1 },
  },
  control: {
    type: 'number',
  },
});

export const hourstep = (category = 'Content'): unknown => ({
  name: 'hourstep',
  type: { required: false },
  defaultValue: 1,
  description:
    'A numeric value that indicates the level of granularity that the hour items must meet. It can range between greater than 1 and less than 23. For more details, see the examples.',
  table: {
    category,
    type: { summary: 'number' },
    defaultValue: { summary: 1 },
  },
  control: {
    type: 'number',
  },
});

export default {
  hourstep: hourstep(),
  minutestep: minutestep(),
  preselectcurrenttime: {
    name: 'preselectcurrenttime',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description: 'If present, the current local time will be preselected.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
    },
  },
  fit,
  value: value(),
  event: eventtype('timeselected'),
};
