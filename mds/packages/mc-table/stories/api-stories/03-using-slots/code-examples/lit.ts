export const lit = (): string =>
  ` import "@maersk-global/mds-components-core/mc-table";
import data from 'data.json';
import columns from 'columns.js';

<mc-table 
  .data="data"
  .columns="columns"
>
  \${data.map((row) => html\`<div slot="\${row.id}_status"><i>\${row.status}</i></div>\`)}
</mc-table>`;
