export const angular = (): string =>
  ` import "@maersk-global/mds-components-core/mc-table";
import data from 'data.json';
import columns from 'columns.js';

<mc-table 
  [data]="data"
  [columns]="columns"
></mc-table>`;
