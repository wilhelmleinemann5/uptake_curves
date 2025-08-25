<template>
  <!-- Default Grid -->
  <div class="mds-grid">
    <div v-for="(item, index) in 24" :key="index">
      {{ item }}
    </div>
  </div>

  <!-- Default Grid with span columns -->
  <div class="mds-grid">
    <div class="mds-grid-col-2 mds-grid-col-span-3">first cell</div>
    <div class="mds-grid-col-3-reverse mds-grid-col-span-3">second cell</div>
  </div>

  <!-- Custom Grid with custom number of columns -->
  <div class="mds-grid mds-xs-cols-1 mds-xs-row-gap-200 mds-s-cols-3 mds-md-cols-8 mds-s-col-gap-600">
    <div v-for="(item, index) in 12" :key="index">
      {{ item }}
    </div>
  </div>
</template>
<style scoped>
.mds-grid {
  margin-bottom: 48px;
}
/* Custom styles for divs */
.mds-grid > *,
.mds-fluid > * {
  background-color: #f0f0f0;
  border: 1px solid #cccccc;
  text-align: center;
}
</style>
