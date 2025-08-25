<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <form @submit.prevent="onSubmit">
      <mc-typeahead
        name="countryBorn"
        id="countryBorn"
        label="Which country were you born"
        placeholder="Start typing country name"
        :data="countriesBorn"
        v-model="userForm.countryBorn"
      ></mc-typeahead>
      <mc-typeahead
        name="cityBorn"
        id="cityBorn"
        label="Which city were you born"
        placeholder="Start typing city name"
        :loading="loadingBorn"
        :data="citiesBorn"
        @search="onSearchCitiesBorn"
        v-model="userForm.cityBorn"
      ></mc-typeahead>
      <mc-typeahead
        name="countryLiving"
        id="countryLiving"
        label="Which country do you currently live"
        placeholder="Start typing country name"
        v-model="userForm.countryLiving"
      >
        <mc-option v-for="country in countriesLiving" :key="country.value" :value="country.value">{{
          country.label
        }}</mc-option>
      </mc-typeahead>
      <mc-typeahead
        name="cityLiving"
        id="cityLiving"
        label="Which city do you currently live"
        placeholder="Start typing city name"
        :loading="loadingLiving"
        @search="onSearchCitiesLiving"
        v-model="userForm.cityLiving"
      >
        <mc-option v-for="city in citiesLiving" :key="city.value" :value="city.value" :sublabel="city.sublabel">{{
          city.label
        }}</mc-option>
      </mc-typeahead>
      <hr />
      <mc-typeahead
        name="citiesRo1"
        id="citiesRo1"
        label="City 1 in Romania"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCitiesRo"
        :data="citiesRo"
      ></mc-typeahead>
      <mc-typeahead
        name="citiesRo2"
        id="citiesRo2"
        label="City 2 in Romania"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCitiesRo"
        :data="citiesRo"
      ></mc-typeahead>
      <mc-typeahead
        name="citiesRo3"
        id="citiesRo3"
        label="City 3 in Romania"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCitiesRo"
        :data="citiesRo"
      ></mc-typeahead>
      <mc-typeahead
        name="countryCode1"
        id="countryCode1"
        label="Country calling codes 1"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCountryCodes"
        :data="countryCodes"
      ></mc-typeahead>
      <mc-typeahead
        name="countryCode2"
        id="countryCode2"
        label="Country calling codes 2"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCountryCodes"
        :data="countryCodes"
      ></mc-typeahead>
      <mc-typeahead
        name="countryCode3"
        id="countryCode3"
        label="Country calling codes 3"
        showlistonfocus
        maxoptions="3000"
        :loading="loadingCountryCodes"
        :data="countryCodes"
      ></mc-typeahead>
      <mc-button type="submit" variant="filled">Submit</mc-button>
    </form>
  </section>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-loading-indicator';

import { apiService } from './api-service';

import { defineComponent, ref, Ref } from 'vue';
import countryLivingRef from './countries';
import countryBornRef from './countries';
import citiesRoRef from './citiesRo';

