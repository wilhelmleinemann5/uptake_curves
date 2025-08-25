import { errormessage, hint, value } from '@maersk-global/mds-dev-utils';
import { argTypes as multichoiceArgTypes } from '@maersk-global/mds-components-core-multi-choice-fieldset/stories/argTypes';

export const argTypes = {
  ...multichoiceArgTypes,
  errormessage: errormessage('mc-radio-group'),
  hint: hint(`mc-radio-group`),
  value: value('The initial value of the component. It can be passed as a string (i.e. "2")', 'string', '', {
    type: 'text',
  }),
};
