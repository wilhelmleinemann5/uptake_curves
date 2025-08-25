import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-checkbox',
    'label container',
    '',
    '',
    `align-items: center;
  flex-direction: column;`
  ),
  cssPart('label', 'mc-checkbox', 'label', '', '#328529'),
  cssPart('checkmark', 'mc-checkbox', 'checkmark', '#328529', ''),
];
