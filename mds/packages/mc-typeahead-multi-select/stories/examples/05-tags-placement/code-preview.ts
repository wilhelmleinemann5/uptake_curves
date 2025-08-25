export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core-input-date';
import '@maersk-global/mds-components-core-typeahead-multi-select';
import '@maersk-global/mds-components-core-tag';

let selectedPorts = [];
let selectedFromDate = null;
let selectedToDate = null;
let typeaheadRef = null;
const ports = [
  { label: "Shanghai", value: "CNSHA", country: "China", region: "Asia" },
  { label: "Singapore", value: "SGSIN", country: "Singapore", region: "Asia" },
  { label: "Rotterdam", value: "NLRTM", country: "Netherlands", region: "Europe" },
  { label: "Hamburg", value: "DEHAM", country: "Germany", region: "Europe" },
  { label: "Los Angeles", value: "USLAX", country: "United States", region: "North America" },
  { label: "New York", value: "USNYC", country: "United States", region: "North America" }
];

const updateSelectionDisplay = () => {
  const selectionContainer = document.querySelector('#selection');
  if (selectionContainer) {
    const allTags = [];

    if (selectedFromDate) {
      allTags.push(\`<mc-tag withaction data-tag-type="from">FROM: \${selectedFromDate}</mc-tag>\`);
    }
    if (selectedToDate) {
      allTags.push(\`<mc-tag withaction data-tag-type="to">TO: \${selectedToDate}</mc-tag>\`);
    }

    selectedPorts.forEach((port) => {
      allTags.push(\`<mc-tag withaction data-tag-type="port">PORT: \${port.label} (\${port.value})</mc-tag>\`);
    });

    selectionContainer.innerHTML = allTags.length > 0 ? allTags.join('') : '<span>No selections made</span>';

    setTimeout(() => {
      const fromTags = selectionContainer.querySelectorAll('mc-tag[data-tag-type="from"]');
      fromTags.forEach((tag) => {
        tag.addEventListener('dismiss', () => {
          selectedFromDate = null;
          const fromInput = document.querySelector('mc-input-date[label="From"]');
          if (fromInput) {
            fromInput.value = '';
          }
          updateSelectionDisplay();
        });
      });

      const toTags = selectionContainer.querySelectorAll('mc-tag[data-tag-type="to"]');
      toTags.forEach((tag) => {
        tag.addEventListener('dismiss', () => {
          selectedToDate = null;
          const toInput = document.querySelector('mc-input-date[label="To"]');
          if (toInput) {
            toInput.value = '';
          }
          updateSelectionDisplay();
        });
      });

      const portTags = selectionContainer.querySelectorAll('mc-tag[data-tag-type="port"]');
      portTags.forEach((tag, index) => {
        tag.addEventListener('dismiss', () => {
          const portToRemove = selectedPorts[index];
          if (typeaheadRef && portToRemove) {
            typeaheadRef.removeSelectedOption(portToRemove);
          }
        });
      });
    }, 0);
  }
};

const handlePortSelection = (event) => {
  selectedPorts = event.detail || [];
  updateSelectionDisplay();
};

const handleDateSelection = (event, dateType) => {
  if (dateType === 'From') {
    selectedFromDate = event.detail;
  } else if (dateType === 'To') {
    selectedToDate = event.detail;
  }
  updateSelectionDisplay();
};

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

    typeaheadRef.addEventListener('optionselected', (event) => {
      handlePortSelection(event);
    });
  }

  const fromDateInput = document.querySelector('mc-input-date[label="From"]');
  if (fromDateInput) {
    fromDateInput.addEventListener('inputdateselected', (event) => handleDateSelection(event, 'From'));
  }

  const toDateInput = document.querySelector('mc-input-date[label="To"]');
  if (toDateInput) {
    toDateInput.addEventListener('inputdateselected', (event) => handleDateSelection(event, 'To'));
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}

// CSS
.wrapper {
  display: flex;
  gap: 16px;
}
.wrapper * {
  width: 200px;
}
.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.tag-wrapper span {
  color: var(--mds_brand_appearance_neutral_weakest_text-color);
  font-style: italic;
}

// HTML
<div class="wrapper">
  <mc-input-date label="From"></mc-input-date>
  <mc-input-date label="To"></mc-input-date>
  <mc-typeahead-multi-select
    name="typeahead"
    label="Port of loading"
    hiddentags
    clearbutton
    placeholder="Start typing port name"
  ></mc-typeahead-multi-select>
</div>
<div id="selection" class="tag-wrapper"><span>No selections made</span></div>`,
    language: 'javascript',
    copy: true,
  },
];
