import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('calendar', 'mc-calendar', 'the main container inside the mc-calendar component', '', '', 'padding: 0;'),
  cssPart(
    'button',
    'mc-button',
    'button element inside the calendar component (used together with customstyles property)'
  ),
];
