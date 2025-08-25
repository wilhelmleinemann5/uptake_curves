<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <div class="mds-flex mds-gap-400">
      <mc-button label="small" @click="onFitChanged('small')"></mc-button>
      <mc-button label="medium" @click="onFitChanged('medium')"></mc-button>
      <mc-button label="large" @click="onFitChanged('large')"></mc-button>
    </div>
    <!-- Simple example-->
    <mc-table :fit="fit" :data="data"></mc-table>
    <hr />
    <!-- With custom columns -->
    <mc-table :fit="fit" :data="data" :columns="defaultColumns"></mc-table>
    <hr />
    <!-- With custom cells -->
    <mc-table :fit="fit" :data="data" :columns="defaultColumns">
      <template v-for="row in data" :key="row.id">
        <div :slot="`${row.id}_status`"><Status :status="row.status"></Status> {{ row.status }}</div>
        <mc-button @click="handleGetQuote" :slot="`${row.id}_empty`">Get Quote</mc-button>
      </template>
    </mc-table>
  </section>
</template>

<script setup lang="ts">
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-table';
import Status from '../components/Status.vue';
import { ref } from 'vue';

const fit = ref('medium');

const nameColumn = {
  id: 'name',
  label: 'Name changed',
  align: 'center',
};

const builtColumn = {
  id: 'built',
  label: 'Built (year) changed',
  dataType: { type: 'number' },
};

const lengthColumn = {
  id: 'length',
  label: 'Length (m) changed',
  dataType: { type: 'number' },
};

const statusColumn = {
  id: 'status',
  label: 'Status',
};

const emptyColumn = {
  id: 'empty',
  label: '',
};

const defaultColumns = [nameColumn, builtColumn, lengthColumn, statusColumn, emptyColumn];
const data = [
  {
    id: 1,
    name: 'Madrid Maersk',
    type: 'Container ship',
    built: '2017',
    length: 399,
    capacity: 19630,
    inService: true,
    status: 'On schedule',
    speed: '16.2',
    position: 'Track on map',
    lastPort: 'Shanghai',
    lastCountry: 'China',
  },
  {
    id: 2,
    name: 'Mary Maersk',
    type: 'Container ship',
    built: '2013',
    length: 399,
    capacity: 18270,
    inService: true,
    status: 'Delayed',
    speed: '2.1',
    position: 'Track on map',
    lastPort: 'Busan',
    lastCountry: 'South Korea',
  },
  {
    id: 3,
    name: 'Gerner Maersk',
    type: 'Container ship',
    built: '2008',
    length: 367,
    capacity: 9038,
    inService: true,
    status: 'On schedule',
    speed: '10.7',
    position: 'Track on map',
    lastPort: 'Rotterdam',
    lastCountry: 'Netherlands',
  },
  {
    id: 4,
    name: 'Emma Maersk',
    type: 'Container ship',
    built: '2006',
    length: 398,
    capacity: 15550,
    inService: true,
    status: 'On schedule',
    speed: '13.0',
    position: 'Track on map',
    lastPort: 'Los Angeles',
    lastCountry: 'United States',
  },
  {
    id: 5,
    name: 'Johannes Maersk',
    type: 'Container ship',
    built: '2001',
    length: 216,
    capacity: 283,
    inService: true,
    status: 'Stalled',
    speed: '0.0',
    position: 'Track on map',
    lastPort: 'Yokohama',
    lastCountry: 'Japan',
  },
  {
    id: 6,
    name: 'Svendborg Maersk',
    type: 'Container ship',
    built: '1998',
    length: 347,
    capacity: 8160,
    inService: true,
    status: 'On schedule',
    speed: '5.6',
    position: 'Track on map',
    lastPort: 'Manila',
    lastCountry: 'Philippines',
  },
  {
    id: 7,
    name: 'Tove Maersk',
    type: 'Container ship',
    built: '1992',
    length: 162,
    capacity: 1446,
    inService: false,
    status: 'Unknown',
    speed: '0.0',
    position: 'Track on map',
    lastPort: 'Santos',
    lastCountry: 'Brazil',
  },
];

const onFitChanged = (newFit: string) => {
  fit.value = newFit;
};

const handleGetQuote = () => {
  alert('Here is your quote!');
};
</script>
<style scoped>
.status {
  display: flex;
  align-items: center;
}
</style>
