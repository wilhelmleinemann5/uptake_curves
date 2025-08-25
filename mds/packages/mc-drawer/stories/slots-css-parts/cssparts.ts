import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('dialog', 'mc-drawer', 'the dialog element(parent)'),
  cssPart('header', 'mc-drawer', 'header of the drawer'),
  cssPart('body-wrapper', 'mc-drawer', 'wrapper of the drawer content'),
  cssPart('footer', 'mc-drawer', 'footer of the drawer'),
];
