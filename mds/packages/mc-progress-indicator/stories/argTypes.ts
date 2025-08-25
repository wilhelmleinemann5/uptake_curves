import loadingIndicatorArgs from '@maersk-global/mds-components-core-loading-indicator/stories/argTypes';

export const argTypes = {
  ...loadingIndicatorArgs,
  value: {
    name: 'value',
    type: { required: false },
    defaultValue: 50,
    description: 'The current value of the progress indicator',
    table: {
      category: 'Content',
      type: { summary: 'number' },
      defaultValue: { summary: 50 },
    },
    control: {
      type: 'number',
      min: 0,
      max: 100,
    },
  },
  max: {
    name: 'max',
    type: { required: false },
    defaultValue: 100,
    description: 'The maximum value of the progress indicator',
    table: {
      category: 'Content',
      type: { summary: 'number' },
      defaultValue: { summary: 100 },
    },
    control: {
      type: 'number',
      min: 1,
    },
  },
};
