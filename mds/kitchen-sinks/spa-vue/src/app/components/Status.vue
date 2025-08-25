<template>
  <div>
    <svg height="50" width="50" class="blinking">
      <circle cx="25" cy="25" r="5" :fill="getFill(props.status)" />
      Sorry, your browser does not support inline SVG.
    </svg>
    <button @click="log">Status</button>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['status']);
const log = () => {
  alert(props.status);
};
const getFill = (status: string): string => {
  switch (status) {
    case 'On schedule':
      return 'green';
    case 'Delayed':
      return 'red';
    case 'Stalled':
      return 'yellow';
    default:
      return 'gray';
  }
};
</script>
<style lang="scss">
.blinking {
  animation: 2s blink ease infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
