import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart(
    'label-container',
    'mc-multi-select',
    'label container',
    '',
    '',
    `display: flex;
  justify-content: flex-end;`,
  ),
  cssPart('label', 'mc-multi-select', 'label', '', '#000000'),
  cssPart('selected-option', 'mc-multi-select', "field's selected options", '', '#000000'),
  cssPart('popover-content', 'mc-multi-select', 'i.e. z-index on popover', '', '', 'z-index: 1000;'),
];
