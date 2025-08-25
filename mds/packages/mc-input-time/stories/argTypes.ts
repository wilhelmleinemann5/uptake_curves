import { hint, errormessage, label, placeholder, position } from '@maersk-global/mds-dev-utils';
import inputArgTypes from '@maersk-global/mds-components-core-input/stories/argTypes';
import { minutestep, hourstep } from '@maersk-global/mds-components-core-time-picker/stories/argTypes';

const inputArgs = { ...inputArgTypes };
delete inputArgs.type;
delete inputArgs.trailingicon;
delete inputArgs.prefix;
delete inputArgs.suffix;
delete inputArgs.clearbutton;
delete inputArgs.eventClearbuttonClick;
delete inputArgs.keepclearbuttonvisible;
delete inputArgs.eventClearbuttonclick;
delete inputArgs.mask;
delete inputArgs.clickabletrailingicon;
delete inputArgs.trailingiconlabel;

export const inputTimeCommonArgs = {
  minutestep: minutestep('Input Time'),
  hourstep: hourstep('Input Time'),
  timepickerposition: position('timepicker', 'bottom-left', 'timepickerposition', 'Input Time'),
};

export const argTypes = {
  ...inputTimeCommonArgs,
  ...inputArgs,
  label: label('mc-input-time', 'Delivery time'),
  placeholder: placeholder('--:--'),
  hint: hint('mc-input-time'),
  errormessage: errormessage('mc-input-time'),
};
