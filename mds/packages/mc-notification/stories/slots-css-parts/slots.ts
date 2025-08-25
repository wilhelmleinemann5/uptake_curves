import { getSlot, iconSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot('default', 'default', 'mc-notification', 'body text as HTML', 'when you want to pass text with HTML'),
  getSlot(
    'actions',
    'named',
    'mc-notification',
    `<a href="http://designsystem.maersk.com">Maersk Design System</a> •  
    <a href="http://www.google.com">Google</a>`,
    'when you want to pass info description with HTML text.'
  ),
  iconSlot('mc-notification'),
];
