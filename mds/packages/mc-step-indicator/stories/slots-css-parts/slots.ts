import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-step-indicator',
    '<mc-step-indicator-item></mc-step-indicator-item>',
    'when you want to pass step items to the step indicator'
  ),
];
