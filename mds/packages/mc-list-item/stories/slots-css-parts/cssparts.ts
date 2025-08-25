import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('button', 'mc-list-item', 'button element inside the mc-list-item component', '', '#40AB35'),
  cssPart(
    'text-and-icon',
    'mc-list-item',
    'text and icon wrapper inside the mc-list-item component',
    '',
    '',
    'flex-direction: column;',
  ),
  cssPart('icon', 'mc-list-item', 'icon element inside the mc-list-item component', '', '', 'fill: #40AB35;'),
];
