export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-typeahead-multi-select';
import '@maersk-global/mds-components-core-tag';

let selectedPorts = [];
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
    const allTags: string[] = [];

    // Add port tags with dismiss functionality
    selectedPorts.forEach((port) => {
      allTags.push(\`<mc-tag withaction data-tag-type="port">PORT: \${port.label} (\${port.value})</mc-tag>\`);
    });

    selectionContainer.innerHTML = allTags.length > 0 ? allTags.join('') : '<span>No selections made</span>';

    // Add event listeners to all tags after they're rendered
    setTimeout(() => {
      // Handle port tag dismissals
      const portTags = selectionContainer.querySelectorAll('mc-tag[data-tag-type="port"]');
      portTags.forEach((tag, index) => {
        tag.addEventListener('dismiss', () => {
          const portToRemove = selectedPorts[index];
          if (typeaheadRef && portToRemove) {
            // Call the public removeSelectedOption method with preventPopoverOpen=true
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

const getTypeaheadRef = () => {
  if (!typeaheadRef) {
    typeaheadRef = document.querySelector('mc-typeahead-multi-select[name="typeahead"]');
  }
  return typeaheadRef;
};

const toggleDrawer = () => {
  const drawer = document.querySelector('mc-drawer');
  if (!drawer) return;
  drawer.open = !drawer.open;
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
    const button = document.querySelector('mc-button');
    if (button) {
      button.addEventListener('click', toggleDrawer);
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
  flex-direction: column;
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
<mc-drawer>
  <mc-typeahead-multi-select
    name="typeahead"
    label="Ports"
    clearbutton
    placeholder="Start typing port name"
  ></mc-typeahead-multi-select>
</mc-drawer>
<div class="wrapper">
  <mc-button
    trailingicon="mouse"
    variant="outlined"
    appearance="neutral"
    >Open drawer</mc-button
  >
  <div id="selection" class="tag-wrapper"><span>No selections made</span></div>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
