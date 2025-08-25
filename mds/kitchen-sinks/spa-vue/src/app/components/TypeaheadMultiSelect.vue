<script setup lang="ts">
// import '@maersk-global/mds-components-core-component';
import '@maersk-global/mds-components-core/mc-typeahead-multi-select';
import '@maersk-global/mds-components-core/mc-option';
</script>

<template>
  <mc-typeahead-multi-select
    ><mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three" disabled>Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option></mc-typeahead-multi-select
  >
</template>
