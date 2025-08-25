import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-input',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`
  ),
  cssPart('label', 'mc-input', 'label', '', '#000000'),
];
