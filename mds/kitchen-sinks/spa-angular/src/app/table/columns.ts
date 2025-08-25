import { TableColumn } from '@maersk-global/mds-components-core-table/types';

export const customColumnsSimple: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    dataType: { type: 'number' },
  },
  {
    id: 'status',
    label: 'Status',
    noWrap: true,
  },
  {
    id: 'getQuote',
    label: '',
    noWrap: true,
    sortDisabled: true,
  },
];

export const customColumnsWithNumberFormatting: any = [
  {
    id: 'latitude',
    label: 'Latitude (to 3dp)',
    dataType: { type: 'number' },
  },
  {
    id: 'longitude',
    label: 'Longitude (to 4dp)',
    dataType: { type: 'number' },
  },
  {
    id: 'price',
    label: 'Price (default locale)',
    dataType: { type: 'number' },
  },
  {
    id: 'price',
    label: 'Price (da-DK)',
    dataType: { type: 'number' },
  },
  {
    id: 'price',
    label: 'Price (en-GB)',
    dataType: { type: 'number' },
  },
];

export const customColumnsWithGrouping: any = [
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
        noWrap: true,
      },
      {
        id: 'status',
        label: 'Status',
        noWrap: true,
      },
      {
        id: 'lastPort',
        label: 'Last port',
        noWrap: true,
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
      },
      {
        id: 'capacity',
        label: 'Capacity (TEU)',
        dataType: { type: 'number' },
      },
    ],
  },
];

export const customColumnsWithAggregatedFooter: Array<any> = [
  {
    id: 'name',
    label: 'Name',
    colspan: 3,
  },
  {
    id: 'built',
    label: 'Built (year)',
    dataType: { type: 'number' },
  },
  {
    id: 'length',
    label: 'Length (m)',
    dataType: { type: 'number' },
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
    dataType: { type: 'number' },
  },
];
