import { getSlot, labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-multi-select',
    '<mc-option></mc-option>',
    'when you want to pass option items, dividers or group headings to the multi select'
  ),
  labelSlot('mc-multi-select', 'named'),
  hintSlot('mc-multi-select'),
  errorMessageSlot('mc-multi-select'),
];
