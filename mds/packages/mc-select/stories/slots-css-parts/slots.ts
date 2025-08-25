import { getSlot, labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-select',
    '<mc-option></mc-option>',
    'when you want to pass option items, dividers or group headings to the select'
  ),
  labelSlot('mc-select', 'named'),
  hintSlot('mc-select'),
  errorMessageSlot('mc-select'),
];
