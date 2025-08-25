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

const toggleData = () => {
  mcTable.columns = [defaultColumns[Math.floor(Math.floor(Math.random() * 4))], defaultColumns[Math.floor(Math.floor(Math.random() * 4))]];
}

// HTML
<mc-table></mc-table>
<mc-button onclick="toggleData()">Get random columns in table</mc-button>`,
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
    id: 'capacity',
    label: 'Capacity (t)',
    dataType: {type: 'number'},
  },
  {
    id: 'status',
    label: 'Status',
    nowrap: true,
  },
  {
    id: 'lastPort',
    label: 'Last Port',
    nowrap: true,
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
