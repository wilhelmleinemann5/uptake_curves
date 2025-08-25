import { fit, width, appearance, eventtype } from '@maersk-global/mds-dev-utils';

export default {
  duration: {
    name: 'duration',
    type: { required: false },
    defaultValue: '5000',
    description:
      'Specifies the duration for toast visibility. Value should be set in milliseconds. For short messages we recommend to show toast for 5s. For longer content, minimum 10s.',
    table: {
      category: 'Content',
      type: {
        summary: 'number',
      },
      defaultValue: { summary: '5000' },
    },
    control: {
      type: 'text',
    },
  },
  fit,
  appearance: appearance(
    ['neutral-default', 'neutral-inverse', 'info', 'success', 'warning', 'error'],
    'neutral-default'
  ),
  position: {
    name: 'position',
    type: { required: false },
    defaultValue: 'top-right',
    description: 'Specifies the position of the toast on the screen',
    table: {
      category: 'Style',
      type: {
        summary: 'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right',
      },
      defaultValue: { summary: 'top-right' },
    },
    options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    control: {
      type: 'select',
    },
  },
  width: width(
    'The max width of the toast in pixels. If not provided the width will be `auto` but not wider than `480px`'
  ),
  open: {
    name: 'open',
    type: { required: false },
    defaultValue: false,
    description: `Whether the toast should be open when created.`,
    table: {
      category: 'State',
    },
    control: {
      type: 'boolean',
    },
  },
  event: eventtype('close'),
};
