export const react = (): string =>
  `import { McTable } from '@maersk-global/mds-react-wrapper/components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';
  
<McTable 
  data={data}
  columns={columns}
></McTable>`;
