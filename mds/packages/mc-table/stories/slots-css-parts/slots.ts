import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot(
    '{rowId}_{columnId}',
    'named',
    'mc-table',
    '<mc-button>Update</mc-button>',
    `when you want to pass other mc-components or your own custom components to the table cell.<br /> 
    The slot is meant to be used together with a loop function within mc-table tag (using i.e. array.map, v-for, *ngFor). 
    See the <a href="/?path=/story/components-table--using-slots">Using slots</a> story for implementation details and code examples. <br />
    The first parameter in the slot name {rowId} is a row id(the component will automatically try to access an \`id\` attribute, 
    you can change that by passing the \`datakey\` attribute), the second {columnId} is the id of the column where custom component should be rendered, i.e. 10_status, 11_status, 12_status, etc`
  ),
  getSlot('caption', 'named', 'mc-table', 'caption', `A slot for a caption for the table.`),
  getSlot(
    '{columnId}_header',
    'named',
    'mc-table',
    'header',
    `Header slot for a column with {columnId} as an \`id\` property.`
  ),
  getSlot(
    '{columnId}_footer',
    'named',
    'mc-table',
    'footer',
    `Footer slot for a column with {columnId} as an \`id\` property.`
  ),
  getSlot('{rowId}_expanded', 'named', 'mc-table', 'expand', `Slot for an expandable row content.`),
];
