import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('button', 'mc-button', 'button element inside the mc-button component'),
  cssPart('icon', 'mc-button', 'icon element inside the mc-button component', '', '', 'fill: #000000'),
  cssPart('text-and-icon', 'mc-button', 'container element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-labels', 'mc-button', 'text element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-label', 'mc-button', 'label element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-sublabel', 'mc-button', 'sublabel element inside the component', '', '', 'gap: 24px;'),
];
