<script setup lang="ts">
// import '@maersk-global/mds-components-core-dialog';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-dialog';
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <mc-button id="open-dialog" @click="() => (isOpen = true)">Dialog</mc-button>
  <mc-dialog heading="Heading" :open="isOpen">
    <span class="mds-text--medium-normal" id="dialog-content">
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
      venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
      <p>
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
        ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      </p>
    </span>
    <mc-button slot="primaryAction" appearance="primary" dialogaction="ok" @click="() => (isOpen = false)"
      >OK</mc-button
    >
    <mc-button
      id="cancel-dialog"
      slot="secondaryAction"
      appearance="neutral"
      variant="outlined"
      dialogaction="cancel"
      @click="() => (isOpen = false)"
      >Cancel</mc-button
    >
  </mc-dialog>
</template>
