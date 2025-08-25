<script setup lang="ts">
// import '@maersk-global/mds-components-core-radio-group';
import '@maersk-global/mds-components-core/mc-radio-group';
import '@maersk-global/mds-components-core/mc-radio';
</script>

<template>
  <mc-radio-group legend="Please select options">
    <mc-radio name="fruit" value="Apple" label="Apple" checked></mc-radio>
    <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
    <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
    <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
  </mc-radio-group>
</template>
