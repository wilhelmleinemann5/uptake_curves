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
  <td style="display: flex; flex-direction: column;" slot="\${row.id}_name">
  <div>\${row.name}</div>
  <div style="display: flex;" class="mds-neutral--weak__text-color mds-text--small-normal"><mc-icon icon="vessel-front"></mc-icon>\${row.type}</div>
</td>
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
