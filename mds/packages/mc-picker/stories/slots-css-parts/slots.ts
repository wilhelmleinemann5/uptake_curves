import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-picker',
    `<mc-picker-item label="January">
  </mc-picker-item>`,
    'when you want to pass picker items to the picker'
  ),
];
