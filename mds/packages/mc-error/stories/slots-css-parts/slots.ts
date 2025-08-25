import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot('default', 'default', 'mc-error', 'error text as HTML', 'when you want to pass error message with HTML text'),
];
