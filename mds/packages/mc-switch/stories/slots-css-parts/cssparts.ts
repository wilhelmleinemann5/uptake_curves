import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-switch',
    'label container',
    '',
    '',
    `align-items: center;
  flex-direction: column;`
  ),
  cssPart('label', 'mc-switch', 'label', '', '#328529'),
  cssPart('checkmark', 'mc-switch', 'checkmark', '#328529', ''),
];
