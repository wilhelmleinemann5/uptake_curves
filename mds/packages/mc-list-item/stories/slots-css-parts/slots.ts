import { badgeSlot, labelSlot, iconSlot, subLabelSlot, trailingIconSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  labelSlot('mc-list-item'),
  subLabelSlot('mc-list-item'),
  iconSlot('mc-list-item'),
  trailingIconSlot('mc-list-item'),
  badgeSlot('mc-list-item', 'when you want to attach badge to the list item'),
];
