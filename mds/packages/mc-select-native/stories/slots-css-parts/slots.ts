import { labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  labelSlot('mc-select-native', 'named'),
  hintSlot('mc-select-native'),
  errorMessageSlot('mc-select-native'),
];
