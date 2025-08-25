<script setup lang="ts">
// import '@maersk-global/mds-components-core-table';
import '@maersk-global/mds-components-core/mc-table';
const data = [
  {
    id: 1,
    name: 'Madrid Maersk',
    built: 2017,
  },
  {
    id: 2,
    name: 'Mary Maersk',
    built: 2013,
  },
];
</script>

<template>
  <mc-table :data="data"></mc-table>
</template>
