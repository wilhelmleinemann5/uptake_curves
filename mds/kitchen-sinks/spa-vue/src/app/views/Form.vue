<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <div class="mds-flex mds-gap-400">
      <mc-button label="small" @click="onFitChanged('small')"></mc-button>
      <mc-button label="medium" @click="onFitChanged('medium')"></mc-button>
      <mc-button label="large" @click="onFitChanged('large')"></mc-button>
    </div>
    <mc-step-indicator
      style="display: block; width: 80%; margin: 0 auto"
      :currentindex="stepIndicatorCurrentIndex"
      :labels="stepIndicatorLabels"
      :fit="fit"
    ></mc-step-indicator>
    <form @submit.prevent="onSubmit">
      <div id="Personal" class="mds-grid mds-grid-cols-2" v-if="stepIndicatorCurrentIndex == 0">
        <mc-input name="name" v-model="userForm.name" label="Name" placeholder="Write your full name" :fit="fit"
          ><span slot="hint">Enter your name and surname</span>
        </mc-input>
        <mc-date-range
          name="travelPeriod"
          v-model="userForm.travelPeriod"
          fromlabel="Checkin date"
          tolabel="checkout date"
          :fit="fit"
        ></mc-date-range>
        <mc-input name="address" v-model="userForm.address" placeholder="Write your address" :fit="fit"
          ><span slot="label"
            >Street
            <mc-tooltip v-if="showTooltip">
              <mc-icon slot="trigger" icon="info-circle"></mc-icon>
              <span>The HTML content of the tooltip</span>
            </mc-tooltip>
            <mc-icon v-if="!showTooltip" slot="trigger" icon="info-circle"></mc-icon></span
          ><span slot="hint">Enter your address</span>
        </mc-input>
        <mc-select-native
          name="countryBorn"
          v-model="userForm.countryBorn"
          :options.prop="countries"
          id="countryBorn"
          label="Country of birth"
          placeholder="Select country"
          :fit="fit"
        >
        </mc-select-native>
        <mc-select
          name="countryLiving"
          id="countryLiving"
          label="Where do you currently live"
          placeholder="Select country"
          :fit="fit"
          v-model="userForm.countryLiving"
        >
          <mc-option v-for="country in countries" :key="country.value" :value="country.value">{{
            country.label
          }}</mc-option>
        </mc-select>
        <mc-multi-select
          name="countryLivingPast"
          id="countryLivingPast"
          label="Where did you live before"
          placeholder="Select countries"
          :fit="fit"
          v-model="userForm.countryLivingPast"
        >
          <mc-option v-for="country in countries" :key="country.value" :value="country.value">{{
            country.label
          }}</mc-option>
        </mc-multi-select>
        <mc-input-date name="birthday" v-model="userForm.birthday" label="Birth date" :fit="fit"
          ><span slot="hint">Select your birth date</span>
        </mc-input-date>
        <mc-input-time name="birthtime" v-model="userForm.birthtime" label="Birth time" :fit="fit"
          ><span slot="hint">Select your time of birth</span>
        </mc-input-time>
        <mc-checkbox-group v-model="userForm.genders" legend="Gender" :fit="fit">
          <mc-checkbox
            v-for="item in genderOptions"
            name="gender"
            :key="item"
            :label="item"
            :value="item"
            :fit="fit"
          ></mc-checkbox>
          <span slot="hint">Choose as many as you like</span>
        </mc-checkbox-group>
        <mc-file-upload
          label="Upload your birth certificate"
          :files="userForm.uploadedFiles"
          @input="handleFileUploaded"
        ></mc-file-upload>
        <div class="mds-flex mds-grid-col-span-2 mds-gap-400">
          <mc-button @click="goToStep(1)" trailingicon="chevron-right" :fit="fit">Next step</mc-button>
        </div>
      </div>

      <div class="mds-grid mds-grid-cols-2" id="Interests" v-if="stepIndicatorCurrentIndex == 1">
        <mc-switch-group v-model="userForm.hobbies" legend="What are you hobbies?" :fit="fit">
          <mc-switch
            name="hobbies"
            v-for="hobby in hobbiesOptions"
            :key="hobby"
            :label="hobby"
            :value="hobby"
            :fit="fit"
          ></mc-switch>
          <span slot="hint">Please select as many as you like</span>
        </mc-switch-group>
        <mc-textarea
          name="comments"
          v-model="userForm.comments"
          label="Comment"
          placeholder="Describe what you do in your spare time"
          rows="5"
          maxLength="500"
          :fit="fit"
        >
        </mc-textarea>
        <div class="mds-flex mds-grid-col-span-2 mds-gap-400">
          <mc-button @click="goToStep(0)" variant="outlined" icon="chevron-left" :fit="fit">Previous step </mc-button>
          <mc-button @click="goToStep(2)" trailingicon="chevron-right" :fit="fit">Next step</mc-button>
        </div>
      </div>

      <div class="mds-grid mds-grid-cols-2" id="Work" v-if="stepIndicatorCurrentIndex == 2">
        <mc-radio-group v-model="userForm.employed" legend="Are you currently employed" :fit="fit">
          <mc-radio name="employed" value="1" label="Yes" :fit="fit"></mc-radio>
          <mc-radio name="employed" value="0" label="No" :fit="fit"></mc-radio>
        </mc-radio-group>
        <mc-input
          name="company"
          v-model="userForm.company"
          label="Company"
          placeholder="Write where you work"
          :fit="fit"
          ><span slot="hint">Enter company name</span>
        </mc-input>
        <mc-number-stepper
          v-model="userForm.experience"
          label="Years of experience"
          min="1"
          max="20"
          step="1"
          name="username"
        >
        </mc-number-stepper>
        <mc-multi-select
          name="skills"
          v-model="userForm.skills"
          :options="skillsOptions"
          id="skills"
          variant="multiple"
          label="Skills"
          placeholder="Select your skills"
          :fit="fit"
        >
          <mc-option v-for="skill in skillsOptions" :key="skill" :value="skill">{{ skill }}</mc-option>
        </mc-multi-select>
        <mc-checkbox slot="trigger" name="terms" @input="userForm.terms = $event.target.value" value="agreed" :fit="fit"
          ><span slot="label"
            >I agree to the terms & conditions
            <mc-tooltip>
              <mc-icon slot="trigger" icon="info-circle"></mc-icon>
              <span>The HTML content of the tooltip</span>
            </mc-tooltip></span
          >
          <span slot="hint"
            >You might like to read our full <a href="https://designsystem.maersk.com">terms and conditions</a></span
          ></mc-checkbox
        >
        <div class="mds-flex mds-grid-col-span-2 mds-gap-400">
          <mc-button @click="goToStep(1)" variant="outlined" icon="chevron-left" :fit="fit">Previous step </mc-button>
          <mc-button @click="toggleModal" :fit="fit">Send your application</mc-button>
        </div>
      </div>

      <mc-modal heading="Summary of information you entered" :open="dialogOpen" :fit="fit">
        <div>
          <p>Name: {{ userForm.name }}</p>
          <p>Address: {{ userForm.address }}</p>
          <p>Country of birth: {{ userForm.countryBorn }}</p>
          <p>Country of living: {{ userForm.countryLiving }}</p>
          <p>Country of living in the past: {{ userForm.countryLivingPast }}</p>
          <p>Birthday: {{ userForm.birthday }}</p>
          <p>Birth time: {{ userForm.birthtime }}</p>
          <p>Gender: {{ userForm.genders }}</p>
          <p>Hobbies: {{ userForm.hobbies }}</p>
          <p>Comments: {{ userForm.comments }}</p>
          <p>Is Employed? {{ userForm.employed }}</p>
          <p>Skills: {{ userForm.skills }}</p>
          <p>Company: {{ userForm.company }}</p>
          <p>Years of experience: {{ userForm.experience }}</p>
          <p>Years of experience: {{ userForm.travelPeriod }}</p>
          <p>Agreed to the terms? {{ userForm.terms }}</p>
        </div>
        <mc-button slot="primaryAction" type="submit" variant="filled" dialogAction="ok" :fit="fit">Submit </mc-button>
        <mc-button slot="secondaryAction" variant="outlined" dialogAction="cancel" @click="toggleModal" :fit="fit">
          Cancel</mc-button
        >
      </mc-modal>
    </form>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-step-indicator';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-input';
