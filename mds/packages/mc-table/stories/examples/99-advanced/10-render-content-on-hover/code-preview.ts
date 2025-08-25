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

mcTable.addEventListener('rowmouseenter', (event) => {
  const rowId = e.detail.id;
  const actions = document.querySelector(\`.actions-\${rowId}\`);
  actions.style.display = 'flex';
  //hide the original cell content
  const cell = document.querySelector(\`[slot="\${rowId}_lastPort"] .content\`);
  cell.style.display = 'none';
});

mcTable.addEventListener('rowmouseleave', (event) => {
  const rowId = e.detail.id;
  const actions = document.querySelector(\`.actions-\${rowId}\`);
  actions.style.display = 'none';
  //show the original cell content
  const cell = document.querySelector(\`[slot="\${rowId}_lastPort"] .content\`);
  cell.style.display = 'block';
});

visibleRows.forEach(row => {
<div slot="\${row.id}_lastPort">
  <div class="content">\${row.lastPort}</div>
  <div class="actions actions-\${row.id}">
    <mc-button fit="small" icon="eye">View</mc-button>
  </div>
</div>
});

// CSS
.actions {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

// HTML
<mc-table></mc-table>`,
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
    id: 'lastPort',
    label: 'Last Port',
    align: 'right',
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
