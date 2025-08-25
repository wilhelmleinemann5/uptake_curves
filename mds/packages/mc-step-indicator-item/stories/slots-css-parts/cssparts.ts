import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'marker',
    'mc-step-indicator-item',
    'marker element',
    '',
    '',
    `background-color: #40AB35;
  border-color: #40AB35;`
  ),
  cssPart('step', 'mc-step-indicator-item', 'step item inside the mc-step-indicator-item component', '#40AB35', ''),
  cssPart('icon', 'mc-step-indicator-item', 'icon element inside the component', '', '', 'fill: #40AB35;'),
];
