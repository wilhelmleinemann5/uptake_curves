import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
let tableData = [...data];
mcTable.data = tableData;
mcTable.columns = columns;

// Custom styles for animation
const customStyles = \`
  .mds-table td {
    transition: background-color 400ms ease-out;
  }

  .mds-table .row-new td {
    background-color: var(--mds_brand_appearance_secondary_weak_background-color);
  }

  .row-new > td > div {
    display: grid;
    grid-template-rows: 0fr;
    transition: 300ms grid-template-rows ease;
  }

  .row-new.row-expanded > td > div {
    grid-template-rows: 1fr;
  }

  .row-new > td > div > div {
    overflow: hidden;
  }
\`;

mcTable.customstyles = customStyles;

// Function to wrap row contents
function wrapRowContents(row) {
  row.querySelectorAll('td').forEach((cell) => {
    const wrapper = document.createElement('div');
    const inner = document.createElement('div');
    while (cell.firstChild) {
      inner.appendChild(cell.firstChild);
    }
    wrapper.appendChild(inner);
    cell.appendChild(wrapper);
  });
}

// Function to unwrap row contents
function unwrapRowContents(row) {
  row.querySelectorAll('td > div').forEach((wrapper) => {
    const cell = wrapper.parentNode;
    while (wrapper.firstChild) {
      cell.appendChild(wrapper.firstChild);
    }
    cell.removeChild(wrapper);
  });
}

// Function to add a new row with animation
function addNewRow() {
  const newRow = {
    id: tableData.length + 1,
    name: \`New vessel \${tableData.length + 1}\`,
    type: 'Container ship',
    built: '2023',
    length: 399,
    capacity: 19630,
    inService: true,
    status: 'On schedule',
    speed: '16.2',
    position: 'Track on map',
    lastPort: 'Shanghai',
    lastCountry: 'China',
    lastUpdate: new Date().toLocaleDateString(),
  };
  tableData.push(newRow);
  mcTable.data = [...tableData];

  requestAnimationFrame(() => {
    const newRowElement = mcTable.shadowRoot.querySelector(\`.row-\${newRow.id}\`);
    if (newRowElement) {
      newRowElement.classList.add('row-new');

      wrapRowContents(newRowElement);

      // Trigger reflow to ensure the animation starts
      newRowElement.offsetHeight;
      newRowElement.classList.add('row-expanded');

      setTimeout(() => {
        newRowElement.classList.remove('row-new', 'row-expanded');
        unwrapRowContents(newRowElement);
      }, 400);
    }
  });
}

// HTML
<mc-button onclick="addNewRow()">Add New Row</mc-button>
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
    dataType: { type: 'number' },
  },
  {
    id: 'status',
    label: 'Status',
  },
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
