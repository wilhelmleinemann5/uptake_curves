import { fit, eventtype, zindex } from '@maersk-global/mds-dev-utils';

export const arrow = {
  name: 'arrow',
  type: { required: false },
  defaultValue: false,
  description: 'Whether to enable an arrow',
  table: {
    category: 'Style',
  },
  control: {
    type: 'boolean',
  },
};

export const actionkeys = {
  name: 'actionkeys',
  type: { required: false },
  defaultValue: ['Enter', 'Space'],
  description:
    'Keyboard key codes that will trigger opening/closing of the popover when the trigger element is focused.',
  table: {
    category: 'Content',
    type: { summary: 'array' },
    defaultValue: {
      summary: '["Enter", "Space"]',
    },
  },
  control: {
    type: 'object',
    value: ['Enter', 'Space'],
  },
};

export const customtriggerelement = {
  name: 'customtriggerelement',
  type: { required: false },
  defaultValue: null,
  description: 'HTML element to attach the popover to. Can be used instead of `trigger` named slot.',
  table: {
    category: 'Content',
  },
  control: {
    type: 'object',
  },
};

export const position = (componentName: string, defaultValue = 'top-left'): unknown => ({
  name: 'position',
  type: { required: false },
  defaultValue: defaultValue,
  description: `Specifies the position of the ${componentName} in regards to the target element`,
  table: {
    category: 'Style',
    type: {
      summary:
        'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right | top-center | top-right | left-top | left-center | left-bottom | right-top | right-center | right-bottom',
    },
    defaultValue: { summary: defaultValue },
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
});

export const trigger = (componentName: string): unknown => ({
  name: 'trigger',
  type: { required: false },
  defaultValue: 'click',
  description: `Determines the events that cause the ${componentName} to show. Multiple event names are separated by spaces.`,
  table: {
    category: 'Content',
  },
  options: ['click', 'hover', 'hover focus', 'focus', 'contextmenu', 'manual'],
  control: {
    type: 'select',
  },
});

export const width = {
  name: 'width',
  type: { required: false },
  defaultValue: 'auto',
  description:
    "Specifies the width of the popover in CSS units i.e. `200px`. When set to `trigger` the width of the popover will be same as the trigger's.",
  table: {
    category: 'Style',
  },
  control: {
    type: 'text',
  },
};

export const maxwidth = (componentName: string): unknown => ({
  name: 'maxwidth',
  type: { required: false },
  defaultValue: '',
  description: `Specifies the maximum width of the ${componentName} in CSS units i.e. \`200px\`.
  If the viewport's width is smaller than maxwidth, ${componentName} remains smaller than the screen.`,
  table: {
    category: 'Style',
  },
  control: {
    type: 'text',
  },
});

export const maxheight = (componentName: string): unknown => ({
  name: 'maxheight',
  type: { required: false },
  defaultValue: '',
  description: `Specifies the maximum height of the ${componentName} in CSS units i.e. \`200px\`.`,
  table: {
    category: 'Style',
  },
  control: {
    type: 'text',
  },
});

export const modalmode = {
  name: 'modalmode',
  type: { required: false },
  defaultValue: 'none',
  description: `Specifies when the popover should be shown as a modal instead.`,
  table: {
    category: 'State',
  },
  options: ['none', 'x-small-screen'],
  control: {
    type: 'select',
  },
};

export const open = (componentName: string): unknown => ({
  name: 'open',
  type: { required: false },
  defaultValue: false,
  description: `Whether the ${componentName} should be open when created.`,
  table: {
    category: 'State',
  },
  control: {
    type: 'boolean',
  },
});

export const preventcloseonblur = {
  name: 'preventcloseonblur',
  type: { required: false },
  defaultValue: false,
  description: 'Prevent popover from closing when blur event is dispatched. Can be useful when trapping focus.',
  table: {
    category: 'State',
  },
  control: {
    type: 'boolean',
  },
};

export const dontadjustheight = {
  name: 'dontadjustheight',
  type: { required: false },
  defaultValue: false,
  description:
    'By default popover will try to adjust its height and display a scrollbar to always stay in the viewport. Setting this to true disables that behaviour.',
  table: {
    category: 'State',
  },
  control: {
    type: 'boolean',
  },
};

export const opendelay = {
  name: 'opendelay',
  type: { required: false },
  defaultValue: 50,
  description:
    'Delay(in ms) after which the tooltip will open. Only supported when the trigger is set to `hover`. Defaults to 50',
  table: {
    category: 'Content',
  },
  control: {
    type: 'number',
  },
};

export const contextmenuonside = (componentName = 'popover'): unknown => ({
  name: 'contextmenuonside',
  type: { required: false },
  defaultValue: false,
  description: `If true, the ${componentName} will be shown on the side of the trigger element when the trigger is 'contextmenu'.`,
  table: {
    category: 'Style',
  },
  control: {
    type: 'boolean',
  },
});

export default {
  trigger: trigger('popover'),
  arrow,
  actionkeys,
  customtriggerelement,
  position: position('popover'),
  width,
  maxheight: maxheight('popover'),
  maxwidth: maxwidth('popover'),
  modalmode,
  fit,
  zindex: zindex('Set only set if two popovers or a popover and another z-indexed panel need to overlap.'),
  open: open('popover'),
  preventcloseonblur,
  dontadjustheight,
  show: eventtype('show'),
  hide: eventtype('hide'),
  opendelay,
  contextmenuonside: contextmenuonside(),
};
