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
<mc-table caption="Default table with footer" select expand footer verticallinestyle="solid" >
  <div slot="name_footer">Total:</div>
  <div slot="1_expanded">Expanded content</div>
  <div slot="capacity_footer">\${getDataForColumn(data, 'capacity').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
  <div slot="length_footer">\${getDataForColumn(data, 'length').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
</mc-table>

<mc-table caption="Table with disabled placeholder footers" select expand footer disableplaceholderfooters verticallinestyle="solid" >
  <div slot="name_footer">Total:</div>
  <div slot="1_expanded">Expanded content</div>
  <div slot="capacity_footer">\${getDataForColumn(data, 'capacity').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
  <div slot="length_footer">\${getDataForColumn(data, 'length').reduce((acc, val) => acc + val, 0).toLocaleString()}</div>
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
    footerColspan: 3,
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
