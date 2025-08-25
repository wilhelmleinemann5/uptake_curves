import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-button-group',
    '<mc-button-group-item></mc-button-group-item>',
    'when you want to pass button group items to the button group'
  ),
];
