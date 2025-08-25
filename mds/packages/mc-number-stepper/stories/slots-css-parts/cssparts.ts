import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-number-stepper',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`
  ),
  cssPart('label', 'mc-number-stepper', 'label', '', '#000000'),
  cssPart('input', 'mc-number-stepper', 'input field', '', '#000000'),
];
