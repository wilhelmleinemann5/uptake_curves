import { badgeSlot, labelSlot, iconSlot, trailingIconSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  labelSlot('mc-button'),
  iconSlot('mc-button'),
  trailingIconSlot('mc-button'),
  badgeSlot('mc-button', 'when you want to attach badge to the button'),
];