const phoneCountryCodes = [
  { label: '+93 Afghanistan', value: '93' },
  { label: '+355 Albania', value: '355' },
  { label: '+213 Algeria', value: '213' },
  { label: '+1 Andorra', value: '1' },
  { label: '+244 Angola', value: '244' },
  { label: '+1 Anguilla', value: '1' },
  { label: '+54 Argentina', value: '54' },
  { label: '+374 Armenia', value: '374' },
  { label: '+297 Aruba', value: '297' },
  { label: '+61 Australia', value: '61' },
  { label: '+43 Austria', value: '43' },
  { label: '+994 Azerbaijan', value: '994' },
  { label: '+1 Bahamas', value: '1' },
  { label: '+973 Bahrain', value: '973' },
  { label: '+880 Bangladesh', value: '880' },
  { label: '+1 Barbados', value: '1' },
  { label: '+375 Belarus', value: '375' },
  { label: '+32 Belgium', value: '32' },
  { label: '+501 Belize', value: '501' },
  { label: '+229 Benin', value: '229' },
  { label: '+1 Bermuda', value: '1' },
  { label: '+975 Bhutan', value: '975' },
  { label: '+591 Bolivia', value: '591' },
  { label: '+387 Bosnia and Herzegovina', value: '387' },
  { label: '+267 Botswana', value: '267' },
  { label: '+55 Brazil', value: '55' },
  { label: '+1 British Virgin Islands', value: '1' },
  { label: '+673 Brunei', value: '673' },
  { label: '+359 Bulgaria', value: '359' },
  { label: '+226 Burkina Faso', value: '226' },
  { label: '+257 Burundi', value: '257' },
  { label: '+855 Cambodia', value: '855' },
  { label: '+237 Cameroon', value: '237' },
  { label: '+1 Canada', value: '1' },
  { label: '+238 Cape Verde', value: '238' },
  { label: '+1 Cayman Islands', value: '1' },
  { label: '+236 Central African Republic', value: '236' },
  { label: '+56 Chile', value: '56' },
  { label: '+86 China', value: '86' },
  { label: '+61 Christmas Island', value: '61' },
  { label: '+57 Colombia', value: '57' },
  { label: '+269 Comoros', value: '269' },
  { label: '+242 Republic of the Congo', value: '242' },
  { label: '+243 Democratic Republic of the Congo', value: '243' },
  { label: '+682 Cook Islands', value: '682' },
  { label: '+506 Costa Rica', value: '506' },
  { label: '+225 Ivory Coast', value: '225' },
  { label: '+385 Croatia', value: '385' },
  { label: '+53 Cuba', value: '53' },
  { label: '+599 Curaçao', value: '599' },
  { label: '+357 Cyprus', value: '357' },
  { label: '+420 Czech Republic', value: '420' },
  { label: '+45 Denmark', value: '45' },
  { label: '+253 Djibouti', value: '253' },
  { label: '+1 Dominica', value: '1' },
  { label: '+809 Dominican Republic', value: '809' },
  { label: '+670 East Timor', value: '670' },
  { label: '+593 Ecuador', value: '593' },
  { label: '+20 Egypt', value: '20' },
  { label: '+503 El Salvador', value: '503' },
  { label: '+240 Equatorial Guinea', value: '240' },
  { label: '+291 Eritrea', value: '291' },
  { label: '+372 Estonia', value: '372' },
  { label: '+251 Ethiopia', value: '251' },
  { label: '+500 Falkland Islands', value: '500' },
  { label: '+298 Faroe Islands', value: '298' },
  { label: '+679 Fiji', value: '679' },
  { label: '+358 Finland', value: '358' },
  { label: '+33 France', value: '33' },
  { label: '+594 French Guiana', value: '594' },
  { label: '+689 French Polynesia', value: '689' },
  { label: '+241 Gabon', value: '241' },
  { label: '+220 Gambia', value: '220' },
  { label: '+995 Georgia', value: '995' },
  { label: '+49 Germany', value: '49' },
  { label: '+233 Ghana', value: '233' },
  { label: '+350 Gibraltar', value: '350' },
  { label: '+30 Greece', value: '30' },
  { label: '+299 Greenland', value: '299' },
  { label: '+1 Grenada', value: '1' },
  { label: '+590 Guadeloupe', value: '590' },
  { label: '+502 Guatemala', value: '502' },
  { label: '+44 Guernsey', value: '44' },
  { label: '+224 Guinea', value: '224' },
  { label: '+245 Guinea-Bissau', value: '245' },
  { label: '+595 Guyana', value: '595' },
  { label: '+509 Haiti', value: '509' },
  { label: '+504 Honduras', value: '504' },
  { label: '+852 Hong Kong', value: '852' },
  { label: '+36 Hungary', value: '36' },
  { label: '+354 Iceland', value: '354' },
  { label: '+91 India', value: '91' },
  { label: '+62 Indonesia', value: '62' },
  { label: '+964 Iraq', value: '964' },
  { label: '+353 Ireland', value: '353' },
  { label: '+972 Israel', value: '972' },
  { label: '+39 Italy', value: '39' },
  { label: '+1 Jamaica', value: '1' },
  { label: '+81 Japan', value: '81' },
  { label: '+962 Jordan', value: '962' },
  { label: '+7 Kazakhstan', value: '7' },
  { label: '+254 Kenya', value: '254' },
  { label: '+686 Kiribati', value: '686' },
  { label: '+965 Kuwait', value: '965' },
  { label: '+996 Kyrgyzstan', value: '996' },
  { label: '+856 Laos', value: '856' },
  { label: '+371 Latvia', value: '371' },
  { label: '+961 Lebanon', value: '961' },
  { label: '+266 Lesotho', value: '266' },
  { label: '+231 Liberia', value: '231' },
  { label: '+218 Libya', value: '218' },
  { label: '+423 Liechtenstein', value: '423' },
  { label: '+370 Lithuania', value: '370' },
  { label: '+352 Luxembourg', value: '352' },
  { label: '+853 Macau', value: '853' },
  { label: '+389 North Macedonia', value: '389' },
  { label: '+261 Madagascar', value: '261' },
  { label: '+265 Malawi', value: '265' },
  { label: '+60 Malaysia', value: '60' },
  { label: '+960 Maldives', value: '960' },
  { label: '+223 Mali', value: '223' },
  { label: '+356 Malta', value: '356' },
  { label: '+692 Marshall Islands', value: '692' },
  { label: '+596 Martinique', value: '596' },
  { label: '+222 Mauritania', value: '222' },
  { label: '+230 Mauritius', value: '230' },
  { label: '+262 Mayotte', value: '262' },
  { label: '+52 Mexico', value: '52' },
  { label: '+691 Micronesia', value: '691' },
  { label: '+373 Moldova', value: '373' },
  { label: '+377 Monaco', value: '377' },
  { label: '+1 Montserrat', value: '1' },
  { label: '+212 Morocco', value: '212' },
  { label: '+258 Mozambique', value: '258' },
  { label: '+95 Myanmar', value: '95' },
  { label: '+264 Namibia', value: '264' },
  { label: '+674 Nauru', value: '674' },
  { label: '+977 Nepal', value: '977' },
  { label: '+31 Netherlands', value: '31' },
  { label: '+599 Netherlands Antilles', value: '599' },
  { label: '+687 New Caledonia', value: '687' },
  { label: '+64 New Zealand', value: '64' },
  { label: '+505 Nicaragua', value: '505' },
  { label: '+227 Niger', value: '227' },
  { label: '+234 Nigeria', value: '234' },
  { label: '+683 Niue', value: '683' },
  { label: '+850 North Korea', value: '850' },
  { label: '+47 Norway', value: '47' },
  { label: '+968 Oman', value: '968' },
  { label: '+92 Pakistan', value: '92' },
  { label: '+680 Palau', value: '680' },
  { label: '+970 Palestine', value: '970' },
  { label: '+507 Panama', value: '507' },
  { label: '+675 Papua New Guinea', value: '675' },
  { label: '+595 Paraguay', value: '595' },
  { label: '+51 Peru', value: '51' },
  { label: '+63 Philippines', value: '63' },
  { label: '+48 Poland', value: '48' },
  { label: '+1 Puerto Rico', value: '1' },
  { label: '+974 Qatar', value: '974' },
  { label: '+40 Romania', value: '40' },
  { label: '+7 Russia', value: '7' },
  { label: '+250 Rwanda', value: '250' },
  { label: '+590 Saint Barthélemy', value: '590' },
  { label: '+1 Saint Kitts and Nevis', value: '1' },
  { label: '+1 Saint Lucia', value: '1' },
  { label: '+590 Saint Martin', value: '590' },
  { label: '+1 Saint Pierre and Miquelon', value: '1' },
  { label: '+685 Samoa', value: '685' },
  { label: '+378 San Marino', value: '378' },
  { label: '+239 São Tomé and Príncipe', value: '239' },
  { label: '+966 Saudi Arabia', value: '966' },
  { label: '+221 Senegal', value: '221' },
  { label: '+381 Serbia', value: '381' },
  { label: '+248 Seychelles', value: '248' },
  { label: '+232 Sierra Leone', value: '232' },
  { label: '+65 Singapore', value: '65' },
  { label: '+421 Slovakia', value: '421' },
  { label: '+386 Slovenia', value: '386' },
  { label: '+677 Solomon Islands', value: '677' },
  { label: '+252 Somalia', value: '252' },
  { label: '+27 South Africa', value: '27' },
  { label: '+34 Spain', value: '34' },
  { label: '+94 Sri Lanka', value: '94' },
  { label: '+249 Sudan', value: '249' },
  { label: '+597 Suriname', value: '597' },
  { label: '+268 Swaziland', value: '268' },
  { label: '+46 Sweden', value: '46' },
  { label: '+41 Switzerland', value: '41' },
  { label: '+963 Syria', value: '963' },
  { label: '+886 Taiwan', value: '886' },
  { label: '+992 Tajikistan', value: '992' },
  { label: '+255 Tanzania', value: '255' },
  { label: '+66 Thailand', value: '66' },
  { label: '+228 Togo', value: '228' },
  { label: '+690 Tokelau', value: '690' },
  { label: '+676 Tonga', value: '676' },
  { label: '+1 Trinidad and Tobago', value: '1' },
  { label: '+216 Tunisia', value: '216' },
  { label: '+90 Turkey', value: '90' },
  { label: '+993 Turkmenistan', value: '993' },
  { label: '+1 Turks and Caicos Islands', value: '1' },
  { label: '+688 Tuvalu', value: '688' },
  { label: '+256 Uganda', value: '256' },
  { label: '+380 Ukraine', value: '380' },
  { label: '+971 United Arab Emirates', value: '971' },
  { label: '+44 United Kingdom', value: '44' },
  { label: '+1 United States', value: '1' },
  { label: '+598 Uruguay', value: '598' },
  { label: '+998 Uzbekistan', value: '998' },
  { label: '+678 Vanuatu', value: '678' },
  { label: '+39 Vatican City', value: '39' },
  { label: '+58 Venezuela', value: '58' },
  { label: '+84 Vietnam', value: '84' },
  { label: '+1 Virgin Islands', value: '1' },
  { label: '+681 Wallis and Futuna', value: '681' },
  { label: '+967 Yemen', value: '967' },
  { label: '+260 Zambia', value: '260' },
  { label: '+255 Zimbabwe', value: '255' },
];

