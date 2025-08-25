import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

const onRowExpansionChange = () => {
  const preElement = document.querySelector('#table-pre');
  preElement.innerHTML = 'Expanded items: ' + JSON.stringify(event.detail, null, 2);
}

const mcTable = document.querySelector('#main-table');
mcTable.data = data;
mcTable.columns = columns;
mcTable.expandopened = [data.find(row => row.id === 2)];
mcTable.addEventListener('expandchange', onRowExpansionChange);
let visibleRows = mcTable.getVisibleRows();

//data set for rows with ID as a key. Simplified implementation with static ids.
const dataSet ={
  '1': data,
  '2': secondDataSet,
  '3': thirdDataSet
};

let tables = [];

visibleRows.forEach(row => {
  if(!dataSet[row.id]) {
    return;
  };
  const nestedTable = document.createElement('mc-table');
  nestedTable.data = dataSet[row.id];
  nestedTable.columns = columns;
  nestedTable.slot = \`\${row.id}_expanded\`
  tables.push(nestedTable);
});

tables.forEach(table => {
  mcTable.appendChild(table);
});

// HTML
<mc-table 
  id="main-table"
  expand
  sortdisabled
  style="width: 100%;"
>
</mc-table>
<pre id="table-pre">Expanded items: </pre>
    language: 'javascript',
    copy: true,
  },
];`,
    language: 'javascript',
  },
  {
    label: 'Vue 3',
    template: `
    <template>
    <section class="mds-content layout layout--center">
      <div class="layout--m layout--margin-32">
        <mc-table :data="data" :columns="columns" expand sortdisabled :expandopened="['22']">
          <template v-for="row in data" :key="row.id">
            <mc-table
              v-if="getDataForExpandedTable(row)"
              :data="getDataForExpandedTable(row)"
              :columns="columns"
              :slot="\`\${row.id}_expanded\`"
              stateslotheight="200px"
            >
              <mc-loading-indicator slot="state" v-if="+loadingId === +row.id"></mc-loading-indicator>
            </mc-table>
          </template>
        </mc-table>
        <mc-button @click="replaceSecondRowData">Repalce data in 2nd row</mc-button>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  //simplified example of nested table with expandable rows. Some data is static.
  import '@maersk-global/mds-components-core/mc-button';
  import '@maersk-global/mds-components-core/mc-table';
  import '@maersk-global/mds-components-core/mc-loading-indicator';
  import { reactive, ref } from 'vue';
  
  interface DataRow {
    id: number;
    name: string;
    built: string;
    length: number;
  }
  
  const columns = [
    {
      id: 'name',
      label: 'Name changed',
      align: 'center',
    },
    {
      id: 'built',
      label: 'Built (year) changed',
      dataType: { type: 'number' },
    },
    {
      id: 'length',
      label: 'Length (m) changed',
      dataType: { type: 'number' },
    },
  ];
  const data = ref<DataRow[]>([
    {
      id: 11,
      name: 'Madrid Maersk',
      built: '2017',
      length: 399,
    },
    {
      id: 22,
      name: 'Mary Maersk',
      built: '2013',
      length: 399,
    },
    {
      id: 33,
      name: 'Gerner Maersk',
      built: '2008',
      length: 367,
    },
    {
      id: 44,
      name: 'Emma Maersk',
      built: '2006',
      length: 398,
    },
    {
      id: 55,
      name: 'Johannes Maersk',
      built: '2001',
      length: 216,
    },
    {
      id: 66,
      name: 'Svendborg Maersk',
      built: '1998',
      length: 347,
    },
    {
      id: 77,
      name: 'Tove Maersk',
      built: '1992',
      length: 162,
    },
  ]);
  const secondDataSet = ref<DataRow[]>([
    {
      id: 1,
      name: 'Madrid Maersk 2',
      built: '2017',
      length: 399,
    },
    {
      id: 2,
      name: 'Mary Maersk 2',
      built: '2013',
      length: 399,
    },
    {
      id: 3,
      name: 'Gerner Maersk 2',
      built: '2008',
      length: 367,
    },
    {
      id: 4,
      name: 'Emma Maersk 2',
      built: '2006',
      length: 398,
    },
    {
      id: 5,
      name: 'Johannes Maersk 2',
      built: '2001',
      length: 216,
    },
    {
      id: 6,
      name: 'Svendborg Maersk 2',
      built: '1998',
      length: 347,
    },
  ]);
  
  const thirdDataSet = ref<DataRow[]>([
    {
      id: 1,
      name: 'Madrid Maersk 3',
      built: '2017',
      length: 399,
    },
    {
      id: 2,
      name: 'Mary Maersk 3',
      built: '2013',
      length: 399,
    },
    {
      id: 3,
      name: 'Gerner Maersk 3',
      built: '2008',
      length: 367,
    },
    {
      id: 4,
      name: 'Emma Maersk 3',
      built: '2006',
      length: 398,
    },
    {
      id: 5,
      name: 'Johannes Maersk 3',
      built: '2001',
      length: 216,
    },
    {
      id: 6,
      name: 'Svendborg Maersk 3',
      built: '2001',
      length: 216,
    },
  ]);
  
  const dataForReplacement = [
    {
      id: 1,
      name: 'replaced',
      built: '2017',
      length: 399,
    },
    {
      id: 2,
      name: 'replaced',
      built: '2013',
      length: 399,
    },
    {
      id: 3,
      name: 'replaced',
      built: '2008',
      length: 367,
    },
    {
      id: 4,
      name: 'replaced',
      built: '2006',
      length: 398,
    },
    {
      id: 5,
      name: 'replaced',
      built: '2001',
      length: 216,
    },
    {
      id: 6,
      name: 'replaced',
      built: '1998',
      length: 347,
    },
  ];
  
  //data set for rows with ID as a key. Simplified implementation with static keys. In real world app, use JS to generate.
  const dataSet = reactive({
    '11': data.value,
    '22': secondDataSet.value,
    '33': thirdDataSet.value,
  });
  const loadingId = ref('');
  
  const replaceSecondRowData = () => {
    //simulating data fetching from API. You can also fetch data in the handler of the "expandopened" event.
    loadingId.value = '22';
    dataSet['22'] = [...dataForReplacement];
    setTimeout(() => {
      loadingId.value = '';
    }, 2000);
  };
  
  const getDataForExpandedTable = (row: DataRow) => {
    return dataSet[row.id];
  };
  </script>
  
    `,
    language: 'javascript',
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
    id: 'status',
    label: 'Status',
    nowrap: true,
    sortDisabled: true,
  },
  {
    id: 'getQuote',
    label: '',
    nowrap: true,
    sortDisabled: true,
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
