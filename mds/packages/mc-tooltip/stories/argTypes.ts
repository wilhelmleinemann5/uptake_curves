import { width, eventtype, fit, appearance, zindex } from '@maersk-global/mds-dev-utils';
import { opendelay } from '@maersk-global/mds-components-core-popover/stories/argTypes';
export default {
  opendelay,
  position: {
    name: 'position',
    type: { required: false },
    defaultValue: 'top-left',
    description: 'Specifies the position of the tooltip in regards to the target element',
    table: {
      category: 'Style',
      type: {
        summary:
          'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right | top-center | top-right | left-top | left-center | left-bottom | right-top | right-center | right-bottom',
      },
      defaultValue: { summary: 'top-left' },
    },
    options: [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'left-top',
      'left-center',
      'left-bottom',
      'right-top',
      'right-center',
      'right-bottom',
    ],
    control: {
      type: 'select',
    },
  },
  width: width('The max width of the tooltip in pixels. If not provided the width will be `auto`'),
  appearance: appearance(['neutral-default', 'neutral-inverse'], 'neutral-default'),
  fit,
  open: {
    name: 'open',
    type: { required: false },
    defaultValue: false,
    description: 'When set to true, tooltip will be visible',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  zindex: zindex('Set only set if two tooltips or a tooltip and another z-indexed panel need to overlap.'),
  show: eventtype('show'),
  hide: eventtype('hide'),
};
