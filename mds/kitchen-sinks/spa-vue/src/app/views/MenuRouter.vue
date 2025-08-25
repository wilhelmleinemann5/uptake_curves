<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-menu>
      <mc-button slot="trigger" icon="bars-horizontal" variant="outlined" appearance="neutral">Menu </mc-button>
      <mc-list>
        <mc-list-item v-for="page in Array.from({ length: 5 }, (_, i) => i + 1)" :key="page"
          ><router-link :to="'/menu-router/' + page">{{ page }}</router-link></mc-list-item
        >
      </mc-list>
    </mc-menu>

    <hr />

    <p>Content of page: {{ $route.params.id }}</p>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-menu';
import '@maersk-global/mds-components-core/mc-list-item';
import '@maersk-global/mds-components-core/mc-list';
import '@maersk-global/mds-components-core/mc-button';
export default {};
</script>
