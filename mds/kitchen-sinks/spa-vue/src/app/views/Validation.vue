<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <form @submit.prevent="onSubmit">
      <h3>Unified error message for all validations</h3>
      <mc-input-date
        name="Birthdate"
        label="Birthdate"
        min="2024-11-02"
        max="2024-11-16"
        errormessage="Invalid date!"
        @invalid="onBirthDateInvalid"
      ></mc-input-date>

      <h3>State-based error messages</h3>
      <mc-input-date
        name="Birthdate"
        label="Birthdate"
        :errormessage="state.errormessage"
        min="2024-11-02"
        max="2024-11-16"
        @invalid="onBirthDateInvalid"
      >
      </mc-input-date>

      <h3>Slotted state-based error messages</h3>
      <mc-input-date name="Birthdate" label="Birthdate" min="2024-11-02" max="2024-11-16" @invalid="onBirthDateInvalid">
        <span slot="errormessage" v-if="state.rangeUnderflow">The date is underflown!</span>
        <span slot="errormessage" v-if="state.rangeOverflow">The date is overflown!</span>
      </mc-input-date>

      <mc-button type="submit">Submit</mc-button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import '@maersk-global/mds-components-core/mc-input-date';
import { McInputDate } from '@maersk-global/mds-components-core/mc-input-date';

import { reactive } from 'vue';
const state = reactive({
  rangeUnderflow: false,
  rangeOverflow: false,
  errormessage: 'Invalid date!',
});

const onSubmit = (event: Event) => {
  const target = event.target as HTMLFormElement;
  console.log("Form's validity state:", target.checkValidity());
};

const onBirthDateInvalid = (event: Event) => {
  const target = event.target as McInputDate;

  /** for the regular approach */
  if (target.validity.rangeUnderflow) {
    state.errormessage = 'The date is underflown!';
  } else if (target.validity.rangeOverflow) {
    state.errormessage = 'The date is overflown!';
  }

  /** for the slotted approach */
  state.rangeUnderflow = target.validity.rangeUnderflow;
  state.rangeOverflow = target.validity.rangeOverflow;
};
</script>
