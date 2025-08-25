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
mcTable.data = data;
mcTable.columns = columns;

// HTML
<mc-table>
  <div slot="speed_header">
  <div style="display: flex; align-items: center; gap: 0.5rem">
    <mc-icon icon="speedometer"></mc-icon>
    Vessel speed
  </div>
  <span class="mds-neutral--weak__text-color">subtext</span>
  </div>
  <span slot="built_header">
    Vessel built year
  </span>
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
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    dataType: { type: 'number' },
    sortDisabled: true,
  },
  {
    id: 'length',
    label: 'Length (m)',
    dataType: { type: 'number' },
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
