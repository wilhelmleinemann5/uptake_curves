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
    let selectedFromDate: string | null = null;
    let selectedToDate: string | null = null;
    let typeaheadRef = null;

    const updateSelectionDisplay = () => {
      const selectionContainer = document.querySelector('#selection');
      if (selectionContainer) {
        const allTags: string[] = [];

        // Add date tags with dismiss functionality
        if (selectedFromDate) {
          allTags.push(`<mc-tag withaction data-tag-type="from">FROM: ${selectedFromDate}</mc-tag>`);
        }
        if (selectedToDate) {
          allTags.push(`<mc-tag withaction data-tag-type="to">TO: ${selectedToDate}</mc-tag>`);
        }

        // Add port tags with dismiss functionality
        selectedPorts.forEach((port) => {
          allTags.push(`<mc-tag withaction data-tag-type="port">PORT: ${port.label} (${port.value})</mc-tag>`);
        });

        selectionContainer.innerHTML = allTags.length > 0 ? allTags.join('') : '<span>No selections made</span>';

        // Add event listeners to all tags after they're rendered
        setTimeout(() => {
          // Handle date tag dismissals
          const fromTags = selectionContainer.querySelectorAll('mc-tag[data-tag-type="from"]');
          fromTags.forEach((tag) => {
            tag.addEventListener('dismiss', () => {
              selectedFromDate = null;
              // Clear the FROM date input
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
              // Clear the TO date input
              const toInput = document.querySelector('mc-input-date[label="To"]');
              if (toInput) {
                toInput.value = '';
              }
              updateSelectionDisplay();
            });
          });

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
        typeaheadRef = document.querySelector('mc-typeahead[name="typeahead"]');
      }
      return typeaheadRef;
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          gap: 16px;
          width: 600px;
          justify-content: flex-start;
        }
        .wrapper * {
          width: 200px;
        }
        .tag-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          width: 600px;
          align-items: center;
          justify-content: flex-start;
        }
        .tag-wrapper span {
          color: var(--mds_brand_appearance_neutral_weakest_text-color);
          font-style: italic;
        }
      </style>
      <div class="wrapper">
        <mc-input-date label="From" @inputdateselected=${(event) => handleDateSelection(event, 'From')}></mc-input-date>
        <mc-input-date label="To" @inputdateselected=${(event) => handleDateSelection(event, 'To')}></mc-input-date>
        <mc-typeahead-multi-select
          name="typeahead"
          .data="${ports.map((harbor) => ({
            label: harbor.label,
            value: harbor.value,
            sublabel: `${harbor.country}, ${harbor.region}`,
          }))}"
          label="Ports"
          hiddentags
          clearbutton
          placeholder="Start typing port name"
          @optionselected=${(event) => {
            handlePortSelection(event);
            // Ensure we have the typeahead reference
            getTypeaheadRef();
          }}
        ></mc-typeahead-multi-select>
      </div>
      <div id="selection" class="tag-wrapper"><span>No selections made</span></div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const TagsPlacement: StoryObj = {};
