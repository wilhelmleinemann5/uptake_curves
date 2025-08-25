import data from './data.json';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-pagination';
import '@maersk-global/mds-components-community/mc-table';
const pagination = documnet.querySelector('mc-pagination');
const table = documnet.querySelector('mc-table');
pagination.totalpages = data.length / pageSize;
table.columns = columns;
table.data = data;
table.currentpage = currentpage;
table.recordsperpage = 10;

//HTML
<mc-table datakey="id"></mc-table>
<mc-pagination onpagechange="paginationChangeHandler" />`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns',
    template: `
import { TableColumn } from '@maersk-global/mds-components-community/mc-table/types';
const columns: Array<TableColumn> = [
  {
    id: 'id',
    label: 'ID',
    width: '10%',
  },
  {
    id: 'city',
    label: 'City',
    nowrap: true,
    width: '30%',
  },
  {
    id: 'country',
    label: 'Country',
    nowrap: true,
    width: '25%',
  },
  {
    id: 'countryCode',
    label: 'Code',
    nowrap: true,
    width: '10%',
  },
  {
    id: 'currency',
    label: 'Currency',
    nowrap: true,
    width: '25%',
  },
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
