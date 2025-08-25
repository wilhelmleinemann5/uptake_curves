import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
const mcModal = document.querySelector('mc-modal');

mcTable.data = data;
mcTable.columns = columns;

mcTable.customstyles = \`
  .mds-table {
    tr {
      cursor: pointer;
    }
  }
\`;

mcTable.addEventListener('rowclick', (event) => {
  const rowData = event.detail.rowData;
  const modalContent = document.getElementById('modal-content');
  if (!modalContent) return;
  
  modalContent.innerHTML = \`
    <div class="mds mds-content">
      <ul>
        \${Object.entries(rowData)
          .map(([key, value]) => \`<li><strong>\${key}:</strong> \${value}</li>\`)
          .join('')}
      </ul>
    </div>
  \`;
  
  mcModal.open = true;
});

// HTML
<mc-table></mc-table>
<mc-modal heading="More information about the clicked row">
  <div id="modal-content"></div>
  <mc-button slot="primaryAction" dialogaction="close">Close</mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';

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
    id: 'speed',
    label: 'Speed',
    dataType: { type: 'number' },
  }
];

export default columns;`,
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
