<script setup lang="ts">
// import '@maersk-global/mds-components-core-menu';
import '@maersk-global/mds-components-core/mc-menu';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-list';
import '@maersk-global/mds-components-core/mc-list-item';
</script>

<template>
  <mc-menu>
    <mc-button slot="trigger" icon="bars-horizontal" variant="outlined" appearance="neutral">Menu </mc-button>
    <mc-list>
      <mc-list-item label="One"></mc-list-item>
      <mc-list-item label="Two"></mc-list-item>
      <mc-list-item label="Three"></mc-list-item>
      <mc-list-item label="Four"></mc-list-item>
      <mc-list-item label="Five"></mc-list-item>
    </mc-list>
  </mc-menu>
</template>
