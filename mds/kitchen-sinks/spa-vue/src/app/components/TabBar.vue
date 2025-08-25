<script setup lang="ts">
// import '@maersk-global/mds-components-core-tab-bar';
import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';
</script>

<template>
  <mc-tab-bar
    ><!-- tab 0: -->
    <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
    <div slot="panel">Info page with lots of information about us.</div>
    <!-- tab 1: -->
    <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
    <div slot="panel">Work page that showcases our work.</div>
    <!-- tab 2: -->
    <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
    <div slot="panel">Hobby page that shows our interests.</div>
    <!-- tab 3: -->
    <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
    <div slot="panel">Contact page that shows our contacts.</div>
    <!-- tab 4: -->
    <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
    <div slot="panel">Address page that shows our addresses.</div></mc-tab-bar
  >
</template>
