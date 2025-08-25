export const vue2 = (): string =>
  ` import "@maersk-global/mds-components-core/mc-table";
import data from 'data.json';
import columns from 'columns.js';

<mc-table 
  :data.prop="data"
  :columns.prop="columns"
></mc-table>`;
