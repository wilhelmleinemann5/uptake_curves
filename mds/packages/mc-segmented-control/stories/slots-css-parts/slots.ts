import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-segmented-control',
    '<mc-segmented-control-item></mc-segmented-control-item>',
    'when you want to pass segmented control items to the segmented control'
  ),
];
