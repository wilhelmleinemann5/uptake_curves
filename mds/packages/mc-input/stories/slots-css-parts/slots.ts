import { labelSlot, hintSlot, errorMessageSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [labelSlot('mc-input', 'named'), hintSlot('mc-input'), errorMessageSlot('mc-input')];
