import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('button', 'mc-button-group-item', 'button element inside the mc-button-group-item component', '', '#40AB35'),
  cssPart(
    'text-and-icon',
    'mc-button-group-item',
    'text and icon wrapper inside the mc-button-group-item component',
    '',
    '',
    'flex-direction: column;'
  ),
  cssPart(
    'icon',
    'mc-button-group-item',
    'icon element inside the mc-button-group-item component',
    '',
    '',
    'fill: #40AB35;'
  ),
];
