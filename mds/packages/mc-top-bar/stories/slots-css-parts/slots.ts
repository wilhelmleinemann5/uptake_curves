import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot('default', 'default', 'mc-top-bar', 'content', 'when you want to add mega menu or search box.'),
  getSlot('actions', 'named', 'mc-top-bar', 'actions', 'when you want to add header actions.'),
];
