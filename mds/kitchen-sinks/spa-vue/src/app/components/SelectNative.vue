<script setup lang="ts">
// import '@maersk-global/mds-components-core-select-native';
import '@maersk-global/mds-components-core/mc-select-native';
const options = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
</script>

<template>
  <mc-select-native :options="options" selectedindex="[0]"></mc-select-native>
</template>
