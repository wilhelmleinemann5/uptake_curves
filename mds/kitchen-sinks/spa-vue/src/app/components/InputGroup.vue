<script setup lang="ts">
// import '@maersk-global/mds-components-core-component';
import '@maersk-global/mds-components-core/mc-input-group';
import '@maersk-global/mds-components-core/mc-select';
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-input';
</script>

<template>
  <mc-input-group>
    <mc-select hiddenlabel label="country code" placeholder="+40">
      <mc-option value="+40">+40</mc-option>
      <mc-option value="+44">+44</mc-option>
      <mc-option value="+45">+45</mc-option>
    </mc-select>
    <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>
  </mc-input-group>
</template>
