import { icon, fit, hiddenlabel, href, label } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  label: label('mc-segmented-control-item', 'Apple'),
  fit,
  hiddenlabel: hiddenlabel(),
  href: href('list item'),
  icon: icon(
    'icon',
    '',
    '',
    'string | slot',
    "Name of the icon. Set to `empty` if you want the icon's space to be preserved but it should appear blank.",
    ['empty']
  ),
  trailingicon: icon(
    'trailingicon',
    '',
    '',
    'string | slot',
    "Name of the icon. Set to `empty` if you want the icon's space to be preserved but it should appear blank.",
    ['empty']
  ),
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
  selected: {
    name: 'selected',
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
};
