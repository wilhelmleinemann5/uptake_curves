import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-toast',
    '<mc-notification></mc-notification>',
    'when you want to pass notification component to be shown in the toast'
  ),
  getSlot(
    'trigger',
    'named',
    'mc-toast',
    `<mc-button slot="trigger" label="Toast"></mc-button>`,
    'when you want to pass element that will trigger toast.',
    'Examples',
    true
  ),
];
