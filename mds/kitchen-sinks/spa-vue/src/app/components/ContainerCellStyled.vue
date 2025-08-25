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
  <div class="container-cell-styled">
  {{ rowData[cellName] }}
  </div>
</template>
<style scoped>
.container-cell-styled {
  background: pink;
  color: black;
}
</style>
