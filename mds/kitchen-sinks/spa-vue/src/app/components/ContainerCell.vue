<script setup>
defineProps({
  rowData: {
    type: Object,
    required: true
  },
  cellName: {
    type: String,
    required: true
}});
</script>
<template>
  <div class="container-cell">
  {{ rowData[cellName] }}
  </div>
</template>
<style scoped>
.container-cell {
  background: gray;
  color: white;
}
</style>
