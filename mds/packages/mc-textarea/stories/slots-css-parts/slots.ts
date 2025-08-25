import { labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  labelSlot('mc-textarea', 'named'),
  hintSlot('mc-textarea'),
  errorMessageSlot('mc-textarea'),
];