import '@maersk-global/mds-components-core/mc-date-range';
import '@maersk-global/mds-components-core/mc-input-date';
import '@maersk-global/mds-components-core/mc-input-time';
import '@maersk-global/mds-components-core/mc-select-native';
import '@maersk-global/mds-components-core/mc-multi-select';
import '@maersk-global/mds-components-core/mc-select';
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-checkbox';
import '@maersk-global/mds-components-core/mc-checkbox-group';
import '@maersk-global/mds-components-core/mc-textarea';
import '@maersk-global/mds-components-core/mc-tooltip';
import '@maersk-global/mds-components-core/mc-radio';
import '@maersk-global/mds-components-core/mc-radio-group';
import '@maersk-global/mds-components-core/mc-switch';
import '@maersk-global/mds-components-core/mc-switch-group';
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-number-stepper';
import '@maersk-global/mds-components-core/mc-file-upload';

import { defineComponent, ref, Ref } from 'vue';
import countriesRef from './countries';
import type { IDateRangeValue } from '@maersk-global/mds-components-core-date-range/types';

interface UserForm {
  name: string;
  address: string;
  countryLiving: string;
  countryLivingPast: any;
  countryBorn: any;
  birthday: string;
  birthtime: string;
  genders: string[];
  hobbies: string[];
  comments: string;
  employed: string;
  skills: string[];
  company: string;
  experience: number;
  terms: string;
  travelPeriod?: IDateRangeValue;
  uploadedFiles: any;
}

