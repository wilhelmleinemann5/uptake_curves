import { badgeSlot, getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot('info', 'named', 'mc-avatar', 'body text as HTML', 'when you want to pass info description with HTML text'),
  badgeSlot('mc-avatar', 'when you want to attach badge to the avatar'),
];
