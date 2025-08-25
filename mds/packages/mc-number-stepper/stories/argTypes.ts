import { hint, errormessage, label, placeholder } from '@maersk-global/mds-dev-utils';
import inputArgTypes from '@maersk-global/mds-components-core-input/stories/argTypes';

const inputArgs = { ...inputArgTypes };
// props not used with number stepper
delete inputArgs.autocomplete;
delete inputArgs.loading;
delete inputArgs.variant;
delete inputArgs.type;
delete inputArgs.icon;
delete inputArgs.trailingicon;
delete inputArgs.clearbutton;
delete inputArgs.eventClearbuttonClick;
delete inputArgs.keepclearbuttonvisible;
delete inputArgs.mask;
delete inputArgs.clickabletrailingicon;
delete inputArgs.trailingiconlabel;

export const numberStepperCommonArgs = {
  min: {
    name: 'min',
    description: 'The minimum number that the input should step to',
    type: { required: false },
    defaultValue: '0',
    table: { category: 'Number Stepper', type: { summary: 'string' } },
    control: { type: 'text' },
  },
  max: {
    name: 'max',
    description: 'The maximum number that the input should step to',
    type: { required: false },
    defaultValue: '10',
    table: { category: 'Number Stepper', type: { summary: 'string' } },
    control: { type: 'text' },
  },
  step: {
    name: 'step',
    description: 'The step increment that the +/- steppers will use when clicked',
    type: { required: false },
    defaultValue: '1',
    table: { category: 'Number Stepper', type: { summary: 'string' } },
    control: { type: 'text' },
  },
  minuslabel: {
    name: 'minuslabel',
    description: 'Minus button aria label',
    type: { required: false },
    defaultValue: 'minus',
    table: { category: 'Number Stepper', type: { summary: 'string' } },
    control: { type: 'text' },
  },
  pluslabel: {
    name: 'pluslabel',
    description: 'Plus button aria label',
    type: { required: false },
    defaultValue: 'plus',
    table: { category: 'Number Stepper', type: { summary: 'string' } },
    control: { type: 'text' },
  },
};

export default {
  ...numberStepperCommonArgs,
  ...inputArgs,
  label: label('mc-number-stepper', 'Containers'),
  placeholder: placeholder('Number of containers'),
  hint: hint('mc-number-stepper'),
  errormessage: errormessage('mc-number-stepper'),
};
