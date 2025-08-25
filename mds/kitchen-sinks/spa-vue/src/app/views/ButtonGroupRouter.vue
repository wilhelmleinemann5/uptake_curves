<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-button-group>
      <mc-button-group-item v-for="page in Array.from({ length: 5 }, (_, i) => i + 1)" :key="page"
        ><router-link :to="'/button-group-router/' + page">{{ page }}</router-link></mc-button-group-item
      >
    </mc-button-group>

    <hr />

    <p>Content of page: {{ $route.params.id }}</p>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-button-group-item';
import '@maersk-global/mds-components-core/mc-button-group';
export default {};
</script>
