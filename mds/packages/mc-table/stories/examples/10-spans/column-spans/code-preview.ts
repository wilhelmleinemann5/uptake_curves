const data = [
  {
    id: 1,
    leg: 1,
    eventType: 'Vessel arrival',
    location: 'Shanghai, China',
    eventModifiedOn: '17 Jan 2025 16:45 CN',
    eventDetails: 'Added Location to CNSGN',
    modifiedBy: 'Maersk user',
  },
  {
    id: 2,
    leg: 1,
    eventType: 'Vessel departure',
    location: 'NINGBO, China',
    eventModifiedOn: '18 Jan 2025 10:30 CN',
    eventDetails: 'Added Location to CNNGB',
    modifiedBy: 'Maersk user',
  },
  {
    id: 3,
    leg: 2,
    eventType: 'Vessel arrival',
    location: 'Rotterdam, Netherlands',
    eventModifiedOn: '18 Jan 2025 14:30 CN',
    eventDetails: 'Added Location to NLROT',
    modifiedBy: 'Maersk user',
  },
  {
    id: 4,
    leg: 2,
    eventType: 'Vessel departure',
    location: 'Shanghai, China',
    eventModifiedOn: '18 Jan 2025 18:30 CN',
    eventDetails: 'Added Location to CNSGN',
    modifiedBy: 'Maersk user',
  },
];

const columns = [
  {
    id: 'leg',
    label: 'Leg',
    width: '5%',
    align: 'center',
    rowspan: 2,
  },
  {
    id: 'eventType',
    label: 'Event type',
  },
  {
    id: 'location',
    label: 'Location',
  },
  {
    id: 'eventModifiedOn',
    label: 'Event modified on',
  },
  {
    id: 'eventDetails',
    label: 'Event details',
  },
  {
    id: 'modifiedBy',
    label: 'Modified by',
  },
];

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `
import '@maersk-global/mds-components-core-table';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;

<mc-table sortdisabled verticallinestyle="solid"></mc-table>`,
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
    label: 'columns.js',
    template: `${JSON.stringify(columns, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
