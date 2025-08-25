export default {
  appearance: {
    name: 'appearance',
    type: { required: false },
    defaultValue: 'default',
    description: 'If not specified, the default value is: default',
    table: {
      category: 'Style',
      type: {
        summary:
          'default | mds-neutral__text-color | mds-neutral--weakest__text-color | mds-neutral--weak__text-color | mds-neutral--inverse__text-color | mds-primary__text-color | mds-secondary__text-color | mds-info__text-color | mds-error__text-color | mds-warning__text-color | mds-success__text-color',
      },
      defaultValue: { summary: 'default' },
    },
    options: [
      'default',
      'mds-neutral__text-color',
      'mds-neutral--weakest__text-color',
      'mds-neutral--weak__text-color',
      'mds-neutral--inverse__text-color',
      'mds-primary__text-color',
      'mds-secondary__text-color',
      'mds-info__text-color',
      'mds-error__text-color',
      'mds-warning__text-color',
      'mds-success__text-color',
    ],
    control: {
      type: 'select',
    },
  },
};