export default defineComponent({
  data() {
    return {
      userForm: {
        name: 'Jane Doe',
        address: 'Angleton Road 1',
        countryLiving: 'DK',
        countryLivingPast: ['DK', 'PL'],
        countryBorn: [{ label: 'Poland', value: 'PL' }],
        birthday: '1990-01-30',
        birthtime: '23:35',
        genders: [],
        hobbies: [],
        comments: '',
        employed: '0',
        skills: [],
        company: '',
        experience: 3,
        terms: '',
        travelPeriod: undefined,
        uploadedFiles: null,
      } as UserForm,
      showTooltip: false,
    };
  },
  setup() {
    const stepIndicatorCurrentIndex: Ref<number> = ref(0);
    const stepIndicatorLabels: Ref<string[]> = ref(['Personal', 'Interests', 'Work']);
    const countries: Ref<{ label: string; value: string }[]> = ref(countriesRef);
    const genderOptions: Ref<string[]> = ref([
      'Female',
      'Male',
      'Non-binary',
      'Transgender',
      'Intersex',
      'I prefer not to say',
    ]);
    const hobbiesOptions: Ref<string[]> = ref(['Sport', 'Music', 'Art', 'Movies', 'Gaming', 'Books']);
    const skillsOptions: Ref<string[]> = ref(['Javascript', 'React', 'Angular', 'VueJS', 'Go']);
    const dialogOpen: Ref<boolean> = ref(false);
    const fit: Ref<string> = ref('medium');

    const goToStep = (currentindex: number) => {
      stepIndicatorCurrentIndex.value = currentindex;
    };
    const onFitChanged = (fitValue: string) => {
      fit.value = fitValue;
    };

    return {
      stepIndicatorCurrentIndex,
      stepIndicatorLabels,
      countries,
      genderOptions,
      hobbiesOptions,
      skillsOptions,
      dialogOpen,
      goToStep,
      onFitChanged,
      fit,
    };
  },
  methods: {
    toggleModal() {
      this.dialogOpen = !this.dialogOpen;
    },
    onSubmit() {
      alert('Form is submitted!!!');
    },
    onCountrySelected(event: CustomEvent) {
      this.userForm.countryLiving = event.detail.selectedOptions;
    },
    handleFileUploaded(event: CustomEvent) {
      this.userForm.uploadedFiles = event.detail;
    },
  },
});
</script>
