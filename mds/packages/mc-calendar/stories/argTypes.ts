import { eventtype } from '@maersk-global/mds-dev-utils';
export const calendarCommonArgs = {
  activedate: {
    name: 'activedate',
    type: { required: false },
    defaultValue: '',
    description: `Specifies which year and month to display. Can be used to switch between months/years without selecting a date. It should be passed in ISO format YYYY-MM-DD.
       If left blank, today's month and year is used by default.`,
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  value: {
    name: 'value',
    type: { required: false },
    defaultValue: '',
    description: 'Selected date value, defaults to current date (ISO format YYYY-MM-DD)',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  min: {
    name: 'min',
    type: { required: false },
    defaultValue: '',
    description: 'Define minimal selectable date, unlimited if empty (ISO format YYYY-MM-DD)',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  max: {
    name: 'max',
    type: { required: false },
    defaultValue: '',
    description: 'Define maximal selectable date, unlimited if empty (ISO format YYYY-MM-DD)',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  startofweek: {
    name: 'startofweek',
    type: { required: false },
    defaultValue: 1,
    description: 'Start of the week (0 = Sunday, 1 = Monday, ...)',
    table: {
      category: 'Calendar',
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
    control: {
      type: 'number',
    },
  },
  locale: {
    name: 'locale',
    type: { required: false },
    defaultValue: new Intl.NumberFormat().resolvedOptions().locale,
    description:
      'Locale to render the month/day names in. By default the component will use the users browser language.',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: new Intl.NumberFormat().resolvedOptions().locale },
    },
    control: {
      type: 'text',
    },
  },
  dayperiod: {
    name: 'dayperiod',
    type: { required: false },
    defaultValue: 'short',
    description: 'Format for displaying weekday names in the calendar header.',
    options: ['long', 'short', 'narrow'],
    table: {
      category: 'Calendar',
      type: { summary: '"long" | "short" | "narrow"' },
      defaultValue: { summary: 'short' },
    },
    control: {
      type: 'select',
    },
  },
  previouslabel: {
    name: 'previouslabel',
    type: { required: false },
    defaultValue: 'Previous month',
    description: 'An aria-label to use for the previous month navigation button.',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: 'Previous month' },
    },
    control: {
      type: 'text',
    },
  },
  nextlabel: {
    name: 'nextlabel',
    type: { required: false },
    defaultValue: 'Next month',
    description: 'An aria-label to use for the next month navigation button.',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: 'Next month' },
    },
    control: {
      type: 'text',
    },
  },
  noshadow: {
    name: 'noshadow',
    type: { required: false },
    defaultValue: true,
    description: 'An attribute, which sets `box-shadow` to `none`',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: true },
    },
    control: {
      type: 'boolean',
    },
  },
  noborder: {
    name: 'noborder',
    type: { required: false },
    defaultValue: false,
    description: 'An attribute, which sets `border` to `none`',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  showweeknumbers: {
    name: 'showweeknumbers',
    type: { required: false },
    defaultValue: false,
    description: 'Whether to render week numbers.',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  showadjacentmonthdays: {
    name: 'showadjacentmonthdays',
    type: { required: false },
    defaultValue: false,
    description: 'Whether to render days from the previous and next month.',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  customize: {
    name: 'customize',
    type: { required: false },
    defaultValue: null,
    description:
      'A set of dates to customize. Use to display day indicators or disable selectable days within selectable date range if `min` and `max` are specified. Check the examples for more details.',
    table: {
      category: 'Calendar',
      type: { summary: 'array' },
      defaultValue: { summary: null },
    },
    control: {
      type: 'array',
    },
  },
  customstyles: {
    name: 'customstyles',
    type: { required: false },
    defaultValue: '',
    description: 'Custom styles that can be used in date cells',
    table: {
      category: 'Calendar',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  yearcap: {
    name: 'yearcap',
    type: { required: false },
    defaultValue: 20,
    description: 'How many years backwards and forwards from the current one to render in a month-year picker',
    table: {
      category: 'Calendar',
    },
    control: {
      type: 'number',
    },
  },
  event: eventtype('dateselected'),
};
export const argTypes = calendarCommonArgs;
