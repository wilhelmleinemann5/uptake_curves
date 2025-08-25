import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-typeahead-multi-select',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`,
  ),
  cssPart('label', 'mc-typeahead-multi-select', 'label', '', '#000000'),
  cssPart('field', 'mc-typeahead-multi-select', 'input field container', '', '#000000'),
  cssPart('input', 'mc-typeahead-multi-select', 'input field', '', '#000000'),
  cssPart('icon', 'mc-typeahead-multi-select', 'icon', '', '', 'fill: #000000'),
];
