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

// HTML
<div style="width: 400px;">
  <mc-table>
  </mc-table>
</div>`,
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
    sticky: 'left',
    width: '120px',
  },
  {
    id: 'built',
    label: 'Built (year)',
    tabularFigures: true,
    align: 'right',
    sticky: 'left',
    width: '10%',
  },
  {
    id: 'type',
    label: 'Type',
    sticky: 'right',
  },
  {
    id: 'length',
    label: 'Length (m)',
  },
  {
    id: 'speed',
    label: 'Speed',
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
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
