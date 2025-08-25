import { icon, fit, hiddenlabel, href, label, eventtype, target } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  label: label('mc-list-item', 'Apple'),
  fit,
  hiddenlabel: hiddenlabel(),
  href: href('list item'),
  target,
  sublabel: {
    name: 'sublabel',
    type: { required: false },
    defaultValue: 'Apple is a fruit',
    description:
      'Sublabel can be passed as a simple argument like: `sublabel="Apple"` or as a slot. Use argument style for passing short sublabels, use slot when you want to pass sublabel with HTML text.',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'text',
    },
  },
  icon: icon(
    'icon',
    '',
    '',
    'string | slot',
    "Name of the icon. Set to `empty` if you want the icon's space to be preserved but it should appear blank.",
    ['empty'],
  ),
  trailingicon: icon(
    'trailingicon',
    '',
    '',
    'string | slot',
    "Name of the icon. Set to `empty` if you want the icon's space to be preserved but it should appear blank.",
    ['empty'],
  ),
  type: {
    name: 'type',
    type: { required: false },
    defaultValue: 'button',
    table: {
      category: 'Content',
      type: { summary: 'button | checkbox' },
      defaultValue: { summary: 'button' },
    },
    control: {
      type: 'select',
      options: ['button', 'checkbox'],
    },
  },
  disabled: {
    name: 'disabled',
    type: { required: false },
    defaultValue: false,
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  focus: eventtype('focus'),
  blur: eventtype('blur'),
};