interface UserForm {
  countryLiving: string;
  countryBorn: string;
  cityLiving: string;
  cityBorn: string;
}

export default defineComponent({
  data() {
    return {
      userForm: {
        countryLiving: 'Denmark',
        countryBorn: 'Poland',
        cityBorn: 'Warsaw',
        cityLiving: 'Copenhagen',
      } as UserForm,
      citiesLiving: [] as any,
      citiesBorn: [] as any,
      loadingLiving: false,
      loadingBorn: false,
      loadingCountryCodes: false,
      countryCodes: [] as any,
      loadingCitiesRo: false,
      citiesRo: [] as any,
    };
  },
  setup() {
    const countriesLiving: Ref<{ label: string; value: string }[]> = ref(
      countryLivingRef.map((country) => ({ label: country.label, value: country.label })),
    );
    const countriesBorn: Ref<{ label: string; value: string }[]> = ref(
      countryBornRef.map((country) => ({ label: country.label, value: country.label })),
    );

    return {
      countriesLiving,
      countriesBorn,
    };
  },
  async mounted() {
    await this.getCountryCodes();
    await this.getCitiesRo();
  },
  methods: {
    onSubmit() {
      alert('Form is submitted!!!');
    },
    async onSearchCitiesLiving(event: CustomEvent<any>) {
      this.citiesLiving = [];
      this.loadingLiving = true;
      const searchText = event.detail;
      await apiService.search(searchText);
      this.citiesLiving = apiService.options;
      this.loadingLiving = false;
    },
    async onSearchCitiesBorn(event: CustomEvent<any>) {
      this.citiesBorn = [];
      this.loadingBorn = true;
      const searchText = event.detail;
      await apiService.search(searchText);
      this.citiesBorn = apiService.options;
      this.loadingBorn = false;
    },
    async getCountryCodes() {
      this.loadingCountryCodes = true;
      return await new Promise((resolve) =>
        setTimeout(() => {
          this.countryCodes = phoneCountryCodes;
          this.loadingCountryCodes = false;
          resolve('done');
        }, 1000),
      );
    },
    async getCitiesRo() {
      console.log('getCitiesRo');
      this.loadingCitiesRo = true;
      return await new Promise((resolve) =>
        setTimeout(() => {
          this.citiesRo = citiesRoRef.map((city) => ({ label: city.cityName, value: city.cityName }));
          this.loadingCitiesRo = false;
          resolve('done');
        }, 1000),
      );
    },
  },
});
</script>
