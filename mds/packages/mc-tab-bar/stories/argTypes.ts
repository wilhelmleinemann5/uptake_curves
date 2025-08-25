import { currentindex, eventtype, fit } from '@maersk-global/mds-dev-utils';
export const argTypes = {
  currentindex: currentindex(0),
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'default',
    table: {
      category: 'Style',
      type: { summary: 'default | stretched' },
      defaultValue: { summary: 'default' },
    },
    options: ['default', 'stretched'],
    control: {
      type: 'select',
    },
  },
  fit,
  event: eventtype(
    'tabchange',
    `\nThe \`detail\` property of the event argument in your tabchange event handler would give you the selected tab index.
    \n`
  ),
};
