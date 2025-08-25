import { getSlot, legendSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-switch-group',
    ` <mc-switch name="number" value="One" label="One"></mc-switch>
    <mc-switch name="number" value="Two" label="Two"></mc-switch>`,
    'for passing switch items in the group'
  ),
  legendSlot('mc-switch-group'),
  hintSlot('mc-switch-group'),
  errorMessageSlot('mc-switch-group'),
];
