export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-loading-indicator';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-community/mc-c-table';
const columns = [
  {
    id: 'name',
    label: 'Name',
    width: '100%',
  },
  {
    id: 'capacity',
    label: 'Capacity',
    align: 'right',
    nowrap: true,
  },
  {
    id: 'speed',
    label: 'Speed',
    align: 'right',
    nowrap: true,
  },
];
const table = document.querySelector('mc-c-table');
const loadingIndicator = document.querySelector('mc-loading-indicator');
const button = document.querySelector('mc-button');
function fetchData(){
  table.data = [];
  loadingIndicator.classList.remove('hidden');
  button.classList.add('hidden');
  table.data = fetchDataFromAPI();
  loadingIndicator.classList.add('hidden');
  button.classList.remove('hidden');
}

// CSS
.hidden {
  display: none;
}
.container {
  display:flex;
  flex-direction: column;
  gap: 16px;
}

// HTML
<div class="container">
  <mc-c-table datakey="id"></mc-c-table>
  <mc-loading-indicator label="Fetching data..."></mc-loading-indicator>
  <mc-button class="hidden" onclick="fetchData">Fetch data</mc-button>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
