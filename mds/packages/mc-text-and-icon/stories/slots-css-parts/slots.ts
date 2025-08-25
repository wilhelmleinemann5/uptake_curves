import { getSlot, labelSlot, subLabelSlot, iconSlot, trailingIconSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  labelSlot('mc-text-and-icon'),
  subLabelSlot('mc-text-and-icon'),
  iconSlot('mc-text-and-icon'),
  trailingIconSlot('mc-text-and-icon'),
  getSlot('badge', 'named', 'mc-text-and-icon', 'body text as HTML', 'when you want to attach badge to the avatar.'),
];
