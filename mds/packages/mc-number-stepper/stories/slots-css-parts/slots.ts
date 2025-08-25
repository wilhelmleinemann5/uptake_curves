import { labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  labelSlot('mc-number-stepper', 'named'),
  hintSlot('mc-number-stepper'),
  errorMessageSlot('mc-number-stepper'),
];
