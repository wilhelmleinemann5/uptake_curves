<script setup lang="ts">
// import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-button';
</script>

<template>
  <mc-popover>
    <mc-button slot="trigger">Popover</mc-button>
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 0.5em">
      <h1 style="margin: 0">Available capacity</h1>
      <span>This vessel has 50% capacity left.</span>
      <mc-button label="Book"></mc-button>
    </div>
  </mc-popover>
</template>
