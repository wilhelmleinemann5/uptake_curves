import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'default',
    'default',
    'mc-menu',
    `<mc-list>
    <mc-list-item></mc-list-item>
  </mc-list>`,
    'when you want to pass menu list items or dividers to the menu',
    'Lists -> Examples'
  ),
  getSlot(
    'trigger',
    'named',
    'mc-menu',
    '<mc-button slot="trigger"></mc-button>',
    'for passing the element that triggers menu (i.e. mc-button, mc-avatar, mc-icon)'
  ),
];
