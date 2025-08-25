import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { ports } from './ports';

const meta: Meta = {
  title: 'Components/Typeahead Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let selectedPorts: string[] = [];
    let typeaheadRef = null;

    const updateSelectionDisplay = () => {
      const selectionContainer = document.querySelector('#selection');
      if (selectionContainer) {
        const allTags: string[] = [];

        // Add port tags with dismiss functionality
        selectedPorts.forEach((port) => {
          allTags.push(`<mc-tag withaction data-tag-type="port">PORT: ${port.label} (${port.value})</mc-tag>`);
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
        typeaheadRef = document.querySelector('mc-typeahead[name="typeahead"]');
      }
      return typeaheadRef;
    };
    const toggleDrawer = () => {
      const drawer = document.querySelector('mc-drawer');
      if (!drawer) return;
      drawer.open = !drawer.open;
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          gap: 16px;
          flex-direction: column;
          width: 600px;
        }
        .tag-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          flex-direction: row;
          width: 100%;
        }
        .tag-wrapper span {
          color: var(--mds_brand_appearance_neutral_weakest_text-color);
          font-style: italic;
        }
      </style>
      <mc-drawer>
        <mc-typeahead-multi-select
          name="typeahead"
          .data="${ports.map((harbor) => ({
            label: harbor.label,
            value: harbor.value,
            sublabel: `${harbor.country}, ${harbor.region}`,
          }))}"
          label="Ports"
          clearbutton
          placeholder="Start typing port name"
          @optionselected=${(event) => {
            handlePortSelection(event);
            getTypeaheadRef();
          }}
        ></mc-typeahead-multi-select>
      </mc-drawer>
      <div class="wrapper">
        <mc-button @click=${toggleDrawer} trailingicon="mouse" variant="outlined" appearance="neutral"
          >Open drawer</mc-button
        >
        <div id="selection" class="tag-wrapper"><span>No selections made</span></div>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const InDrawer: StoryObj = {};
