import { getSlot, legendSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-checkbox-group',
    ` <mc-checkbox name="number" value="One" label="One"></mc-checkbox>
    <mc-checkbox name="number" value="Two" label="Two"></mc-checkbox>`,
    'for passing checkbox items in the group'
  ),
  legendSlot('mc-checkbox-group'),
  hintSlot('mc-checkbox-group'),
  errorMessageSlot('mc-checkbox-group'),
];
