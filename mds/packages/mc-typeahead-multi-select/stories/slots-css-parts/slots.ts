import { getSlot, labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-typeahead-multi-select',
    '<mc-option></mc-option>',
    'when you want to pass option items to the typeahead-multi-select',
  ),
  labelSlot('mc-typeahead-multi-select', 'named'),
  hintSlot('mc-typeahead-multi-select'),
  errorMessageSlot('mc-typeahead-multi-select'),
];
