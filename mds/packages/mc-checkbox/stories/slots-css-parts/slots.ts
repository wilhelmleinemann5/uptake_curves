import { labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  labelSlot('mc-checkbox', 'named'),
  hintSlot('mc-checkbox'),
  errorMessageSlot('mc-checkbox'),
];
