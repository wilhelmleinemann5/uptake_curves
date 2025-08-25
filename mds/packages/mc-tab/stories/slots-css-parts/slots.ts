import { badgeSlot, labelSlot, getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  labelSlot('mc-tab'),
  getSlot(
    'prefix',
    'named',
    'mc-tab',
    '<mc-icon slot="prefix" icon="heart"></mc-icon>',
    'to specify the prefix graphic such as an icon, image or pictogram.',
  ),
  getSlot(
    'suffix',
    'named',
    'mc-tab',
    '<mc-icon slot="suffix" icon="heart"></mc-icon>',
    'to specify the suffix graphic such as an icon, image or pictogram.',
  ),
  badgeSlot('mc-list-item', 'when you want to attach badge to the list item'),
];
