<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-tab-bar :currentindex="$route && $route.params && $route.params.id ? +$route.params.id : 0">
      <mc-tab slot="tab"><router-link to="/tab-bar-router/0">Tab 1</router-link></mc-tab>
      <div slot="panel">Tab 1</div>
      <mc-tab slot="tab"><router-link to="/tab-bar-router/1">Tab 2</router-link></mc-tab>
      <div slot="panel">Tab 2</div>
      <mc-tab slot="tab"><router-link to="/tab-bar-router/2">Tab 3</router-link></mc-tab>
      <div slot="panel">Tab 3</div>
    </mc-tab-bar>

    <hr />
    <mc-button><router-link to="/tab-bar-router/2">Tab 3</router-link></mc-button>

    <hr />

    <p>Current index: {{ $route.params.id }}</p>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';
import '@maersk-global/mds-components-core/mc-button';
export default {};
</script>
