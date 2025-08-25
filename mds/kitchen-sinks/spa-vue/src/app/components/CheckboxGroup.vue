<script setup lang="ts">
// import '@maersk-global/mds-components-core-checkbox-group';
import '@maersk-global/mds-components-core/mc-checkbox-group';
import '@maersk-global/mds-components-core/mc-checkbox';
</script>

<template>
  <mc-checkbox-group legend="Please select options">
    <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
    <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
    <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
    <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
  </mc-checkbox-group>
</template>
