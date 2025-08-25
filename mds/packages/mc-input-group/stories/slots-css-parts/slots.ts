import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    '',
    'default',
    'mc-input-group',
    '<mc-button label="Book shipment"></mc-button><mc-select></mc-select>',
    'when you want to group input components together. Accepts mc-button, mc-input, mc-input-date, mc-input-time, mc-link-button, mc-multi-select, mc-select, mc-menu, mc-select-native, mc-typeahead.'
  ),
  getSlot(
    'legend',
    'named',
    'mc-input-group',
    '<strong>Custom Legend</strong>',
    'when you want to override the legend property with custom HTML content.'
  ),
];
