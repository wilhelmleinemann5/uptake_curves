import data from './data.json';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import { format } from '@maersk-global/mds-components-utils';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;
let visibleRows = mcTable.getVisibleRows();

visibleRows.forEach(row => {
  <div slot="\`\${row.id}_latitude\`">
  //By default will use the user's locale. Accepts Intl.NumberFormatOptions.
  slot using format fn: \${format(row.latitude, {type: 'number'})}
  </div>
  <div slot="\`\${row.id}_price\`">
    //By default will use the user's locale. Returns country code when formatting currency.
    slot using format fn: \${format(row.price, {type: 'number', options:{currency: 'DKK'}})}
  </div>
});

const sum = (numbers) =>  numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

// HTML
<mc-table>
  <div slot="price_footer">Sum: \${format(sum(getDataForColumn(data, 'price')), {type: 'number', options:{currency: 'DKK'}})}</div>
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
    label: 'Built',
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'latitude', 
    label: 'Latitude (to 3dp)',
    dataType: {type: 'number', options: {maximumFractionDigits: 3}},
  },
  {
    id: 'longitude',
    label: 'Longitude (to 4dp)',
    dataType: {type: 'number', formatter: (value, row) => \`\${Number(value).toFixed(4)}°\`},
  },
  {
    id: 'price',
    label: 'Price (DKK)',
    dataType: {type: 'number', options: {style: 'currency', currency: 'DKK', }},
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
