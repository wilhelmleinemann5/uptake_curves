import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;
let visibleRows = mcTable.getVisibleRows();

visibleRows.forEach(row => {
  <div slot="\${row.id}_status">
    <svg height="50" width="50">
      <circle cx="25" cy="25" r="5" fill="green" />
    </svg>
  </div>
  <div slot="\${row.id}_getQuote"><mc-button>Get Quote</mc-button></div>
});

// HTML
<mc-table>
</mc-table>`,
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
    sortDisabled: true,
  },
  {
    id: 'built',
    label: 'Built (year)',
    sortDisabled: true,
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'lastUpdate',
    label: 'Updated',
    sorter: 'datetime',
  },
  {
    id: 'status',
    label: 'Status',
    nowrap: true,
    sorter: (a, b) => a[0].localeCompare(b[0]), //06-Sorting alphabetically. The function should sort the items in ascending order.
  },
  {
    id: 'getQuote',
    label: '',
    nowrap: true,
    sortDisabled: true,
  },
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
