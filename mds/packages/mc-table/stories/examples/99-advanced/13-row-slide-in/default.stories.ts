import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../src/index';
import data from '../../../data';
import { TableColumn } from '../../../../src/lib/types';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

const meta: Meta = {
  title: 'Components/Table/Examples/99-Advanced',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
  },
  render: (args: Args, context: StoryContext) => {
    const nameColumn: TableColumn = {
      id: 'name',
      label: 'Name',
    };

    const builtColumn: TableColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };

    const lengthColumn: TableColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };

    const getQuoteColumn: TableColumn = {
      id: 'status',
      label: 'Status',
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, lengthColumn, getQuoteColumn];

    const tableData = [...data];

    const wrapRowContents = (row: HTMLElement) => {
      row.querySelectorAll('td').forEach((cell) => {
        const wrapper = document.createElement('div');
        const inner = document.createElement('div');
        while (cell.firstChild) {
          inner.appendChild(cell.firstChild);
        }
        wrapper.appendChild(inner);
        cell.appendChild(wrapper);
      });
    };

    const unwrapRowContents = (row: HTMLElement) => {
      row.querySelectorAll('td > div').forEach((wrapper) => {
        const cell = wrapper.parentNode;
        while (wrapper.firstChild) {
          cell.appendChild(wrapper.firstChild);
        }
        cell.removeChild(wrapper);
      });
    };

    const addNewRow = () => {
      const newRow = {
        id: tableData.length + 1,
        name: `New vessel ${tableData.length + 1}`,
        type: 'Container ship',
        built: '2023',
        length: 399,
        capacity: 19630,
        inService: true,
        status: 'On schedule',
        speed: '16.2',
        position: 'Track on map',
        lastPort: 'Shanghai',
        lastCountry: 'China',
        lastUpdate: new Date().toLocaleDateString(),
      };
      tableData.push(newRow);
      const table = document.querySelector('mc-table');
      table.data = [...tableData];

      requestAnimationFrame(() => {
        const newRowElement = table.shadowRoot.querySelector(`.row-${newRow.id}`) as HTMLElement;
        if (newRowElement) {
          newRowElement.classList.add('row-new');

          wrapRowContents(newRowElement);

          // Trigger reflow to ensure the animation starts
          newRowElement.offsetHeight;
          newRowElement.classList.add('row-expanded');

          setTimeout(() => {
            newRowElement.classList.remove('row-new', 'row-expanded');
            unwrapRowContents(newRowElement);
          }, 400);
        }
      });
    };

    const customStyles = `
      .mds-table td {
      transition: background-color 400ms ease-out;
      }

      .mds-table .row-new td{
        background-color: var(--mds_brand_appearance_secondary_weak_background-color);
      }

      .row-new > td > div {
        display: grid;
        grid-template-rows: 0fr;
        transition: 300ms grid-template-rows ease;
      }

      .row-new.row-expanded > td > div {
        grid-template-rows: 1fr;
      }

      .row-new > td > div > div {
        overflow: hidden;
      }
    `;

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-button @click=${addNewRow}>Add New Row</mc-button>
      <mc-table .data=${tableData} .columns=${defaultColumns as TableColumn[]} .customstyles=${customStyles}>
      </mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const NewRowExpandAnimation: StoryObj = {};
