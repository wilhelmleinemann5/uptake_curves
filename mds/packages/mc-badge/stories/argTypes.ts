import { fitextended, appearance } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  label: {
    name: 'label',
    type: { name: 'string' },
    defaultValue: '100',
    description: 'Label of the badge. It can be a string, i.e. "New" or a number, i.e. "8".',
    table: {
      category: 'Content',
      type: { summary: 'number | string' },
    },
    control: {
      type: 'text',
    },
  },
  max: {
    name: 'max',
    type: { name: 'number' },
    defaultValue: '99',
    description:
      'If the label of the badge is a number, show a "+" if greater than max e.g. 1100 would be displayed as +99. Please note, by design, "max" has a hardcoded upper limit value of 99.',
    table: {
      category: 'Content',
      type: { summary: 'number' },
    },
    control: {
      type: 'number',
    },
  },
  variant: {
    name: 'variant',
    type: { name: 'string' },
    defaultValue: 'default',
    description: 'Variant of the badge which can be a default (for showing number or text) or dot.',
    table: {
      defaultValue: { summary: 'default' },
      category: 'Style',
      type: { summary: 'string' },
    },
    options: ['default', 'dot'],
    control: {
      type: 'select',
    },
  },
  fit: fitextended(['small', 'medium']),
  appearance: appearance(['info', 'success', 'warning', 'error'], 'error'),
  position: {
    name: 'position',
    type: { name: 'string' },
    defaultValue: 'right',
    description:
      'Position of the badge relative to the parent element.\n\rFor inline badge only  `left` & `right` positions are valid.\n\rFor pinned badge only `top` & `bottom` positions are valid.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    options: ['left', 'right', 'top', 'bottom'],
    control: {
      type: 'select',
    },
  },
  distance: {
    name: 'distance',
    type: { name: 'string' },
    defaultValue: 'medium',
    description: 'The distance of the badge relative to the parent element used only for pinned badge.',
    table: {
      defaultValue: { summary: 'medium' },
      category: 'Style',
      type: { summary: 'string' },
    },
    options: ['small', 'medium', 'large'],
    control: {
      type: 'select',
    },
  },
};

export const argTypes_inline = {
  label: argTypes.label,
  max: argTypes.max,
  variant: argTypes.variant,
  fit: argTypes.fit,
  appearance: argTypes.appearance,
  position: argTypes.position,
};

export const argTypes_pinned = {
  label: argTypes.label,
  max: argTypes.max,
  variant: argTypes.variant,
  fit: argTypes.fit,
  appearance: argTypes.appearance,
  position: argTypes.position,
  distance: argTypes.distance,
};
