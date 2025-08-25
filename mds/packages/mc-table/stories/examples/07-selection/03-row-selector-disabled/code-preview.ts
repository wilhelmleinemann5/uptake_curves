import { dataWithSelectDisabled } from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
//your data type if using TypeScript
import type { Vessel } from 'types.ts';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;

//Disable row checkbox for rows with status 'On schedule'.
const shouldDisableRowSelection = (row: Vessel) => {
  return row.status === 'On schedule';
};

mcTable.selectrowdisabled = shouldDisableRowSelection;
// HTML
<mc-table 
  select
></mc-table>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    nowrap: true,
    sortDisabled: true,
  },
  {
    id: 'getQuote',
    label: '',
    nowrap: true,
    sortDisabled: true,
  }
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `Scroll down to the last data entry
    ${JSON.stringify(dataWithSelectDisabled, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
