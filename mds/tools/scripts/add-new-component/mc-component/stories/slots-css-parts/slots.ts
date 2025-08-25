import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'hypothetical-slot-name',
    'named',
    'mc-component',
    'body text as HTML',
    'when you want to pass text with HTML text.'
  ),
];
