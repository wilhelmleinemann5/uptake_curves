import { fit } from '@maersk-global/mds-dev-utils';

export default {
  errormessage: {
    name: 'errormessage',
    type: { required: false },
    defaultValue: 'Error message',
    description: `Error message will be shown only if \`invalid\` attribute is set to \`true\`. Error message can be passed as simple argument like: \`errormessage="error"\` or as a named slot. Use argument style for passing short messages, use named slot when you want to pass error message with HTML text`,
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
