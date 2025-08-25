import { TableColumn } from '../types';

const nameColumn: TableColumn = {
  id: 'name',
  label: 'Name',
  noWrap: true,
  sticky: true,
};

const builtColumn: TableColumn = {
  id: 'built',
  label: 'Built (year)',
  width: '200px',
  tabularFigures: true,
  align: 'right',
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

const lastPortColumn: TableColumn = {
  id: 'lastPort',
  label: 'Last port',
};

const nameColumnWithSubdata: TableColumn = {
  ...nameColumn,
  subDataLabel: 'Vessel type',
  subDataKey: 'type',
};

const builtColumnWithSubdata: TableColumn = {
  id: 'built',
  label: 'Built (year)',
  width: '200px',
  tabularFigures: true,
  align: 'right',
  sortDisabled: true,
  subDataLabel: 'Vessel type',
};

const headerGroupsColumns = [
  {
    id: 'name',
    label: 'Name',
    width: '60%',
  },
  {
    id: 'updates',
    label: 'Updates',
    align: 'center',
    columns: [
      {
        id: 'inService',
        label: 'In service',
        align: 'center',
        nowrap: true,
      },
      {
        id: 'status',
        label: 'Status',
        nowrap: true,
      },
      {
        id: 'lastPort',
        label: 'Last port',
        nowrap: true,
      },
    ],
  },
  {
    id: 'statistics',
    label: 'Statistics',
    align: 'center',
    columns: [
      {
        id: 'length',
        label: 'Length (m)',
        dataType: { type: 'number' },
        nowrap: true,
      },
      {
        id: 'capacity',
        label: 'Capacity (TEU)',
        dataType: { type: 'number' },
        nowrap: true,
      },
    ],
  },
];

const defaultColumns = [nameColumn, lastPortColumn, builtColumn, lengthColumn, capacityColumn];
const columnsWithSubdata = [nameColumnWithSubdata, lastPortColumn, builtColumn, lengthColumn, builtColumnWithSubdata];

export {
  defaultColumns as DefaultColumns,
  columnsWithSubdata as ColumnsWithSubdata,
  headerGroupsColumns as HeaderGroupsColumns,
};
export default defaultColumns;
