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
  cssPart('input', 'mc-input', 'input field', '', '#000000'),
  cssPart('icon', 'mc-input', 'icon', '', '', 'fill: #000000'),
];
