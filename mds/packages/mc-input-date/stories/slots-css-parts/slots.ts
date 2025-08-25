import { labelSlot, hintSlot, errorMessageSlot, ISlot, getSlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  labelSlot('mc-input-date', 'named'),
  hintSlot('mc-input-date'),
  errorMessageSlot('mc-input-date'),
  getSlot(
    'footer',
    'named',
    'mc-input-date',
    'body text as HTML',
    'when you want to pass description with HTML text at the bottom of the calendar'
  ),
];
