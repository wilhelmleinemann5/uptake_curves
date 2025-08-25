import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    'tab',
    'named',
    'mc-tab-bar',
    '<mc-tab slot="tab">First</mc-tab>',
    'when you want to pass individual tab buttons to the tab-bar'
  ),
  getSlot(
    'panel',
    'named',
    'mc-tab-bar',
    'The HTML content of the first tab.',
    'when you want to specify the HTML content that will be shown when a tab button is clicked. Keep in mind that it must be positioned as a node next to the corresponding tab button.'
  ),
];
