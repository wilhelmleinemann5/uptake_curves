import { argTypes as inputDateArgTypes } from '@maersk-global/mds-components-core-input-date/stories/argTypes';
import { hiddenlegend, autolayoutdisabled, orientation } from '@maersk-global/mds-dev-utils';

const inputDateArgTypesClone = { ...inputDateArgTypes };
delete inputDateArgTypesClone.activedate;
delete inputDateArgTypesClone.id;
delete inputDateArgTypesClone.inputdateselected;
delete inputDateArgTypesClone.label;
delete inputDateArgTypesClone.value;
delete inputDateArgTypesClone.hint;
delete inputDateArgTypesClone.errormessage;
delete inputDateArgTypesClone.invalid;
delete inputDateArgTypesClone.eventClearbuttonclick;
delete inputDateArgTypesClone.clickabletrailingicon;
delete inputDateArgTypesClone.trailingiconlabel;

export const argTypes = {
  ...inputDateArgTypesClone,
  fromlabel: {
    name: 'fromlabel',
    type: { required: false },
    defaultValue: 'From',
    description:
      'The label associated with the `from` date input. If the `from` label is HTML content, refer to the examples for how to supply it using slots.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: 'From' },
    },
    control: {
      type: 'text',
    },
  },
  tolabel: {
    name: 'tolabel',
    type: { required: false },
    defaultValue: 'To',
    description:
      'The label associated with the `to` date input. If the `to` label is HTML content, refer to the examples for how to supply it using slots.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: 'To' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenlegend,
  legend: {
    name: 'legend',
    type: { required: false },
    defaultValue: '',
    description: 'Fieldset legend can be passed as a property or slot.',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
      defaultValue: { summary: 'Legend' },
    },
    control: {
      type: 'text',
    },
  },
  autolayoutdisabled,
  orientation: orientation('horizontal', 'horizontal'),
  value: {
    name: 'value',
    type: { required: true },
    defaultValue: { from: null, to: null },
    description: 'The value object, where `to` and `from` stand in for the beginning and ending dates.',
    table: {
      category: 'Content',
      type: { summary: 'object' },
    },
    control: {
      type: 'object',
      value: { from: null, to: null },
    },
  },
};
