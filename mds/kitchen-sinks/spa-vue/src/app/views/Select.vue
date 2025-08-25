<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <form @submit.prevent="onSubmit">
      <mc-select label="Country" :value="userForm.countryLiving" autofocus @input="onCountryLivingChange">
        <mc-option v-for="country in countriesLiving" :key="country.value" :value="country.value">{{
          country.label
        }}</mc-option>
      </mc-select>
      <mc-select label="City" :value="userForm.cityLiving" @input="userForm.cityLiving = $event.target.value">
        <mc-option v-for="city in citiesLiving" :key="city.value" :value="city.value">{{ city.label }}</mc-option>
      </mc-select>
      <mc-button type="submit" variant="filled">Submit</mc-button>
    </form>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-select';
import '@maersk-global/mds-components-core/mc-option';

import { defineComponent } from 'vue';

const countryLivingData = [
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Norway', value: 'Norway' },
];

const cityLivingData = [
  { parent: 'Denmark', label: 'Copenhagen', value: 'Copenhagen' },
  { parent: 'Denmark', label: 'Aarhus', value: 'Aarhus' },
  { parent: 'Denmark', label: 'Odense', value: 'Odense' },
  { parent: 'Germany', label: 'Berlin', value: 'Berlin' },
  { parent: 'Germany', label: 'Hamburg', value: 'Hamburg' },
  { parent: 'Germany', label: 'Munich', value: 'Munich' },
  { parent: 'Sweden', label: 'Stockholm', value: 'Stockholm' },
  { parent: 'Sweden', label: 'Gothenburg', value: 'Gothenburg' },
  { parent: 'Sweden', label: 'Malmo', value: 'Malmo' },
  { parent: 'Norway', label: 'Oslo', value: 'Oslo' },
  { parent: 'Norway', label: 'Bergen', value: 'Bergen' },
  { parent: 'Norway', label: 'Stavanger', value: 'Stavanger' },
];

interface UserForm {
  countryLiving: string;
  cityLiving: string | null;
}

export default defineComponent({
  data() {
    return {
      userForm: {
        countryLiving: 'Denmark',
        cityLiving: 'Copenhagen',
      } as UserForm,
      countriesLiving: countryLivingData,
    };
  },
  computed: {
    citiesLiving(): { label: string; value: string }[] {
      const data = cityLivingData
        .filter((city) => city.parent === this.userForm.countryLiving)
        .map((city) => ({ label: city.label, value: city.label }));
      return data;
    },
  },
  watch: {
    'userForm.countryLiving': function () {
      const data = cityLivingData
        .filter((city) => city.parent === this.userForm.countryLiving)
        .map((city) => ({ label: city.label, value: city.value }));
      this.citiesLiving = data.length === 0 ? [{ label: '', value: '' }] : data;
    },
  },
  methods: {
    onSubmit() {
      alert('Form is submitted with values: ' + JSON.stringify(this.userForm));
    },
    onCountryLivingChange(event: Event) {
      this.userForm.countryLiving = (event.target as HTMLSelectElement).value;
      this.userForm.cityLiving = '';
    },
  },
});
</script>
