import {
  hint,
  errormessage,
  label,
  placeholder,
  eventtype,
  value,
  listsearch,
  listsearchplaceholder,
  filtertype,
  customfilter,
  matchlabelonly,
} from '@maersk-global/mds-dev-utils';
import inputArgTypes from '@maersk-global/mds-components-core-input/stories/argTypes';

const inputArgs = { ...inputArgTypes };
// props not used with number stepper
delete inputArgs.autocomplete;
delete inputArgs.trailingicon;
delete inputArgs.prefix;
delete inputArgs.suffix;
delete inputArgs.type;
delete inputArgs.eventBlur;
delete inputArgs.eventKeydown;
delete inputArgs.width;
delete inputArgs.mask;
delete inputArgs.keepclearbuttonvisible;
delete inputArgs.clickabletrailingicon;
delete inputArgs.trailingiconlabel;

export default {
  listsearch,
  listsearchplaceholder: listsearchplaceholder(),
  filtertype: filtertype(),
  customfilter: customfilter('Search'),
  matchlabelonly: matchlabelonly('Search'),
  ...inputArgs,
  label: label('mc-select', 'Containers'),
  placeholder: placeholder('Select container type'),
  optionswidth: {
    name: 'optionswidth',
    type: { required: false },
    defaultValue: 'trigger',
    description:
      'Specifies the width of the popover. If set to trigger, the width will be set to the width of the select. If set to auto, the popover width will depend on the width of the items inside select. It can be also passed as specific value in CSS units i.e. 200px.',
    table: {
      category: 'Style',
      type: { summary: 'trigger | auto | string' },
      defaultValue: { summary: 'trigger' },
    },
    control: {
      type: 'text',
    },
  },
  optionsheight: {
    name: 'optionsheight',
    type: { required: false },
    defaultValue: '',
    description:
      'Specifies the maximum height of the popover in CSS units i.e. 200px. If not provided, the height will be automatically calculated based on the space available.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  hint: hint('mc-select'),
  errormessage: errormessage('mc-select'),
  eventOptionselected: eventtype('optionselected'),
  eventOpened: eventtype('opened'),
  eventClosed: eventtype('closed'),

  value: value(
    'The initial value, it can be passed a primitive value like string or number, or a complex object',
    'string | number | object',
    '',
  ),
};
