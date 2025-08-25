import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot('default', 'default', 'mc-drawer', 'body as HTML', 'when you want to pass body as HTML to the drawer'),
  getSlot('heading', 'named', 'mc-drawer', 'heading as HTML', 'when you want to pass heading as HTML to the drawer'),
  getSlot('footer', 'named', 'mc-drawer', 'heading as HTML', 'when you want to pass footer as HTML to the drawer'),
];
