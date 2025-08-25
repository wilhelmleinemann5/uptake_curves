<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-pagination
      totalpages="20"
      visiblepages="10"
      currentindex="$route && $route.params && $route.params.id ? +$route.params.id : 1"
    >
      <router-link
        :to="'/pagination-router/' + page"
        v-for="page in Array.from({ length: 20 }, (_, i) => i + 1)"
        :key="page"
        >{{ page }}</router-link
      >
    </mc-pagination>

    <hr />
    <mc-button><router-link to="/pagination-router/3">Tab 3</router-link></mc-button>

    <hr />

    <p>Current page: {{ $route.params.id }}</p>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-pagination';
import '@maersk-global/mds-components-core/mc-button';
export default {};
</script>
