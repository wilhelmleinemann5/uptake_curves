import { TableColumn } from '../../../types';

const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'lastPort',
    label: 'Last port',
  },
  {
    id: 'built',
    label: 'Built (year)',
    align: 'right',
  },
  {
    id: 'length',
    label: 'Length (m)',
    align: 'right',
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
    align: 'right',
  },
];

export default columns;
