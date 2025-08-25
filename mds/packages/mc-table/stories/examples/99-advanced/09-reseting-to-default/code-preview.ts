import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
const selectionButton = document.getElementById('selectionButton');
const resetButton = document.getElementById('resetButton');

mcTable.data = data;
mcTable.columns = columns;
mcTable.selected = [data[0]];

const resetSelection = () => {
  mcTable.resetRowSelection();
}
const resetSorting = () => {
  mcTable.resetSorting();
}

selectionButton.addEventListener('click', resetSelection);
resetButton.addEventListener('click', resetSorting);

// HTML
<mc-table select></mc-table>
<mc-button id="selectionButton">reset selection</mc-button>
<mc-button id="resetButton">reset sorting</mc-button>`,
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
    id: 'status',
    label: 'Status',
  },
  {
    id: 'getQuote',
    label: '',
    sortDisabled: true,
  }
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
