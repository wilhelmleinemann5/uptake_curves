import { getSlot, labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-typeahead',
    '<mc-option></mc-option>',
    'when you want to pass option items to the typeahead'
  ),
  labelSlot('mc-typeahead', 'named'),
  hintSlot('mc-typeahead'),
  errorMessageSlot('mc-typeahead'),
];
