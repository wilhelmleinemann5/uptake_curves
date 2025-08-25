<script setup lang="ts">
// import '@maersk-global/mds-components-core-switch-group';
import '@maersk-global/mds-components-core/mc-switch-group';
import '@maersk-global/mds-components-core/mc-switch';
</script>

<template>
  <mc-switch-group legend="Please select options">
    <mc-switch name="fruit" value="Apple" label="Apple" checked></mc-switch>
    <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
    <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
    <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
  </mc-switch-group>
</template>
