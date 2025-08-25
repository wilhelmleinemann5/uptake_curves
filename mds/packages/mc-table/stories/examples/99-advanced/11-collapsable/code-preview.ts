import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-icon';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
const expandIcon = document.querySelector('#expandIcon');
mcTable.data = [];
mcTable.columns = columns;

let isExpanded = false;

function toggleTableExpansion() {
  isExpanded = !isExpanded;
  const expandIcon = document.getElementById('expandIcon');
  expandIcon.setAttribute('icon', isExpanded ? 'chevron-up' : 'chevron-down');
  mcTable.data = isExpanded ? data : [];
}

// HTML
<mc-table>
  <div slot="actions_header">
    <mc-icon id="expandIcon" icon="chevron-down" style="cursor: pointer;" onclick="toggleTableExpansion()"></mc-icon>
  </div>
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
    id: 'actions',
    label: '',
    sortDisabled: true,
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    sortDisabled: true,
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'speed',
    label: 'Speed',
    dataType: { type: 'number' },
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
