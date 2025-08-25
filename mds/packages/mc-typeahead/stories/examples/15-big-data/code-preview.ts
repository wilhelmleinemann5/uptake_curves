export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';
import { data } from 'data.js';

const mcTypeahead = document.querySelector('mc-typeahead');
mcTypeahead.data = data.map((city) => ({
  label: city.cityName, 
  value: city.cityName, 
  icon: 'house', 
  sublabel: city.stateName
}));

// HTML
<mc-typeahead 
  name="typeahead"
  label="Cities in Romania"
  showlistonfocus
  maxoptions="3000"
  clearbutton
  placeholder="Click or start typing city name"
></mc-typeahead>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.js',
    template: `export const data = [
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: '',
  stateCode: '',
  cityName: 'Titcov',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Abrud',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Aiud',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Albac',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Alba Iulia',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Almasu Mare',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Arieseni',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Avram Iancu',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Baia De Aries',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Berghin',
  active: true,
},
{
  countryName: 'Romania',
  countryCode: 'RO',
  stateName: 'Alba',
  stateCode: 'AB',
  cityName: 'Bistra',
  active: true,
},
];`,
    language: 'js',
    copy: true,
  },
];
