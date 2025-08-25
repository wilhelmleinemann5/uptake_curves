import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'button',
    'mc-segmented-control-item',
    'button element inside the mc-segmented-control-item component',
    '',
    '#40AB35'
  ),
  cssPart(
    'text-and-icon',
    'mc-segmented-control-item',
    'text and icon wrapper inside the mc-segmented-control-item component',
    '',
    '',
    'flex-direction: column;'
  ),
  cssPart(
    'icon',
    'mc-segmented-control-item',
    'icon element inside the mc-segmented-control-item component',
    '',
    '',
    'fill: #40AB35;'
  ),
];
