const data = [
  {
    id: 1,
    category: 'Service details',
    electronic: 'Allows surrender of the Bill of Lading to the carrier.',
    transfer: 'Allows transfer of the title ownership to another party.',
  },
  {
    id: 2,
    category: 'Key difference',
    electronic:
      'Enables the consignee to start the cargo release process without the need to deal with a Bill of Lading.',
    transfer:
      'When transferred to a consignee then the B/L can be printed online or collected from the Maersk local office to start the cargo release process.',
  },
  {
    id: 3,
    category: 'Fulfilment of request',
    electronic: 'Surrender complete within 30 seconds of placing the request in most cases.',
    transfer: 'Transfer complete within 30 seconds of placing the request in most cases.',
  },
  {
    id: 4,
    category: 'Invoice availability',
    electronic: 'Invoice ready within 20 mins in most cases and can take up to max 12 hours.',
    transfer: 'Invoice ready within 20 mins in most cases and can take up to max 12 hours.',
  },
];

const columns = [
  {
    id: 'category',
    label: '',
  },
  {
    id: 'electronic',
    label: 'Electronic cargo release / Telex release',
  },
  {
    id: 'transfer',
    label: 'Transfer Bill of Lading',
  },
];

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `
import '@maersk-global/mds-components-core-table';
import { data } from './data.json';
import { columns } from './columns.js';

const mcTable = document.querySelector('mc-table');
const spans = [{ cellDataKey: '4_electronic', colspan: 2 }];

mcTable.data = data;
mcTable.columns = columns;
mcTable.spans = spans;

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
    language: 'javascript',
    copy: true,
  },
];
