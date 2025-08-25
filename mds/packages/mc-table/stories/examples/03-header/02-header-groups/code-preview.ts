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
<mc-table verticallinestyle="solid"></mc-table>`,
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
    width: "60%",
  },
  {
    id: 'updates',
    label: 'Updates',
    align: 'center',
    columns:[
      {
        id: 'inService',
        label: 'In service',
        align: 'center',
        nowrap: true,
      },
      {
        id: 'status',
        label: 'Status',
        nowrap: true,
      },
      {
        id: 'lastPort',
        label: 'Last port',
        nowrap: true,
      },
    ]
  },
  {
    id: 'statistics',
    label: "Statistics",
    align: 'center',
    columns:[
      {
        id: 'length',
        label: 'Length (m)',
        dataType: {type: 'number'},
        nowrap: true,
      },
      {
        id: 'capacity',
        label: 'Capacity (TEU)',
        dataType: {type: 'number'},
        nowrap: true,
      },
    ]
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
