<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <!-- Input row with date inputs and typeahead -->
    <div class="mds-flex mds-gap-200">
      <mc-input-date
        style="width: 200px"
        label="From"
        name="fromDate"
        @inputdateselected="onFromDateSelection"
      ></mc-input-date>

      <mc-input-date
        style="width: 200px"
        label="To"
        name="toDate"
        @inputdateselected="onToDateSelection"
      ></mc-input-date>

      <mc-typeahead-multi-select
        ref="typeaheadRef"
        style="width: 200px"
        name="city"
        label="City"
        placeholder="Start typing city name"
        :loading="loadingCities"
        multiselect
        hiddentags
        :data="cities"
        @search="onSearchCities"
        @optionselected="onCitySelection"
      ></mc-typeahead-multi-select>
    </div>

    <!-- Tags row showing all selections -->
    <div class="mds-flex mds-gap-200">
      <!-- From date tag -->
      <mc-tag v-if="selectedFromDate" withaction @dismiss="removeFromDate"> FROM: {{ selectedFromDate }} </mc-tag>

      <!-- To date tag -->
      <mc-tag v-if="selectedToDate" withaction @dismiss="removeToDate"> TO: {{ selectedToDate }} </mc-tag>

      <!-- City tags -->
      <mc-tag v-for="(city, index) in selectedCities" :key="index" withaction @dismiss="removeCity(city)">
        CITY: {{ city.label }} ({{ city.sublabel }})
      </mc-tag>

      <!-- No selections message -->
      <span
        v-if="!hasSelections"
        style="color: var(--mds_brand_appearance_neutral_weakest_text-color); font-style: italic"
      >
        No selections made
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-typeahead-multi-select';
import '@maersk-global/mds-components-core/mc-input-date';
import '@maersk-global/mds-components-core/mc-tag';

import { apiService, Option } from './api-service';

import { defineComponent } from 'vue';

interface SelectedCity {
  label: string;
  value: string;
  sublabel: string;
}

export default defineComponent({
  data() {
    return {
      cities: [] as Option[],
      loadingCities: false,
      selectedCities: [] as SelectedCity[],
      selectedFromDate: '',
      selectedToDate: '',
    };
  },
  computed: {
    hasSelections(): boolean {
      return !!(this.selectedFromDate || this.selectedToDate || this.selectedCities.length > 0);
    },
  },
  methods: {
    async onSearchCities(event: CustomEvent<any>) {
      this.cities = [];
      this.loadingCities = true;
      const searchText = event.detail;
      await apiService.search(searchText);
      this.cities = apiService.options;
      this.loadingCities = false;
    },

    onCitySelection(event: CustomEvent<any>) {
      if (event.detail) {
        this.selectedCities = (event.detail as SelectedCity[]) || [];
      }
    },

    onFromDateSelection(event: CustomEvent<string>) {
      this.selectedFromDate = event.detail || '';
    },

    onToDateSelection(event: CustomEvent<string>) {
      this.selectedToDate = event.detail || '';
    },

    removeCity(cityToRemove: SelectedCity) {
      const typeaheadRef = this.$refs.typeaheadRef as any;
      if (typeaheadRef) {
        typeaheadRef.removeSelectedOption(cityToRemove);
      }
    },

    removeFromDate() {
      this.selectedFromDate = '';
      const fromInput = document.querySelector('mc-input-date[name="fromDate"]') as any;
      if (fromInput) {
        fromInput.value = '';
      }
    },

    removeToDate() {
      this.selectedToDate = '';
      const toInput = document.querySelector('mc-input-date[name="toDate"]') as any;
      if (toInput) {
        toInput.value = '';
      }
    },
  },
});
</script>

<style scoped>
.mds-flex {
  display: flex;
}

.mds-flex.mds-gap-200 {
  gap: 1rem;
}

.mds-grid {
  display: grid;
}

.mds-grid.mds-grid-cols-1 {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Ensure proper spacing and alignment */
mc-tag {
  margin-bottom: 0.5rem;
}
</style>
