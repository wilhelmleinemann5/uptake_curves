import data from '../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
// Imports for the components used in the templates
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tag';
import '@maersk-global/mds-components-core/mc-tooltip';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;

// HTML
<mc-table></mc-table>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
  {
    label: 'columns.ts',
    template: `import type { TableColumn, TableTemplateResult, CellTemplateDetails, HeaderTemplateDetails } from '@maersk-global/mds-components-core-table/types';

const columns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html\`
      <div class="mds-text--medium-bold">\${details.rowData.name}</div>
      <div class="mds-table__subtext">\${details.rowData.type}</div>
    \`,
  },
  {
    id: 'status',
    label: 'Status',
    noWrap: true,
    headerTemplate: (details: HeaderTemplateDetails): TableTemplateResult => details.html\`
      <div class="mds-flex mds-gap-100 mds-items-center">
        \${details.column.label}
        <mc-tooltip position="top-center">
          <mc-icon slot="trigger" icon="info" fit="small"></mc-icon>
          <div>Shows the current status of the vessel:</div>
          <ul class="mds-list mds-list--unordered mds-mt-100">
            <li>On schedule - Vessel is on time</li>
            <li>Delayed - Minor delay reported</li>
            <li>Stalled - Major delay reported</li>
          </ul>
        </mc-tooltip>
      </div>
    \`,
    cellTemplate: (details: CellTemplateDetails): TableTemplateResult => {
      let appearance;
      switch (details.value) {
        case 'On schedule':
          appearance = 'success';
          break;
        case 'Delayed':
          appearance = 'warning';
          break;
        case 'Stalled':
          appearance = 'error';
          break;
        default:
          appearance = 'default';
          break;
      }
      return details.html\`<mc-tag appearance="\${appearance}">\${details.value}</mc-tag>\`;
    },
  },
  {
    id: 'lastPort',
    label: 'Last port',
    sortDisabled: true,
    noWrap: true,
    cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html\`
      <a href="https://www.google.com/maps/place/\${details.value}" target="_blank" class="mds-link--external">
        \${details.value}
      </a>
    \`,
  },
  {
    id: 'position',
    label: 'Position',
    sortDisabled: true,
    noWrap: true,
    cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html\`
      <mc-button 
        label="Click me!" 
        icon="pin" 
        appearance="neutral" 
        variant="outlined" 
        fit="small" 
        @click="\${() => alert(\`You clicked "Click me!" for \${details.rowData.name}!\`)}"
      ></mc-button>
    \`,
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
    cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html\`
      <mc-tooltip position="top-center">
        <div slot="trigger">Hover to see more</div>
        <span>\${details.value} TEU</span>
      </mc-tooltip>
    \`,
  },
];`,
    language: 'javascript',
    copy: true,
  },
];
