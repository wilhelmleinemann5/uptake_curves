export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core-typeahead-multi-select';

let typeaheadRef = null;
const ports = [
  { label: "Shanghai", value: "CNSHA", country: "China", region: "Asia" },
  { label: "Singapore", value: "SGSIN", country: "Singapore", region: "Asia" },
  { label: "Rotterdam", value: "NLRTM", country: "Netherlands", region: "Europe" },
  { label: "Hamburg", value: "DEHAM", country: "Germany", region: "Europe" },
  { label: "Los Angeles", value: "USLAX", country: "United States", region: "North America" },
  { label: "New York", value: "USNYC", country: "United States", region: "North America" }
];

const selectedPorts = [
  { label: "Shanghai", value: "CNSHA", country: "China", region: "Asia" },
  { label: "Singapore", value: "SGSIN", country: "Singapore", region: "Asia" },
];

const getTypeaheadRef = () => {
  if (!typeaheadRef) {
    typeaheadRef = document.querySelector('mc-typeahead-multi-select[name="typeahead"]');
  }
  return typeaheadRef;
};

const initializeComponents = () => {
  getTypeaheadRef();
  if (typeaheadRef) {
    typeaheadRef.data = ports.map((harbor) => ({
      label: harbor.label,
      value: harbor.value,
      sublabel: \`\${harbor.country}, \${harbor.region}\`,
    }));

    typeaheadRef.selecteddata = selectedPorts;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}

// HTML
<div class="wrapper">
  <mc-typeahead-multi-select
    name="typeahead"
    label="Port of loading"
    clearbutton
    placeholder="Start typing port name"
  ></mc-typeahead-multi-select>
</div>
<div id="selection" class="tag-wrapper"><span>No selections made</span></div>`,
    language: 'javascript',
    copy: true,
  },
];
