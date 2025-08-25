import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-typeahead',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`
  ),
  cssPart('label', 'mc-typeahead', 'label', '', '#000000'),
  cssPart('field', 'mc-typeahead', 'input field container', '', '#000000'),
  cssPart('input', 'mc-typeahead', 'input field', '', '#000000'),
  cssPart('icon', 'mc-typeahead', 'icon', '', '', 'fill: #000000'),
];
