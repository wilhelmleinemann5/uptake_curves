export const vanilla = (): string =>
  `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

// 'data' & 'columns' can't be passed as argument, and should be set programmatically as property
const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;
mcTable.innerHTML = \`\${data.map((row) => \`<div slot="\${row.id}_status"><i>\${row.status}</i></div>\`)}\`;

// HTML
<mc-table></mc-table>`;
