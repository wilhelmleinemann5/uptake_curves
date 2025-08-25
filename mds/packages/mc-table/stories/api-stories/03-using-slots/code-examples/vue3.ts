export const vue3 = (): string =>
  ` import "@maersk-global/mds-components-core/mc-table";
import data from 'data.json';
import columns from 'columns.js';

<mc-table 
  :data.prop="data"
  :columns.prop="columns"
>
  <template v-for="row in data" :key="row.id">
    <div :slot="\`\${row.id}_status\`"><i>{{ row.status }}</i></div>
  </template>
</mc-table>`;
