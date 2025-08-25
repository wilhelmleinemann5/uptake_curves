import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('notification', 'mc-notification', 'container element inside the mc-notification component'),
  cssPart('icon', 'mc-notification', 'icon element inside the mc-button component', '', '', 'fill: #000000'),
];
