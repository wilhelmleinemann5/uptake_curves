<script setup lang="ts">
// import '@maersk-global/mds-components-core-toast';
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-notification';
</script>

<template>
  <mc-toast>
    <mc-button label="Toast" slot="trigger"></mc-button>
    <mc-notification body="Body text"></mc-notification>
  </mc-toast>
</template>
