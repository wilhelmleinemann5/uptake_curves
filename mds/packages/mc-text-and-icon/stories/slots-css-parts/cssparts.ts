import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('text-and-icon', 'mc-text-and-icon', 'container element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-labels', 'mc-text-and-icon', 'text element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-label', 'mc-text-and-icon', 'label element inside the component', '', '', 'gap: 24px;'),
  cssPart('text-and-icon-sublabel', 'mc-text-and-icon', 'sublabel element inside the component', '', '', 'gap: 24px;'),
  cssPart('icon', 'mc-text-and-icon', 'icon elements inside the component', '', '', 'fill: #000000'),
];
