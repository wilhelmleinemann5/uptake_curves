import { fit } from '@maersk-global/mds-dev-utils';

export default {
  hint: {
    name: 'hint',
    type: { required: false },
    defaultValue: 'Hint text',
    description: `Hint text can be passed as simple argument like: \`hint="hint text"\` or as a named slot. Use argument style for passing short messages, use named slot when you want to pass hint with HTML text`,
    table: {
      type: {
        summary: 'string | slot',
      },
      category: 'State',
    },
    control: {
      type: 'text',
    },
  },
  fit,
};
