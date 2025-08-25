<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-segmented-control type="none">
      <mc-segmented-control-item
        :selected="page == Number($route.params.id)"
        v-for="page in Array.from({ length: 5 }, (_, i) => i + 1)"
        :key="page"
        ><router-link :to="'/segmented-control-router/' + page">{{ page }}</router-link></mc-segmented-control-item
      >
    </mc-segmented-control>

    <hr />

    <p>Content of page: {{ $route.params.id }}</p>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-segmented-control-item';
import '@maersk-global/mds-components-core/mc-segmented-control';
export default {};
</script>
