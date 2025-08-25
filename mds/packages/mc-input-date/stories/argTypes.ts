import {
  hint,
  errormessage,
  label,
  placeholder,
  position,
  name,
  eventtype,
  validationState,
} from '@maersk-global/mds-dev-utils';
import inputArgTypes from '@maersk-global/mds-components-core-input/stories/argTypes';
import { calendarCommonArgs } from '@maersk-global/mds-components-core-calendar/stories/argTypes';

const calendarArgs = { ...calendarCommonArgs };
delete calendarArgs.noshadow;
delete calendarArgs.noborder;
delete calendarArgs.event;

const inputArgs = { ...inputArgTypes };
delete inputArgs.type;
delete inputArgs.trailingicon;
delete inputArgs.prefix;
delete inputArgs.suffix;
delete inputArgs.mask;
delete inputArgs.clickabletrailingicon;
delete inputArgs.trailingiconlabel;

export const inputDateCommonArgs = {
  format: {
    name: 'format',
    type: { required: false },
    defaultValue: 'YYYY-MM-DD',
    description:
      'Date format to be used to populate input field (default YYYY-MM-DD). Check The [day.js website](https://day.js.org/docs/en/display/format) for available formatting options',
    table: {
      category: 'Input Date',
      type: { summary: 'string' },
      defaultValue: { summary: 'YYYY-MM-DD' },
    },
    control: {
      type: 'text',
    },
  },
  open: {
    name: 'open',
    type: { required: false },
    defaultValue: false,
    description: `Whether to open the calendar on render.`,
    table: {
      category: 'Input Date',
    },
    control: { type: 'boolean' },
  },
  usemask: {
    name: 'usemask',
    type: { required: false },
    defaultValue: false,
    description: `Whether to use input mask on the input field. The mask will be based on the provided format YYYY-MM-DD by default.`,
    table: {
      category: 'Input Date',
    },
    control: { type: 'boolean' },
  },
};

export const argTypes = {
  ...calendarArgs,
  calendarposition: position('calendar', 'bottom-left', 'calendarposition', 'Calendar'),
  ...inputDateCommonArgs,
  ...inputArgs,
  name: name('checkin-date'),
  label: label('mc-input-date', 'Arrival date'),
  placeholder: placeholder('YYYY-MM-DD'),
  hint: hint('mc-input-date'),
  rangeUnderflow: validationState(
    'rangeUnderflow',
    'the date is below the minimum',
    ' Pratical example <a href="/?path=/story/components-input-date-examples--validation"">here</a>',
  ),
  rangeOverflow: validationState(
    'rangeOverflow',
    'the date is above the maximum',
    ' Pratical example <a href="/?path=/story/components-input-date-examples--validation">here</a>',
  ),
  errormessage: errormessage('mc-input-date'),
  eventInput: eventtype('invalid', 'Dispatched when the component goes into the invalid state.', 'Validation'),
  value: calendarCommonArgs.value,
  inputdateselected: {
    name: 'inputdateselected',
    type: { required: false },
    defaultValue: null,
    description: `Dispatches only when date is selected in the calendar. Check out the \`Code Preview\` panel to see how to use \`inputdateselected\` event within your framework. While interacting with a component in the Storybook, the event will be dispatched and logged in the \`Actions\` panel.`,
    table: {
      category: 'Events',
      type: { summary: 'event' },
    },
    control: {
      type: 'object',
    },
  },
};
