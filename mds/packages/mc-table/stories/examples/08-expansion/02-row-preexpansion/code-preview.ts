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
mcTable.columns = default;
mcTable.expandopened = [data.find(row => row.id === 1)];
mcTable.addEventListener('expandchange', onRowExpansionChange);

const onRowSelectionChange = () => {
  const preElement = document.querySelector('#table-pre');
  preElement.innerHTML = 'Expanded items: ' + JSON.stringify(event.detail, null, 2);
}

// HTML
<mc-table
expand
style="width: 100%;"
>
  <div slot="1_expanded">
     Row with datakey="1" expanded content(datakey looks at "id" by default)
  </div>
  <div slot="2_expanded">
    Row with datakey="2" expanded content(datakey looks at "id" by default)
  </div>
</mc-table>
<pre id="table-pre">Expanded items: </pre>`,
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
