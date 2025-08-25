import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

const sortArrayByProperty = (data, property, order = 'ascending') => {
  return data.sort((a, b) => {
      if (typeof a[property] === 'number' && typeof b[property] === 'number') {
          // For numerical properties
          return order === 'ascending' ? a[property] - b[property] : b[property] - a[property];
      } else {
          // For string properties
          let comparison = 0;
          if (a[property] > b[property]) {
              comparison = 1;
          } else if (a[property] < b[property]) {
              comparison = -1;
          }
          return order === 'ascending' ? comparison : comparison * -1;
      }
  });
}

const handleTableSorted = ({detail: {column, direction}}) => {
  const sortedData = sortArrayByProperty(data, column, direction); 
  const table = document.querySelector('mc-table');
  table.data = [...sortedData];
}

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
<mc-table sortmanual sortdefaultdirection="ascending" sortchange="handleTableSorted" sortdefaultcolumnid="name">
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
