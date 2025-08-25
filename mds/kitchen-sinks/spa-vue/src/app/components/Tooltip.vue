<script setup lang="ts">
// import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-tooltip';
</script>

<template>
  <mc-tooltip>
    <mc-button slot="trigger">Trigger</mc-button>
    <span>The HTML content of the tooltip</span>
  </mc-tooltip>
</template>
