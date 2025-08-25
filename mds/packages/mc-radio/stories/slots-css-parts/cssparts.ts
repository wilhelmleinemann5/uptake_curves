import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-radio',
    'label container',
    '',
    '',
    `align-items: center;
  flex-direction: column;`
  ),
  cssPart('label', 'mc-radio', 'label', '', '#328529'),
  cssPart('checkmark', 'mc-radio', 'checkmark', '#328529', ''),
];
