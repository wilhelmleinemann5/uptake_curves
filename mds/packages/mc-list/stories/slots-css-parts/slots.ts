import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-list',
    '<mc-list-item></mc-list-item>',
    'when you want to pass list items or dividers to the list'
  ),
];
