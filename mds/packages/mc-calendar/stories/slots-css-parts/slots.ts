import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'footer',
    'named',
    'mc-calendar',
    'body text as HTML',
    'when you want to pass description with HTML text at the bottom of the calendar'
  ),
];
