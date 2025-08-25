import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import { getDataForColumn } from '@maersk-global/mds-components-core/mc-table/utils.js';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;

// HTML
<mc-table footer>
  <div slot="name_footer">Footer for <i>id: name</i></div>
  <div slot="length_footer">Sum: \${getDataForColumn(data, 'length').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
  <div slot="capacity_footer">Sum: \${getDataForColumn(data, 'capacity').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
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
    id: 'length',
    label: 'Length (m)',
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
    dataType: {type: 'number'},
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
