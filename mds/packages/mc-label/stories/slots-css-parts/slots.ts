import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot('default', 'default', 'mc-label', 'label text as HTML', 'when you want to pass label with HTML text'),
];
