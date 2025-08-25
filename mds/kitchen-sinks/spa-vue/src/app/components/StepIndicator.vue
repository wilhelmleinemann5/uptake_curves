<script setup lang="ts">
// import '@maersk-global/mds-components-core-step-indicator';
import '@maersk-global/mds-components-core/mc-step-indicator';
</script>

<template>
  <mc-step-indicator style="display: block; width: 80%; margin: 0 auto"
    ><mc-step-indicator-item state="completed" label="ETD"></mc-step-indicator-item>
    <mc-step-indicator-item state="completed" label="Release Sent"></mc-step-indicator-item>
    <mc-step-indicator-item state="current" label="Carrier Released"></mc-step-indicator-item>
    <mc-step-indicator-item label="ETA" state="pending"></mc-step-indicator-item
  ></mc-step-indicator>
</template>
