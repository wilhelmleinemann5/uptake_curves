import { TableColumn } from '../../../types';

const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
    width: '100%',
  },
  {
    id: 'capacity',
    label: 'Capacity',
    align: 'right',
    nowrap: true,
  },
  {
    id: 'speed',
    label: 'Speed',
    align: 'right',
    nowrap: true,
  },
];

export default columns;
