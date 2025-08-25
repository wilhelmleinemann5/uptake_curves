import { generateData } from './dataset.js';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

let visibleRows = [];
let table = null;

window.addEventListener("DOMContentLoaded", (event) => {
  table = document.querySelector('mc-table');
  const pagination = document.querySelector('mc-pagination');
  pagination.addEventListener('pagechange', paginationChange);
  table.addEventListener('pagechange', paginationChangeTable);
  pagination.totalpages = table.getPageCount(); 

  table.data = data;
  table.columns = columns;
  table.innerHTML = '';
  visibleRows = table.getVisibleRows();
  visibleRows.forEach((row) => {
    table.innerHTML += \`<mc-tooltip slot="\${row.id}_activeAlgo">
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>Info about the data</span>
      </mc-tooltip>
      \`
  });
});

const paginationChangeTable = (e) => {
  table.innerHTML = '';
  visibleRows = e.detail
  visibleRows.forEach((row) => {
    table.innerHTML += \`<mc-tooltip slot="\${row.id}_activeAlgo">
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>Info about the data</span>
      </mc-tooltip>
      \`
  });
};
const paginationChange = (e) => {
  table.currentpage = e.detail;
}

// HTML
<mc-table 
  select
  recordsperpage="5"
  currentpage="1"
>
</mc-table>
<div style="padding-top: 1rem;">
  <mc-pagination></mc-pagination>
</div>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
const columns: Array<TableColumn> = [
  {id: 'id', label: 'Id', align: 'center'},
  {id: 'activeAlgo', label: '', sortDisabled: true, align: 'right'},
  {id: 'product', label: 'Product', align: 'center'},
  {id: 'trade', label: 'Trade', align: 'center'},
  {id: 'weekNumber', label: 'Week number', align: 'center'},
  {id: 'active', label: 'Price Source', sortDisabled: true, width: '125px', align: 'center'},
  {id: 'updatedWhen', label: 'Updated Date (UTC)', align: 'center'},
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(generateData(), null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
