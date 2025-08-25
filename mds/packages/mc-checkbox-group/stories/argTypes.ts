import { errormessage, hint } from '@maersk-global/mds-dev-utils';
import { argTypes as multichoiceArgTypes } from '@maersk-global/mds-components-core-multi-choice-fieldset/stories/argTypes';
export const argTypes = {
  ...multichoiceArgTypes,
  errormessage: errormessage('mc-checkbox-group'),
  hint: hint(`mc-checkbox-group`),
};
