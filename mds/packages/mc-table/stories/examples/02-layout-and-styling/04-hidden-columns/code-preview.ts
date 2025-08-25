import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-multi-select';
import '@maersk-global/mds-components-core/mc-option';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
const mcMultiSelect = document.querySelector('mc-multi-select');
mcTable.data = data;
mcTable.columns = columns;

const onOptionSelected = (event) =>{
  const table = document.querySelector('mc-table')
  table.hidecolumns = event.detail.map(el => el.value)
}

const columnIds = columns.map(col => col.id);
mcMultiSelect.addEventListener('optionselected', (event) => onOptionSelected(event))

// CSS
.multi-select-wrapper{
  margin-bottom: 12px;
  max-width: 400px;
}

// HTML
<div class="multi-select-wrapper">
  <mc-multi-select
    label="Hidden columns"
    placeholder="Choose columns to hide"
  >
    \`\${columnIds.map(col => \`<mc-option value="\${col}">\${col}</mc-option>\`)}\`
  </mc-multi-select>
</div>
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
    id: 'built',
    label: 'Built (year)',
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'length',
    label: 'Length (m)',
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
