import { TableColumn, TableTemplateResult, CellTemplateDetails } from '../types';

const nameColumn: TableColumn = {
  id: 'name',
  label: 'Name',
  noWrap: true,
  sticky: false,
};

const inServiceColumn: TableColumn = {
  id: 'inService',
  label: 'In Service',
  cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html`
  <div style="display: flex; justify-content: center;">
    <mc-icon icon="${details.rowData.inService ? 'check' : 'times'}"></mc-icon>
  </div>`,
};

const statusColumn: TableColumn = {
  id: 'status',
  label: 'Status',
  cellTemplate: (details: CellTemplateDetails): TableTemplateResult => details.html`
  <mc-tag label="${details.rowData.status}" appearance="${details.rowData.status == 'Stalled' ? 'error' : details.rowData.status == 'Delayed' ? 'warning' : details.rowData.status == 'Unknown' ? 'neutral' : 'success'}" width="full-width"></mc-tag>`,
};

const lengthColumn: TableColumn = {
  id: 'length',
  label: 'Length (m)',
  dataType: {
    type: 'number',
  },
};

const capacityColumn: TableColumn = {
  id: 'capacity',
  label: 'Capacity (TEU)',
  dataType: {
    type: 'number',
  },
};

const defaultColumns = [nameColumn, inServiceColumn, statusColumn, lengthColumn, capacityColumn];

const headerGroupsColumns = [
  nameColumn,
  {
    id: 'updates',
    label: 'Updates',
    align: 'center',
    columns: [inServiceColumn, statusColumn],
  },
  {
    id: 'statistics',
    label: 'Statistics',
    align: 'center',
    columns: [lengthColumn, capacityColumn],
  },
];

export { defaultColumns, headerGroupsColumns };
export default defaultColumns;
