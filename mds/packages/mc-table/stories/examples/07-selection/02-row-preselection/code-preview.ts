import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;
mcTable.selected = data.filter(row => row.id !== 1 && row.id !== 4);
mcTable.addEventListener('selectchange', onRowSelectionChange);

const onRowSelectionChange = () => {
  const preElement = document.querySelector('#table-pre');
  preElement.innerHTML = 'Selected items: ' + JSON.stringify(event.detail, null, 2);
}

// HTML
<mc-table 
  select
  style="width: 100%;"
></mc-table>
<pre id="table-pre">Selected items: </pre>`,
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
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
