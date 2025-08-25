<script setup lang="ts">
// import '@maersk-global/mds-components-core-typeahead';
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-option';
</script>

<template>
  <mc-typeahead
    ><mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three" disabled>Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option></mc-typeahead
  >
</template>
