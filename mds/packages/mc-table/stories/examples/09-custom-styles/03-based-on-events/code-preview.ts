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

const acceptedIds = [];

const onAcceptClick = (row) => {
  acceptedIds.push(row.id);
  const customStyles = \`
    .mds-table :is(\${acceptedIds.map(id => \`.row-\${id}\`)}) td {
      background-color: var(--mds_brand_appearance_success_weak_background-color);
    }
  \`;
  table.customstyles = customStyles;
};

visibleRows.forEach((row) => {
  const button = document.createElement('mc-button');
  button.textContent = 'Accept';
  button.slot = \`{row.id}_accept\`;
  button.addEventListener('click', () => onAcceptClick(row));
  mcTable.appendChild(button);
});


<mc-table>
</mc-table>
`,
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
  },
  {
    id: 'accept',
    label: '',
    sortDisabled: true,
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
