import { getSlot, legendSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-radio-group',
    ` <mc-radio name="number" value="One" label="One"></mc-radio>
    <mc-radio name="number" value="Two" label="Two"></mc-radio>`,
    'for passing radio items in the group'
  ),
  legendSlot('mc-radio-group'),
  hintSlot('mc-radio-group'),
  errorMessageSlot('mc-radio-group'),
];
