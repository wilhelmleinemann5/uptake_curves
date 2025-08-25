import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-select',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`,
  ),
  cssPart('label', 'mc-select', 'label', '', '#000000'),
  cssPart('selected-option', 'mc-select', "field's selected option", '', '#000000'),
  cssPart('popover-content', 'mc-select', 'i.e. z-index on popover', '', '', 'z-index: 1000;'),
];
