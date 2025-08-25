import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot('default', 'default', 'mc-hint', 'hint text as HTML', 'when you want to pass hint message with HTML text'),
];
